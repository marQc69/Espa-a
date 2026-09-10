/**
 * Backtesting & Accuracy Verification Engine for La Liga Predict AI
 *
 * Implements:
 * 1. Multi-Class Brier Score & Log-Loss evaluation for 1X2 probabilities.
 * 2. 1X2 pick accuracy and Over/Under 2.5 hit rates.
 * 3. Systematic +EV Value Betting simulation tracking flat-stake ROI and equity curve.
 * 4. Probability calibration analysis across confidence deciles.
 */

import { calculateDixonColes } from './dixonColes.js';
import { runMlRegression } from './mlRegressionEngine.js';

const EPSILON = 1e-15;

/**
 * Clips probability to avoid Math.log(0) or infinite loss
 */
function clipProb(p) {
  return Math.max(EPSILON, Math.min(1 - EPSILON, p));
}

/**
 * Runs historical backtesting evaluation on a collection of completed matches
 *
 * @param {Array} matches Array of historical match objects
 * @param {Object} teams Map of team objects keyed by team ID
 * @param {Object} options Config options (minEdge, selectedMatchday, market)
 */
export function runBacktest(matches, teams, options = {}) {
  const minEdge = options.minEdge !== undefined ? options.minEdge : 0.04; // default +4% EV threshold
  const selectedMatchday = options.matchday || 'all';
  const marketFilter = options.market || 'all';

  let filteredMatches = matches;
  if (selectedMatchday !== 'all') {
    const md = Number(selectedMatchday);
    filteredMatches = matches.filter(m => m.matchday === md);
  }

  if (!filteredMatches || filteredMatches.length === 0) {
    return {
      totalMatches: 0,
      accuracyPct: 0,
      brierScore: 0,
      logLoss: 0,
      overUnderAccuracyPct: 0,
      valueBetsCount: 0,
      valueBetsWon: 0,
      valueBetWinRate: 0,
      netProfitUnits: 0,
      roiPct: 0,
      equityCurve: [],
      auditRows: [],
      calibrationBuckets: []
    };
  }

  let totalBrierSum = 0;
  let totalLogLossSum = 0;
  let correct1X2Hits = 0;
  let correctOverUnderHits = 0;

  let totalBetsCount = 0;
  let valueBetsWon = 0;
  let netProfitUnits = 0;

  let currentBankroll = 100.0; // Start with 100 units bankroll for equity visualizer
  const equityCurve = [{ matchIndex: 0, bankroll: 100.0, label: 'Start' }];

  const auditRows = [];

  // Calibration buckets: 0-30%, 30-40%, 40-50%, 50-60%, 60-70%, 70%+
  const buckets = [
    { label: '0-30%', min: 0.0, max: 0.30, total: 0, hits: 0 },
    { label: '30-45%', min: 0.30, max: 0.45, total: 0, hits: 0 },
    { label: '45-60%', min: 0.45, max: 0.60, total: 0, hits: 0 },
    { label: '60-75%', min: 0.60, max: 0.75, total: 0, hits: 0 },
    { label: '75%+', min: 0.75, max: 1.01, total: 0, hits: 0 }
  ];

  filteredMatches.forEach((m, idx) => {
    const homeTeam = teams[m.homeTeamId];
    const awayTeam = teams[m.awayTeamId];

    if (!homeTeam || !awayTeam) return;

    // 1. Run Dixon-Coles and ML Regression
    const dcResult = calculateDixonColes(homeTeam, awayTeam);
    const mlResult = runMlRegression(homeTeam, awayTeam);

    // Ensemble weighted blend (55% Dixon-Coles, 45% ML Regression)
    let pHome = (dcResult.homeWinProb * 0.55) + (mlResult.probabilities.homeWin * 0.45);
    let pDraw = (dcResult.drawProb * 0.55) + (mlResult.probabilities.draw * 0.45);
    let pAway = (dcResult.awayWinProb * 0.55) + (mlResult.probabilities.awayWin * 0.45);

    const probSum = pHome + pDraw + pAway;
    pHome /= probSum;
    pDraw /= probSum;
    pAway /= probSum;

    // Over/Under 2.5 prediction
    const pOver25 = dcResult.overUnderLines.over25 / 100;
    const pUnder25 = dcResult.overUnderLines.under25 / 100;

    // 2. Actual Match Result Encoding
    let actualOutcome = 'D';
    let yHome = 0, yDraw = 0, yAway = 0;

    if (m.homeGoals > m.awayGoals) {
      actualOutcome = 'H';
      yHome = 1;
    } else if (m.homeGoals === m.awayGoals) {
      actualOutcome = 'D';
      yDraw = 1;
    } else {
      actualOutcome = 'A';
      yAway = 1;
    }

    const actualTotalGoals = m.homeGoals + m.awayGoals;
    const actualOver25 = actualTotalGoals > 2.5;

    // Highest probability pick
    let predictedOutcome = 'H';
    let maxProb = pHome;
    if (pDraw > maxProb) {
      predictedOutcome = 'D';
      maxProb = pDraw;
    }
    if (pAway > maxProb) {
      predictedOutcome = 'A';
      maxProb = pAway;
    }

    const is1X2Hit = predictedOutcome === actualOutcome;
    if (is1X2Hit) correct1X2Hits++;

    const predictedOver25 = pOver25 >= 0.50;
    const isOverUnderHit = predictedOver25 === actualOver25;
    if (isOverUnderHit) correctOverUnderHits++;

    // Multi-Class Brier Score contribution: (p_h - y_h)^2 + (p_d - y_d)^2 + (p_a - y_a)^2
    const brierMatch = Math.pow(pHome - yHome, 2) +
                       Math.pow(pDraw - yDraw, 2) +
                       Math.pow(pAway - yAway, 2);
    totalBrierSum += brierMatch;

    // Multi-Class Log-Loss contribution: - ln(p_actual)
    let pActual = yHome ? pHome : (yDraw ? pDraw : pAway);
    const logLossMatch = -Math.log(clipProb(pActual));
    totalLogLossSum += logLossMatch;

    // Update Calibration Deciles
    const evaluatedProbs = [
      { prob: pHome, hit: yHome === 1 },
      { prob: pDraw, hit: yDraw === 1 },
      { prob: pAway, hit: yAway === 1 }
    ];
    evaluatedProbs.forEach(item => {
      const bucket = buckets.find(b => item.prob >= b.min && item.prob < b.max);
      if (bucket) {
        bucket.total++;
        if (item.hit) bucket.hits++;
      }
    });

    // 3. Systematic +EV Value Betting Evaluation
    const oddsH = m.marketOdds.home;
    const oddsD = m.marketOdds.draw;
    const oddsA = m.marketOdds.away;

    const edgeH = (pHome * oddsH) - 1.0;
    const edgeD = (pDraw * oddsD) - 1.0;
    const edgeA = (pAway * oddsA) - 1.0;

    // Find highest +EV 1X2 market edge
    let bestSelection = null;
    let highestEdge = -1;

    if (edgeH > highestEdge) { highestEdge = edgeH; bestSelection = { pick: 'H', label: `${homeTeam.shortName} Win`, odds: oddsH, prob: pHome, edge: edgeH, won: yHome === 1 }; }
    if (edgeD > highestEdge) { highestEdge = edgeD; bestSelection = { pick: 'D', label: 'Draw', odds: oddsD, prob: pDraw, edge: edgeD, won: yDraw === 1 }; }
    if (edgeA > highestEdge) { highestEdge = edgeA; bestSelection = { pick: 'A', label: `${awayTeam.shortName} Win`, odds: oddsA, prob: pAway, edge: edgeA, won: yAway === 1 }; }

    let betPlaced = false;
    let betWon = false;
    let betProfit = 0;

    if (bestSelection && bestSelection.edge >= minEdge) {
      betPlaced = true;
      totalBetsCount++;
      if (bestSelection.won) {
        valueBetsWon++;
        betWon = true;
        betProfit = bestSelection.odds - 1.0; // 1 unit flat stake
      } else {
        betWon = false;
        betProfit = -1.0; // 1 unit lost
      }
      netProfitUnits += betProfit;
      currentBankroll += betProfit;
    }

    equityCurve.push({
      matchIndex: idx + 1,
      bankroll: Number(currentBankroll.toFixed(2)),
      matchLabel: `${homeTeam.shortName} vs ${awayTeam.shortName}`,
      betPlaced,
      betProfit: Number(betProfit.toFixed(2))
    });

    // Audit Row
    auditRows.push({
      id: m.id,
      matchday: m.matchday,
      date: m.date,
      homeTeam: homeTeam.name,
      awayTeam: awayTeam.name,
      homeShort: homeTeam.shortName,
      awayShort: awayTeam.shortName,
      homeBadge: homeTeam.badge,
      awayBadge: awayTeam.badge,
      actualScore: `${m.homeGoals}-${m.awayGoals}`,
      actualOutcome: actualOutcome,
      predictedOutcome: predictedOutcome,
      predictedScore: dcResult.mostLikelyScore.score,
      is1X2Hit: is1X2Hit,
      probabilities: {
        home: Number((pHome * 100).toFixed(1)),
        draw: Number((pDraw * 100).toFixed(1)),
        away: Number((pAway * 100).toFixed(1))
      },
      marketOdds: {
        home: oddsH,
        draw: oddsD,
        away: oddsA
      },
      bestValue: bestSelection ? {
        pick: bestSelection.pick,
        label: bestSelection.label,
        odds: bestSelection.odds,
        edgePct: Number((bestSelection.edge * 100).toFixed(1)),
        isQualified: bestSelection.edge >= minEdge,
        won: bestSelection.won,
        profit: betPlaced ? Number(betProfit.toFixed(2)) : 0
      } : null,
      betPlaced: betPlaced,
      brierScore: Number(brierMatch.toFixed(3))
    });
  });

  const totalEvaluated = filteredMatches.length;
  const accuracyPct = Number(((correct1X2Hits / totalEvaluated) * 100).toFixed(1));
  const overUnderAccuracyPct = Number(((correctOverUnderHits / totalEvaluated) * 100).toFixed(1));
  const meanBrier = Number((totalBrierSum / totalEvaluated).toFixed(3));
  const meanLogLoss = Number((totalLogLossSum / totalEvaluated).toFixed(3));

  const roiPct = totalBetsCount > 0 ? Number(((netProfitUnits / totalBetsCount) * 100).toFixed(1)) : 0;
  const valueBetWinRate = totalBetsCount > 0 ? Number(((valueBetsWon / totalBetsCount) * 100).toFixed(1)) : 0;

  // Finalize Calibration data
  const calibrationResults = buckets.map(b => ({
    label: b.label,
    total: b.total,
    hits: b.hits,
    actualPct: b.total > 0 ? Number(((b.hits / b.total) * 100).toFixed(1)) : 0
  }));

  return {
    totalMatches: totalEvaluated,
    accuracyPct,
    correctHits: correct1X2Hits,
    brierScore: meanBrier,
    baselineBrier: 0.667, // random 33.3% choice
    logLoss: meanLogLoss,
    baselineLogLoss: 1.098, // -ln(1/3)
    overUnderAccuracyPct,
    valueBetsCount: totalBetsCount,
    valueBetsWon,
    valueBetWinRate,
    netProfitUnits: Number(netProfitUnits.toFixed(2)),
    roiPct,
    currentBankroll: Number(currentBankroll.toFixed(2)),
    equityCurve,
    auditRows,
    calibrationBuckets: calibrationResults
  };
}
