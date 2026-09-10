/**
 * Corner Kick Prediction Engine for La Liga
 *
 * Models corner generation based on:
 * 1. Historical home & away corner splits.
 * 2. Opponent corner concession rates.
 * 3. Crossing frequency and wing attack concentration.
 * 4. Shot volume and blocked shot rates.
 * 5. Poisson distribution for exact corner counts and Over/Under lines (8.5, 9.5, 10.5).
 */

import { LEAGUE_AVERAGES } from '../data/teamsData.js';

function factorial(n) {
  if (n <= 1) return 1;
  let res = 1;
  for (let i = 2; i <= n; i++) res *= i;
  return res;
}

function poissonPmf(k, lambda) {
  if (lambda <= 0) return k === 0 ? 1 : 0;
  return (Math.pow(lambda, k) * Math.exp(-lambda)) / factorial(k);
}

/**
 * Calculates expected corners and probability distributions for a matchup
 */
export function calculateCorners(homeTeam, awayTeam) {
  // 1. Base corner tendencies
  const homeAttackCorners = homeTeam.homeRecord.cornersFor || homeTeam.corners.avgWon;
  const awayDefenseCorners = awayTeam.awayRecord.cornersAgainst || awayTeam.corners.avgConceded;

  const awayAttackCorners = awayTeam.awayRecord.cornersFor || awayTeam.corners.avgWon;
  const homeDefenseCorners = homeTeam.homeRecord.cornersAgainst || homeTeam.corners.avgConceded;

  // Relative to league home/away averages
  const homeCornerFactor = (homeAttackCorners / LEAGUE_AVERAGES.homeCornersPerMatch) *
                           (awayDefenseCorners / LEAGUE_AVERAGES.homeCornersPerMatch);
  const awayCornerFactor = (awayAttackCorners / LEAGUE_AVERAGES.awayCornersPerMatch) *
                           (homeDefenseCorners / LEAGUE_AVERAGES.awayCornersPerMatch);

  let expectedHomeCorners = LEAGUE_AVERAGES.homeCornersPerMatch * homeCornerFactor;
  let expectedAwayCorners = LEAGUE_AVERAGES.awayCornersPerMatch * awayCornerFactor;

  // 2. Tactical style modifiers
  // Wing play and crosses generate deflected corners
  const homeCrossMod = (homeTeam.crossing.crossesPerMatch / 18.0) * (homeTeam.crossing.wingPlayBiasPct / 60.0);
  const awayCrossMod = (awayTeam.crossing.crossesPerMatch / 18.0) * (awayTeam.crossing.wingPlayBiasPct / 60.0);

  expectedHomeCorners *= Math.pow(homeCrossMod, 0.35);
  expectedAwayCorners *= Math.pow(awayCrossMod, 0.35);

  // Shot volume pressure: Teams taking 15+ shots per game force more goalkeeper saves/blocks over byline
  const homeShotPressure = homeTeam.shots.avgShotsPerMatch / LEAGUE_AVERAGES.shotsPerMatch * 2;
  const awayShotPressure = awayTeam.shots.avgShotsPerMatch / LEAGUE_AVERAGES.shotsPerMatch * 2;

  expectedHomeCorners += (homeShotPressure - 1.0) * 0.45;
  expectedAwayCorners += (awayShotPressure - 1.0) * 0.35;

  // Clamping within realistic soccer boundaries
  expectedHomeCorners = Math.max(2.1, Math.min(9.8, expectedHomeCorners));
  expectedAwayCorners = Math.max(1.6, Math.min(8.2, expectedAwayCorners));

  const totalExpectedCorners = expectedHomeCorners + expectedAwayCorners;

  // 3. Poisson Distribution for Total Corners (0 to 20)
  const MAX_CORNERS = 22;
  const distribution = [];
  let cumOver8_5 = 0;
  let cumOver9_5 = 0;
  let cumOver10_5 = 0;
  let cumOver11_5 = 0;

  for (let c = 0; c <= MAX_CORNERS; c++) {
    const prob = poissonPmf(c, totalExpectedCorners);
    distribution.push({
      count: c,
      probability: prob,
      pct: Number((prob * 100).toFixed(1))
    });

    if (c > 8.5) cumOver8_5 += prob;
    if (c > 9.5) cumOver9_5 += prob;
    if (c > 10.5) cumOver10_5 += prob;
    if (c > 11.5) cumOver11_5 += prob;
  }

  // Find most probable exact corner totals
  const sortedCorners = [...distribution].sort((a, b) => b.probability - a.probability);

  return {
    expectedHomeCorners: Number(expectedHomeCorners.toFixed(1)),
    expectedAwayCorners: Number(expectedAwayCorners.toFixed(1)),
    totalExpectedCorners: Number(totalExpectedCorners.toFixed(1)),

    overUnderLines: {
      over8_5: Number((cumOver8_5 * 100).toFixed(1)),
      under8_5: Number(((1 - cumOver8_5) * 100).toFixed(1)),
      over9_5: Number((cumOver9_5 * 100).toFixed(1)),
      under9_5: Number(((1 - cumOver9_5) * 100).toFixed(1)),
      over10_5: Number((cumOver10_5 * 100).toFixed(1)),
      under10_5: Number(((1 - cumOver10_5) * 100).toFixed(1)),
      over11_5: Number((cumOver11_5 * 100).toFixed(1)),
      under11_5: Number(((1 - cumOver11_5) * 100).toFixed(1))
    },

    fairOdds: {
      over9_5: Number((1 / cumOver9_5).toFixed(2)),
      under9_5: Number((1 / (1 - cumOver9_5)).toFixed(2))
    },

    mostProbableCount: sortedCorners[0].count,
    topRanges: [
      { range: '0 - 8 Corners', prob: Number(((1 - cumOver8_5) * 100).toFixed(1)) },
      { range: '9 - 11 Corners', prob: Number(((cumOver8_5 - cumOver11_5) * 100).toFixed(1)) },
      { range: '12+ Corners', prob: Number((cumOver11_5 * 100).toFixed(1)) }
    ],

    distribution: distribution.slice(4, 17)
  };
}
