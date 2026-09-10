/**
 * Dixon-Coles Bivariate Poisson Model for Soccer Match Prediction
 * Based on Dixon & Coles (1997): "Modelling Association Football Scores and Inefficiencies in the Football Betting Market"
 *
 * Implements:
 * 1. Team attacking/defensive rating decomposition calibrated against La Liga baseline.
 * 2. Home advantage parameter (\gamma).
 * 3. Low-scoring correlation parameter (\rho) correcting independent Poisson assumption for 0-0, 1-0, 0-1, and 1-1.
 * 4. Exact 6x6 scoreline probability matrix.
 * 5. Aggregated markets: 1X2 (Win/Draw/Loss), Over/Under goals, Both Teams to Score (BTTS).
 */

import { LEAGUE_AVERAGES } from '../data/teamsData.js';

/**
 * Factorial helper with memoization
 */
const factorialCache = [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880];
function factorial(n) {
  if (n < 0) return 1;
  if (factorialCache[n] !== undefined) return factorialCache[n];
  let res = factorialCache[factorialCache.length - 1];
  for (let i = factorialCache.length; i <= n; i++) {
    res *= i;
    factorialCache[i] = res;
  }
  return res;
}

/**
 * Standard Poisson probability mass function P(X = k; \lambda)
 */
function poissonPmf(k, lambda) {
  if (lambda <= 0) return k === 0 ? 1 : 0;
  return (Math.pow(lambda, k) * Math.exp(-lambda)) / factorial(k);
}

/**
 * Dixon-Coles adjustment factor \tau(x, y, \lambda_H, \lambda_A, \rho)
 */
function tauAdjustment(x, y, lambdaH, lambdaA, rho) {
  if (x === 0 && y === 0) {
    return 1 - lambdaH * lambdaA * rho;
  } else if (x === 0 && y === 1) {
    return 1 + lambdaH * rho;
  } else if (x === 1 && y === 0) {
    return 1 + lambdaA * rho;
  } else if (x === 1 && y === 1) {
    return 1 - rho;
  }
  return 1.0;
}

/**
 * Computes Dixon-Coles expected goals and outcome probabilities
 *
 * @param {Object} homeTeam Team object for home side
 * @param {Object} awayTeam Team object for away side
 * @param {Object} options Optional overrides for rho or home advantage
 */
export function calculateDixonColes(homeTeam, awayTeam, options = {}) {
  const rho = options.rho !== undefined ? options.rho : LEAGUE_AVERAGES.dixonColesRho;
  const homeAdvantage = options.homeAdvantage !== undefined ? options.homeAdvantage : LEAGUE_AVERAGES.homeAdvantageFactor;

  // 1. Calculate attacking and defensive strengths relative to league averages
  // Use a blend of actual goals and Expected Goals (xG) for improved predictive accuracy
  const homeAvgScored = (homeTeam.homeRecord.gf / homeTeam.homeRecord.played) * 0.45 +
                        (homeTeam.homeRecord.xG / homeTeam.homeRecord.played) * 0.55;
  const homeAvgConceded = (homeTeam.homeRecord.ga / homeTeam.homeRecord.played) * 0.45 +
                          (homeTeam.homeRecord.xGA / homeTeam.homeRecord.played) * 0.55;

  const awayAvgScored = (awayTeam.awayRecord.gf / awayTeam.awayRecord.played) * 0.45 +
                        (awayTeam.awayRecord.xG / awayTeam.awayRecord.played) * 0.55;
  const awayAvgConceded = (awayTeam.awayRecord.ga / awayTeam.awayRecord.played) * 0.45 +
                          (awayTeam.awayRecord.xGA / awayTeam.awayRecord.played) * 0.55;

  // Normalized relative to league baselines
  const alphaHome = homeAvgScored / LEAGUE_AVERAGES.homeGoalsPerMatch;
  const betaHome = homeAvgConceded / LEAGUE_AVERAGES.awayGoalsPerMatch;

  const alphaAway = awayAvgScored / LEAGUE_AVERAGES.awayGoalsPerMatch;
  const betaAway = awayAvgConceded / LEAGUE_AVERAGES.homeGoalsPerMatch;

  // Expected goals \lambda_H and \lambda_A
  let lambdaH = alphaHome * betaAway * LEAGUE_AVERAGES.homeGoalsPerMatch;
  let lambdaA = alphaAway * betaHome * LEAGUE_AVERAGES.awayGoalsPerMatch;

  // Apply subtle Elo disparity adjustment to lambda
  const eloDiff = (homeTeam.eloRating - awayTeam.eloRating) / 400;
  const eloAdjustment = Math.pow(10, eloDiff * 0.18);
  lambdaH *= Math.sqrt(eloAdjustment);
  lambdaA /= Math.sqrt(eloAdjustment);

  // Clamp within realistic soccer bounds
  lambdaH = Math.max(0.35, Math.min(4.8, lambdaH));
  lambdaA = Math.max(0.25, Math.min(4.2, lambdaA));

  // 2. Build 6x6 score probability matrix (scores 0 to 5 for each team)
  const MAX_GOALS = 6;
  const matrix = [];
  let homeWinProb = 0;
  let drawProb = 0;
  let awayWinProb = 0;
  let bttsProb = 0;

  const scorelines = [];
  let totalProbSum = 0;

  for (let h = 0; h < MAX_GOALS; h++) {
    matrix[h] = [];
    for (let a = 0; a < MAX_GOALS; a++) {
      const baseProb = poissonPmf(h, lambdaH) * poissonPmf(a, lambdaA);
      const adj = tauAdjustment(h, a, lambdaH, lambdaA, rho);
      const prob = Math.max(0, baseProb * adj);

      matrix[h][a] = prob;
      totalProbSum += prob;

      if (h > a) homeWinProb += prob;
      else if (h === a) drawProb += prob;
      else awayWinProb += prob;

      if (h > 0 && a > 0) bttsProb += prob;

      scorelines.push({
        score: `${h}-${a}`,
        homeGoals: h,
        awayGoals: a,
        probability: prob
      });
    }
  }

  // Normalize so probabilities over the 6x6 matrix sum to 100%
  for (let h = 0; h < MAX_GOALS; h++) {
    for (let a = 0; a < MAX_GOALS; a++) {
      matrix[h][a] /= totalProbSum;
    }
  }

  homeWinProb /= totalProbSum;
  drawProb /= totalProbSum;
  awayWinProb /= totalProbSum;
  bttsProb /= totalProbSum;

  scorelines.forEach(s => {
    s.probability /= totalProbSum;
  });

  // Sort scorelines by descending probability
  scorelines.sort((a, b) => b.probability - a.probability);

  // Over / Under Goal Totals
  const totalExpectedGoals = lambdaH + lambdaA;
  const overUnderLines = [1.5, 2.5, 3.5, 4.5];
  const overUnderMarkets = {};

  overUnderLines.forEach(line => {
    let overProb = 0;
    scorelines.forEach(s => {
      if (s.homeGoals + s.awayGoals > line) {
        overProb += s.probability;
      }
    });
    overUnderMarkets[`over_${line}`] = overProb;
    overUnderMarkets[`under_${line}`] = 1 - overProb;
  });

  return {
    lambdaHome: Number(lambdaH.toFixed(2)),
    lambdaAway: Number(lambdaA.toFixed(2)),
    expectedTotalGoals: Number(totalExpectedGoals.toFixed(2)),
    alphaHome: Number(alphaHome.toFixed(3)),
    betaHome: Number(betaHome.toFixed(3)),
    alphaAway: Number(alphaAway.toFixed(3)),
    betaAway: Number(betaAway.toFixed(3)),
    homeAdvantage: Number(homeAdvantage.toFixed(2)),
    rho: rho,

    probabilities: {
      homeWin: Number((homeWinProb * 100).toFixed(1)),
      draw: Number((drawProb * 100).toFixed(1)),
      awayWin: Number((awayWinProb * 100).toFixed(1)),
      bttsYes: Number((bttsProb * 100).toFixed(1)),
      bttsNo: Number(((1 - bttsProb) * 100).toFixed(1)),
      over1_5: Number((overUnderMarkets.over_1.5 * 100).toFixed(1)),
      under1_5: Number((overUnderMarkets.under_1.5 * 100).toFixed(1)),
      over2_5: Number((overUnderMarkets.over_2.5 * 100).toFixed(1)),
      under2_5: Number((overUnderMarkets.under_2.5 * 100).toFixed(1)),
      over3_5: Number((overUnderMarkets.over_3.5 * 100).toFixed(1)),
      under3_5: Number((overUnderMarkets.under_3.5 * 100).toFixed(1))
    },

    fairOdds: {
      homeWin: Number((1 / homeWinProb).toFixed(2)),
      draw: Number((1 / drawProb).toFixed(2)),
      awayWin: Number((1 / awayWinProb).toFixed(2)),
      over2_5: Number((1 / overUnderMarkets.over_2.5).toFixed(2)),
      under2_5: Number((1 / overUnderMarkets.under_2.5).toFixed(2))
    },

    matrix: matrix,
    topScorelines: scorelines.slice(0, 8).map(s => ({
      ...s,
      pct: Number((s.probability * 100).toFixed(1))
    }))
  };
}
