/**
 * FootyPredict AI: La Liga Match Predictor & Tactical Intelligence Controller
 * Orchestrates team data, Dixon-Coles, ML Regressions, Corners, and Player Shot Props
 */

import { LA_LIGA_TEAMS, LEAGUE_AVERAGES } from './data/teamsData.js';
import { LA_LIGA_PLAYERS } from './data/playersData.js';
import { UPCOMING_FIXTURES, HEAD_TO_HEAD_HISTORY } from './data/fixturesData.js';
import { HISTORICAL_MATCHES } from './data/historicalMatchesData.js';

import { calculateDixonColes } from './engine/dixonColes.js';
import { calculateCorners } from './engine/cornerEngine.js';
import { calculatePlayerShotProps } from './engine/playerShotEngine.js';
import { runMlRegression } from './engine/mlRegressionEngine.js';
import { runBacktest } from './engine/backtestEngine.js';

import { parseCsv, downloadSampleCsv, getApiSettings, saveApiSettings, fetchLiveFootballDataMatches } from './utils/dataImporter.js';

// Application State
const state = {
  homeTeamId: 'real-sociedad',
  awayTeamId: 'real-madrid',
  activeFixtureId: 'fix-2026-0912-02',
  activeTab: 'dixon-coles',
  teams: { ...LA_LIGA_TEAMS }
};

// DOM Elements
const elements = {
  fixtureStrip: document.getElementById('fixture-strip-container'),
  homeSelect: document.getElementById('home-team-select'),
  awaySelect: document.getElementById('away-team-select'),
  btnSwapTeams: document.getElementById('btn-swap-teams'),
  matchVenueText: document.getElementById('match-venue-text'),
  matchDerbyBadge: document.getElementById('match-derby-badge'),
  matchHeadline: document.getElementById('match-headline'),

  // Team badges and info
  homeBadge: document.getElementById('home-badge'),
  awayBadge: document.getElementById('away-badge'),
  homeManager: document.getElementById('home-manager'),
  awayManager: document.getElementById('away-manager'),
  homeForm: document.getElementById('home-form-pills'),
  awayForm: document.getElementById('away-form-pills'),

  // Executive Pillar 1: Winner Probabilities
  homeProbVal: document.getElementById('prob-home-val'),
  drawProbVal: document.getElementById('prob-draw-val'),
  awayProbVal: document.getElementById('prob-away-val'),
  homeOddsVal: document.getElementById('odds-home-val'),
  drawOddsVal: document.getElementById('odds-draw-val'),
  awayOddsVal: document.getElementById('odds-away-val'),
  barHome: document.getElementById('bar-home'),
  barDraw: document.getElementById('bar-draw'),
  barAway: document.getElementById('bar-away'),

  // Executive Pillar 2: Total Goals
  expTotalGoals: document.getElementById('exp-total-goals'),
  homeXgVal: document.getElementById('home-xg-val'),
  awayXgVal: document.getElementById('away-xg-val'),
  over25Val: document.getElementById('over-25-val'),
  under25Val: document.getElementById('under-25-val'),
  bttsYesVal: document.getElementById('btts-yes-val'),

  // Executive Pillar 3: Corners
  expTotalCorners: document.getElementById('exp-total-corners'),
  homeCornersVal: document.getElementById('home-corners-val'),
  awayCornersVal: document.getElementById('away-corners-val'),
  over95CornersVal: document.getElementById('over-95-corners-val'),
  under95CornersVal: document.getElementById('under-95-corners-val'),

  // Executive Pillar 4: Top Player Shot Threats
  topThreatsContainer: document.getElementById('top-threats-container'),

  // Tabs & Panes
  tabButtons: document.querySelectorAll('.nav-tab-btn'),
  tabPanes: document.querySelectorAll('.tab-pane'),

  // Tab 1: Dixon-Coles
  dcMatrixBody: document.getElementById('dc-matrix-body'),
  topScorelinesBody: document.getElementById('top-scorelines-body'),
  dcAlphaHome: document.getElementById('dc-alpha-home'),
  dcBetaHome: document.getElementById('dc-beta-home'),
  dcAlphaAway: document.getElementById('dc-alpha-away'),
  dcBetaAway: document.getElementById('dc-beta-away'),
  dcLambdaHome: document.getElementById('dc-lambda-home'),
  dcLambdaAway: document.getElementById('dc-lambda-away'),

  // Tab 2: Machine Learning Regressions
  mlPredictedMargin: document.getElementById('ml-predicted-margin'),
  mlPredictedWinner: document.getElementById('ml-predicted-winner'),
  mlPredictedGoals: document.getElementById('ml-predicted-goals'),
  mlFeaturesList: document.getElementById('ml-features-list'),

  // Tab 3: Corners Detailed
  cornerDistChart: document.getElementById('corner-dist-chart'),
  cornerHomeCrosses: document.getElementById('corner-home-crosses'),
  cornerAwayCrosses: document.getElementById('corner-away-crosses'),
  cornerHomeWingBias: document.getElementById('corner-home-wingbias'),
  cornerAwayWingBias: document.getElementById('corner-away-wingbias'),

  // Tab 4: Player Shots Table
  playersTableBody: document.getElementById('players-table-body'),

  // Tab 5: H2H Comparison
  h2hMetricsContainer: document.getElementById('h2h-metrics-container'),

  // Tab 6: Model Backtesting & Verification
  backtestMatchdayFilter: document.getElementById('backtest-matchday-filter'),
  backtestEdgeFilter: document.getElementById('backtest-edge-filter'),
  btnRerunBacktest: document.getElementById('btn-rerun-backtest'),
  kpiAccuracyVal: document.getElementById('kpi-accuracy-val'),
  kpiHitsDetail: document.getElementById('kpi-hits-detail'),
  kpiBrierVal: document.getElementById('kpi-brier-val'),
  kpiBrierBadge: document.getElementById('kpi-brier-badge'),
  kpiLoglossVal: document.getElementById('kpi-logloss-val'),
  kpiLoglossBadge: document.getElementById('kpi-logloss-badge'),
  kpiRoiVal: document.getElementById('kpi-roi-val'),
  kpiProfitDetail: document.getElementById('kpi-profit-detail'),
  kpiWinrateDetail: document.getElementById('kpi-winrate-detail'),
  kpiOuVal: document.getElementById('kpi-ou-val'),
  bankrollCurrentVal: document.getElementById('bankroll-current-val'),
  equityCurveContainer: document.getElementById('equity-curve-container'),
  calibrationBarsContainer: document.getElementById('calibration-bars-container'),
  backtestAuditBody: document.getElementById('backtest-audit-body'),

  // Modals & Triggers
  btnOpenApiModal: document.getElementById('btn-open-api-modal'),
  btnCloseApiModal: document.getElementById('btn-close-api-modal'),
  apiModal: document.getElementById('api-modal'),
  btnSaveApiSettings: document.getElementById('btn-save-api-settings'),
  apiProviderSelect: document.getElementById('api-provider-select'),
  apiKeyInput: document.getElementById('api-key-input'),

  btnOpenCsvModal: document.getElementById('btn-open-csv-modal'),
  btnCloseCsvModal: document.getElementById('btn-close-csv-modal'),
  csvModal: document.getElementById('csv-modal'),
  btnDownloadSampleCsv: document.getElementById('btn-download-sample-csv'),
  csvFileInput: document.getElementById('csv-file-input'),
  csvDropZone: document.getElementById('csv-drop-zone')
};

/**
 * Initialize application
 */
function init() {
  populateFixtureStrip();
  populateTeamSelects();
  setupEventListeners();
  loadApiConfig();
  runAnalysis();
  renderBacktestingSuite();
}

/**
 * Populate upcoming fixtures strip
 */
function populateFixtureStrip() {
  if (!elements.fixtureStrip) return;
  elements.fixtureStrip.innerHTML = '';

  UPCOMING_FIXTURES.forEach(f => {
    const home = state.teams[f.homeTeamId];
    const away = state.teams[f.awayTeamId];
    if (!home || !away) return;

    const chip = document.createElement('div');
    chip.className = `fixture-chip ${f.id === state.activeFixtureId ? 'active' : ''}`;
    chip.dataset.fixtureId = f.id;

    chip.innerHTML = `
      ${f.isDerby ? '<div class="derby-dot" title="Derby Matchup"></div>' : ''}
      <span class="chip-teams">${home.shortName} vs ${away.shortName}</span>
      <span class="chip-time">${f.date.substring(5)} ${f.time.substring(0, 5)}</span>
    `;

    chip.addEventListener('click', () => {
      state.activeFixtureId = f.id;
      state.homeTeamId = f.homeTeamId;
      state.awayTeamId = f.awayTeamId;

      elements.homeSelect.value = f.homeTeamId;
      elements.awaySelect.value = f.awayTeamId;

      document.querySelectorAll('.fixture-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      runAnalysis();
    });

    elements.fixtureStrip.appendChild(chip);
  });
}

/**
 * Populate team dropdown options
 */
function populateTeamSelects() {
  const teamList = Object.values(state.teams).sort((a, b) => a.position - b.position);

  elements.homeSelect.innerHTML = '';
  elements.awaySelect.innerHTML = '';

  teamList.forEach(t => {
    const optH = document.createElement('option');
    optH.value = t.id;
    optH.textContent = `${t.position}. ${t.name}`;
    if (t.id === state.homeTeamId) optH.selected = true;
    elements.homeSelect.appendChild(optH);

    const optA = document.createElement('option');
    optA.value = t.id;
    optA.textContent = `${t.position}. ${t.name}`;
    if (t.id === state.awayTeamId) optA.selected = true;
    elements.awaySelect.appendChild(optA);
  });
}

/**
 * Main analysis runner: triggers all engines and updates UI
 */
function runAnalysis() {
  const home = state.teams[state.homeTeamId];
  const away = state.teams[state.awayTeamId];

  if (!home || !away) return;

  // Update header meta info
  elements.homeBadge.textContent = home.badge;
  elements.awayBadge.textContent = away.badge;
  elements.homeManager.textContent = `Mgr: ${home.manager}`;
  elements.awayManager.textContent = `Mgr: ${away.manager}`;

  elements.matchVenueText.textContent = `${home.stadium}, Spain`;

  // Render recent form pills
  renderFormPills(home.form, elements.homeForm);
  renderFormPills(away.form, elements.awayForm);

  // Check if this matchup matches an upcoming fixture
  const fixture = UPCOMING_FIXTURES.find(
    f => (f.homeTeamId === home.id && f.awayTeamId === away.id) ||
         (f.homeTeamId === away.id && f.awayTeamId === home.id)
  );

  if (fixture) {
    elements.matchHeadline.textContent = fixture.headline;
    elements.matchDerbyBadge.style.display = fixture.isDerby ? 'inline-block' : 'none';
  } else {
    elements.matchHeadline.textContent = `Tactical Simulation: ${home.name} vs ${away.name}`;
    elements.matchDerbyBadge.style.display = 'none';
  }

  // --- Run Analytical Engines ---
  const dixonColesResult = calculateDixonColes(home, away);
  const cornerResult = calculateCorners(home, away);
  const playerShotResult = calculatePlayerShotProps(home, away);
  const mlResult = runMlRegression(home, away);

  // Update UI components
  renderExecutiveSummary(dixonColesResult, cornerResult, playerShotResult, mlResult);
  renderDixonColesTab(dixonColesResult, home, away);
  renderMlRegressionTab(mlResult, home, away);
  renderCornersTab(cornerResult, home, away);
  renderPlayersTab(playerShotResult);
  renderH2hTab(home, away);
}

/**
 * Render recent form pills (W, D, L)
 */
function renderFormPills(formArray, container) {
  if (!container) return;
  container.innerHTML = '';
  (formArray || []).forEach(res => {
    const pill = document.createElement('span');
    pill.style.display = 'inline-block';
    pill.style.width = '20px';
    pill.style.height = '20px';
    pill.style.lineHeight = '20px';
    pill.style.textAlign = 'center';
    pill.style.borderRadius = '4px';
    pill.style.fontSize = '0.68rem';
    pill.style.fontWeight = '700';
    pill.style.color = '#fff';
    pill.style.marginRight = '3px';

    if (res === 'W') pill.style.background = '#10b981';
    else if (res === 'D') pill.style.background = '#64748b';
    else pill.style.background = '#ef4444';

    pill.textContent = res;
    container.appendChild(pill);
  });
}

/**
 * Render Executive Summary 4 Pillars
 */
function renderExecutiveSummary(dc, corners, playerShots, ml) {
  // Pillar 1: Winner Probabilities (Blend Dixon-Coles & ML Regressions)
  const homeWinPct = Number(((dc.probabilities.homeWin * 0.65 + ml.mlProbabilities.homeWin * 0.35)).toFixed(1));
  const drawPct = Number(((dc.probabilities.draw * 0.65 + ml.mlProbabilities.draw * 0.35)).toFixed(1));
  const awayWinPct = Number(((dc.probabilities.awayWin * 0.65 + ml.mlProbabilities.awayWin * 0.35)).toFixed(1));

  elements.homeProbVal.textContent = `${homeWinPct}%`;
  elements.drawProbVal.textContent = `${drawPct}%`;
  elements.awayProbVal.textContent = `${awayWinPct}%`;

  elements.homeOddsVal.textContent = `@ ${(100 / homeWinPct).toFixed(2)}`;
  elements.drawOddsVal.textContent = `@ ${(100 / drawPct).toFixed(2)}`;
  elements.awayOddsVal.textContent = `@ ${(100 / awayWinPct).toFixed(2)}`;

  elements.barHome.style.width = `${homeWinPct}%`;
  elements.barDraw.style.width = `${drawPct}%`;
  elements.barAway.style.width = `${awayWinPct}%`;

  elements.barHome.textContent = `${homeWinPct}%`;
  elements.barDraw.textContent = `${drawPct}%`;
  elements.barAway.textContent = `${awayWinPct}%`;

  // Pillar 2: Total Goals
  elements.expTotalGoals.textContent = dc.expectedTotalGoals;
  elements.homeXgVal.textContent = dc.lambdaHome;
  elements.awayXgVal.textContent = dc.lambdaAway;
  elements.over25Val.textContent = `${dc.probabilities.over25}%`;
  elements.under25Val.textContent = `${dc.probabilities.under25}%`;
  elements.bttsYesVal.textContent = `${dc.probabilities.bttsYes}%`;

  // Pillar 3: Corners
  elements.expTotalCorners.textContent = corners.totalExpectedCorners;
  elements.homeCornersVal.textContent = corners.expectedHomeCorners;
  elements.awayCornersVal.textContent = corners.expectedAwayCorners;
  elements.over95CornersVal.textContent = `${corners.overUnderLines.over9_5}%`;
  elements.under95CornersVal.textContent = `${corners.overUnderLines.under9_5}%`;

  // Pillar 4: Top Player Shot Threats
  elements.topThreatsContainer.innerHTML = '';
  const topTwo = playerShots.matchTopThreats.slice(0, 2);

  topTwo.forEach(p => {
    const row = document.createElement('div');
    row.className = 'threat-row';
    row.innerHTML = `
      <div class="threat-player-info">
        <span style="font-size: 1.1rem;">${p.teamBadge}</span>
        <div>
          <div style="font-weight: 700; color: #fff;">${p.name} (${p.position})</div>
          <div style="font-size: 0.72rem; color: var(--text-muted);">${p.teamShort} • ${p.sotPer90} SoT/90</div>
        </div>
      </div>
      <div style="text-align: right;">
        <div class="threat-prob">${p.probabilities.onePlusSoT}%</div>
        <div style="font-size: 0.68rem; color: var(--accent-gold);">1+ SoT @ ${p.fairOdds.onePlusSoT}</div>
      </div>
    `;
    elements.topThreatsContainer.appendChild(row);
  });
}

/**
 * Render Tab 1: Dixon-Coles 6x6 Matrix & exact score probabilities
 */
function renderDixonColesTab(dc, home, away) {
  // Parameters
  elements.dcAlphaHome.textContent = dc.alphaHome;
  elements.dcBetaHome.textContent = dc.betaHome;
  elements.dcAlphaAway.textContent = dc.alphaAway;
  elements.dcBetaAway.textContent = dc.betaAway;
  elements.dcLambdaHome.textContent = dc.lambdaHome;
  elements.dcLambdaAway.textContent = dc.lambdaAway;

  // 6x6 Matrix
  elements.dcMatrixBody.innerHTML = '';
  const maxProbInMatrix = Math.max(...dc.matrix.flat());

  for (let h = 0; h < 6; h++) {
    const tr = document.createElement('tr');
    const thRow = document.createElement('th');
    thRow.textContent = `${home.shortName} ${h}`;
    tr.appendChild(thRow);

    for (let a = 0; a < 6; a++) {
      const td = document.createElement('td');
      const prob = dc.matrix[h][a];
      const probPct = (prob * 100).toFixed(1);

      // Intensity gradient
      const intensity = prob / (maxProbInMatrix || 1);
      const bgAlpha = Math.min(0.85, Math.max(0.08, intensity * 0.75));

      td.style.backgroundColor = `rgba(245, 158, 11, ${bgAlpha})`;
      td.className = 'matrix-cell';
      if (prob === maxProbInMatrix) {
        td.classList.add('high-prob');
      }

      td.innerHTML = `
        <div>${probPct}%</div>
        <div style="font-size: 0.62rem; color: var(--text-muted);">${h}-${a}</div>
      `;
      td.title = `${home.name} ${h} - ${a} ${away.name}: ${probPct}% probability`;
      tr.appendChild(td);
    }
    elements.dcMatrixBody.appendChild(tr);
  }

  // Top Ranked Scorelines Table
  elements.topScorelinesBody.innerHTML = '';
  dc.topScorelines.forEach((s, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="font-weight: 700; color: var(--accent-gold);">#${idx + 1}</td>
      <td style="font-weight: 700; font-family: var(--font-display); font-size: 1rem;">${s.score}</td>
      <td style="font-weight: 700; color: #fff;">${s.pct}%</td>
      <td style="color: var(--text-muted);">@ ${(100 / (s.pct || 1)).toFixed(2)}</td>
    `;
    elements.topScorelinesBody.appendChild(tr);
  });
}

/**
 * Render Tab 2: Machine Learning Regressions
 */
function renderMlRegressionTab(ml, home, away) {
  elements.mlPredictedMargin.textContent = ml.predictedGoalMargin > 0 ? `+${ml.predictedGoalMargin}` : ml.predictedGoalMargin;
  elements.mlPredictedWinner.textContent = ml.predictedWinner;
  elements.mlPredictedGoals.textContent = ml.predictedTotalGoals;

  elements.mlFeaturesList.innerHTML = '';
  ml.featureExplanations.forEach(feat => {
    const item = document.createElement('div');
    item.className = 'feature-weight-item';

    item.innerHTML = `
      <div class="feature-header">
        <span class="feature-name">${feat.feature}</span>
        <span class="feature-pct">${feat.importancePct}% Impact</span>
      </div>
      <div class="feature-bar-bg">
        <div class="feature-bar-fill" style="width: ${feat.importancePct}%;"></div>
      </div>
      <div class="feature-desc">
        <strong style="color: ${feat.goalImpact >= 0 ? '#3b82f6' : '#ef4444'};">
          ${feat.goalImpact >= 0 ? `+${feat.goalImpact}` : feat.goalImpact} goals
        </strong> 
        favors <strong>${feat.favors}</strong>. ${feat.explanation}
      </div>
    `;
    elements.mlFeaturesList.appendChild(item);
  });
}

/**
 * Render Tab 3: Corners Detailed Distribution & Style
 */
function renderCornersTab(corners, home, away) {
  elements.cornerHomeCrosses.textContent = `${home.crossing.crossesPerMatch} / match (${home.crossing.crossAccuracyPct}%)`;
  elements.cornerAwayCrosses.textContent = `${away.crossing.crossesPerMatch} / match (${away.crossing.crossAccuracyPct}%)`;
  elements.cornerHomeWingBias.textContent = `${home.crossing.wingPlayBiasPct}%`;
  elements.cornerAwayWingBias.textContent = `${away.crossing.wingPlayBiasPct}%`;

  // Draw distribution bars
  elements.cornerDistChart.innerHTML = '';
  const maxProb = Math.max(...corners.distribution.map(d => d.probability));

  corners.distribution.forEach(d => {
    const col = document.createElement('div');
    col.className = 'dist-bar-col';

    const heightPct = Math.max(4, (d.probability / (maxProb || 1)) * 90);

    col.innerHTML = `
      <span class="dist-val">${d.pct}%</span>
      <div class="dist-bar" style="height: ${heightPct}%;"></div>
      <span class="dist-lbl">${d.count}</span>
    `;
    col.title = `Probability of exactly ${d.count} match corners: ${d.pct}%`;
    elements.cornerDistChart.appendChild(col);
  });
}

/**
 * Render Tab 4: Player Shots on Target Table
 */
function renderPlayersTab(playerShots) {
  elements.playersTableBody.innerHTML = '';

  const allShooters = [...playerShots.homeShooters, ...playerShots.awayShooters]
    .sort((a, b) => b.expectedSoT - a.expectedSoT);

  allShooters.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <div class="player-name-cell">
          <span>${p.teamBadge}</span>
          <div>
            <div>${p.name} ${p.penaltyDuty ? '<span title="Penalty Taker" style="color: var(--accent-gold); font-size: 0.7rem;">(P)</span>' : ''}</div>
            <div style="font-size: 0.7rem; color: var(--text-muted);">${p.teamShort} • ${p.position} • #${p.number}</div>
          </div>
        </div>
      </td>
      <td style="color: var(--text-secondary);">${p.role}</td>
      <td style="font-weight: 600;">${p.shotsPer90}</td>
      <td style="font-weight: 700; color: #fff;">${p.sotPer90}</td>
      <td style="color: var(--text-secondary);">${p.accuracyPct}%</td>
      <td style="font-weight: 700; color: var(--accent-cyan);">${p.expectedShots}</td>
      <td style="font-weight: 800; color: var(--accent-gold); font-family: var(--font-display); font-size: 0.95rem;">${p.expectedSoT}</td>
      <td>
        <span class="sot-pill ${p.probabilities.onePlusSoT >= 60 ? 'sot-high' : 'sot-med'}">
          ${p.probabilities.onePlusSoT}% (@ ${p.fairOdds.onePlusSoT})
        </span>
      </td>
      <td>
        <span class="sot-pill ${p.probabilities.twoPlusSoT >= 35 ? 'sot-high' : 'sot-med'}">
          ${p.probabilities.twoPlusSoT}% (@ ${p.fairOdds.twoPlusSoT})
        </span>
      </td>
      <td style="font-weight: 600; color: var(--accent-emerald);">
        ${p.probabilities.anytimeGoal}%
      </td>
    `;
    elements.playersTableBody.appendChild(tr);
  });
}

/**
 * Render Tab 5: Head to Head & Tactical Comparison
 */
function renderH2hTab(home, away) {
  elements.h2hMetricsContainer.innerHTML = '';

  const metrics = [
    { label: 'Expected Goals (xG) / Match', homeVal: home.xGPerMatch, awayVal: away.xGPerMatch, higherIsBetter: true },
    { label: 'Expected Goals Conceded (xGA)', homeVal: home.xGAPerMatch, awayVal: away.xGAPerMatch, higherIsBetter: false },
    { label: 'Average Possession %', homeVal: home.tacticalStyle.possessionPct, awayVal: away.tacticalStyle.possessionPct, higherIsBetter: true },
    { label: 'Shots per Match', homeVal: home.shots.avgShotsPerMatch, awayVal: away.shots.avgShotsPerMatch, higherIsBetter: true },
    { label: 'Shots Conceded / Match', homeVal: home.shots.avgShotsConceded, awayVal: away.shots.avgShotsConceded, higherIsBetter: false },
    { label: 'Average Corners Won', homeVal: home.corners.avgWon, awayVal: away.corners.avgWon, higherIsBetter: true },
    { label: 'High Press Intensity (PPDA)', homeVal: home.tacticalStyle.ppda, awayVal: away.tacticalStyle.ppda, higherIsBetter: false },
    { label: 'Clean Sheets Kept', homeVal: home.tacticalStyle.cleanSheets, awayVal: away.tacticalStyle.cleanSheets, higherIsBetter: true },
    { label: 'Elo Strength Rating', homeVal: home.eloRating, awayVal: away.eloRating, higherIsBetter: true }
  ];

  metrics.forEach(m => {
    const total = m.homeVal + m.awayVal || 1;
    const homePct = (m.homeVal / total) * 100;
    const awayPct = 100 - homePct;

    const row = document.createElement('div');
    row.style.marginBottom = '1.1rem';

    row.innerHTML = `
      <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 0.35rem;">
        <span style="font-weight: 700; color: #3b82f6;">${m.homeVal}</span>
        <span style="color: var(--text-secondary); font-weight: 600;">${m.label}</span>
        <span style="font-weight: 700; color: #ef4444;">${m.awayVal}</span>
      </div>
      <div class="metric-compare-bar">
        <div class="bar-track" style="width: 100%;">
          <div class="bar-fill-left" style="width: ${homePct}%;"></div>
          <div class="bar-fill-right" style="width: ${awayPct}%;"></div>
        </div>
      </div>
    `;
    elements.h2hMetricsContainer.appendChild(row);
  });
}

/**
 * Render Tab 6: Model Performance Backtesting Log & Verification
 */
function renderBacktestingSuite() {
  if (!elements.kpiAccuracyVal) return;

  const matchday = elements.backtestMatchdayFilter ? elements.backtestMatchdayFilter.value : 'all';
  const minEdge = elements.backtestEdgeFilter ? parseFloat(elements.backtestEdgeFilter.value) : 0.05;

  const results = runBacktest(HISTORICAL_MATCHES, state.teams, { matchday, minEdge });

  // 1. Update KPI Cards
  elements.kpiAccuracyVal.textContent = `${results.accuracyPct}%`;
  elements.kpiHitsDetail.textContent = `${results.correctHits} / ${results.totalMatches} matches hit`;

  elements.kpiBrierVal.textContent = results.brierScore.toFixed(3);
  const brierDiff = ((results.baselineBrier - results.brierScore) / results.baselineBrier) * 100;
  elements.kpiBrierBadge.textContent = `${brierDiff >= 0 ? '-' : '+'}${Math.abs(brierDiff).toFixed(1)}% Error`;

  elements.kpiLoglossVal.textContent = results.logLoss.toFixed(3);
  const logLossDiff = ((results.baselineLogLoss - results.logLoss) / results.baselineLogLoss) * 100;
  elements.kpiLoglossBadge.textContent = `${logLossDiff >= 0 ? '-' : '+'}${Math.abs(logLossDiff).toFixed(1)}% Cross-Entropy`;

  elements.kpiRoiVal.textContent = `${results.roiPct >= 0 ? '+' : ''}${results.roiPct}%`;
  elements.kpiRoiVal.style.color = results.roiPct >= 0 ? 'var(--accent-emerald)' : 'var(--accent-crimson)';
  elements.kpiProfitDetail.textContent = `${results.netProfitUnits >= 0 ? '+' : ''}${results.netProfitUnits}u on ${results.valueBetsCount} bets`;
  elements.kpiWinrateDetail.textContent = `${results.valueBetWinRate}% Win Rate`;

  elements.kpiOuVal.textContent = `${results.overUnderAccuracyPct}%`;
  if (elements.bankrollCurrentVal) {
    elements.bankrollCurrentVal.textContent = `${results.currentBankroll}u`;
    elements.bankrollCurrentVal.style.color = results.currentBankroll >= 100 ? 'var(--accent-emerald)' : 'var(--accent-crimson)';
  }

  // 2. Render Bankroll Equity Curve (SVG)
  renderEquityCurve(results.equityCurve);

  // 3. Render Probability Calibration Bars
  renderCalibrationBars(results.calibrationBuckets);

  // 4. Render Historical Match Audit Table
  renderAuditTable(results.auditRows);
}

/**
 * Draws the SVG Equity Curve Chart
 */
function renderEquityCurve(curveData) {
  if (!elements.equityCurveContainer) return;
  if (!curveData || curveData.length === 0) {
    elements.equityCurveContainer.innerHTML = '<div style="color:var(--text-muted);font-size:0.8rem;text-align:center;padding:2rem;">No bets placed under current filter</div>';
    return;
  }

  const width = 680;
  const height = 170;
  const padLeft = 45;
  const padRight = 20;
  const padTop = 15;
  const padBottom = 25;

  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;

  const bankrolls = curveData.map(d => d.bankroll);
  let minB = Math.min(96, Math.min(...bankrolls) - 1.0);
  let maxB = Math.max(105, Math.max(...bankrolls) + 1.0);

  const getX = (i) => padLeft + (i / (curveData.length - 1 || 1)) * chartW;
  const getY = (val) => padTop + chartH - ((val - minB) / (maxB - minB || 1)) * chartH;

  const baselineY = getY(100.0);

  // Build points path
  const points = curveData.map((d, i) => `${getX(i)},${getY(d.bankroll)}`);
  const linePathD = `M ${points.join(' L ')}`;
  const areaPathD = `${linePathD} L ${getX(curveData.length - 1)},${padTop + chartH} L ${padLeft},${padTop + chartH} Z`;

  // Draw bet event dots
  const dotsHtml = curveData.filter(d => d.betPlaced).map((d) => {
    const cx = getX(d.matchIndex);
    const cy = getY(d.bankroll);
    const color = d.betProfit > 0 ? '#10b981' : '#ef4444';
    return `<circle cx="${cx}" cy="${cy}" r="3.5" fill="${color}" stroke="#101623" stroke-width="1.5"><title>${d.matchLabel}: ${d.betProfit > 0 ? '+' + d.betProfit : d.betProfit}u</title></circle>`;
  }).join('');

  elements.equityCurveContainer.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" style="width:100%;height:100%;overflow:visible;">
      <defs>
        <linearGradient id="equityGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#10b981" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="#10b981" stop-opacity="0.0"/>
        </linearGradient>
      </defs>
      
      <!-- Baseline at 100 units -->
      <line x1="${padLeft}" y1="${baselineY}" x2="${padLeft + chartW}" y2="${baselineY}" stroke="rgba(255,255,255,0.15)" stroke-dasharray="4,4" />
      <text x="${padLeft - 8}" y="${baselineY + 3}" fill="#64748b" font-size="10" text-anchor="end" font-family="var(--font-body)">100u</text>

      <!-- Max / Min Y Labels -->
      <text x="${padLeft - 8}" y="${padTop + 8}" fill="#64748b" font-size="9" text-anchor="end" font-family="var(--font-body)">${maxB.toFixed(0)}u</text>
      <text x="${padLeft - 8}" y="${padTop + chartH}" fill="#64748b" font-size="9" text-anchor="end" font-family="var(--font-body)">${minB.toFixed(0)}u</text>

      <!-- Shaded Area & Trajectory Line -->
      <path d="${areaPathD}" fill="url(#equityGrad)" />
      <path d="${linePathD}" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />

      <!-- Bet Dots -->
      ${dotsHtml}

      <!-- Start and End Labels -->
      <text x="${padLeft}" y="${height - 6}" fill="#64748b" font-size="10" font-family="var(--font-body)">Round 1</text>
      <text x="${padLeft + chartW}" y="${height - 6}" fill="#64748b" font-size="10" text-anchor="end" font-family="var(--font-body)">Round 4</text>
    </svg>
  `;
}

/**
 * Renders Probability Calibration Bars
 */
function renderCalibrationBars(buckets) {
  if (!elements.calibrationBarsContainer) return;
  elements.calibrationBarsContainer.innerHTML = '';

  buckets.forEach(b => {
    const item = document.createElement('div');
    item.className = 'cal-item';
    item.innerHTML = `
      <div class="cal-labels">
        <span style="font-weight:600;color:#fff;">${b.label} Range</span>
        <span>Realized: <strong style="color:var(--accent-cyan);">${b.actualPct}%</strong> (${b.hits}/${b.total})</span>
      </div>
      <div class="cal-track">
        <div class="cal-fill" style="width:${Math.min(100, b.actualPct)}%;"></div>
      </div>
    `;
    elements.calibrationBarsContainer.appendChild(item);
  });
}

/**
 * Renders Match-by-Match Audit Log
 */
function renderAuditTable(rows) {
  if (!elements.backtestAuditBody) return;
  elements.backtestAuditBody.innerHTML = '';

  rows.forEach(r => {
    const tr = document.createElement('tr');

    // Pick formatting
    const outcomeLabel = r.predictedOutcome === 'H' ? `${r.homeShort} Win` : (r.predictedOutcome === 'D' ? 'Draw' : `${r.awayShort} Win`);
    const pickBadge = r.is1X2Hit ?
      `<span class="tag-hit">✓ Hit (${outcomeLabel})</span>` :
      `<span class="tag-miss">✕ Miss (${outcomeLabel})</span>`;

    // Value Bet formatting
    let valCol = `<span class="tag-no-bet">No Qualified Edge</span>`;
    let resultCol = `<span style="color:var(--text-dim);">-</span>`;
    let profitCol = `<span style="color:var(--text-dim);">-</span>`;

    if (r.bestValue && r.bestValue.isQualified) {
      valCol = `<span class="tag-edge">${r.bestValue.label} @ ${r.bestValue.odds} (+${r.bestValue.edgePct}%)</span>`;
      if (r.bestValue.won) {
        resultCol = `<span class="tag-hit">✓ Won</span>`;
        profitCol = `<span class="profit-pos">+${r.bestValue.profit}u</span>`;
      } else {
        resultCol = `<span class="tag-miss">✕ Lost</span>`;
        profitCol = `<span class="profit-neg">-1.00u</span>`;
      }
    }

    tr.innerHTML = `
      <td>
        <div style="font-weight:600;color:#fff;">Matchday ${r.matchday}</div>
        <div style="font-size:0.7rem;color:var(--text-muted);">${r.date}</div>
      </td>
      <td>
        <div style="display:flex;align-items:center;gap:0.4rem;font-weight:600;">
          <span>${r.homeBadge}</span> ${r.homeShort} vs ${r.awayShort} <span>${r.awayBadge}</span>
        </div>
      </td>
      <td>
        <strong style="color:#fff;font-size:0.9rem;font-family:var(--font-display);">${r.actualScore}</strong>
      </td>
      <td>
        <span style="color:${r.actualOutcome==='H'?'#10b981':'var(--text-secondary)'};font-weight:${r.actualOutcome==='H'?'700':'400'};">${r.probabilities.home}%</span> /
        <span style="color:${r.actualOutcome==='D'?'#10b981':'var(--text-secondary)'};font-weight:${r.actualOutcome==='D'?'700':'400'};">${r.probabilities.draw}%</span> /
        <span style="color:${r.actualOutcome==='A'?'#10b981':'var(--text-secondary)'};font-weight:${r.actualOutcome==='A'?'700':'400'};">${r.probabilities.away}%</span>
      </td>
      <td>
        <div>${pickBadge}</div>
        <div style="font-size:0.7rem;color:var(--text-muted);margin-top:2px;">Exp: ${r.predictedScore}</div>
      </td>
      <td>
        <span style="font-family:var(--font-display);font-size:0.75rem;color:var(--text-secondary);">
          ${r.marketOdds.home} | ${r.marketOdds.draw} | ${r.marketOdds.away}
        </span>
      </td>
      <td>${valCol}</td>
      <td>${resultCol}</td>
      <td>${profitCol}</td>
      <td>
        <span style="font-family:var(--font-display);color:var(--text-secondary);font-size:0.78rem;">${r.brierScore}</span>
      </td>
    `;
    elements.backtestAuditBody.appendChild(tr);
  });
}

/**
 * Setup Event Listeners
 */
function setupEventListeners() {
  // Team selection changes
  elements.homeSelect.addEventListener('change', (e) => {
    state.homeTeamId = e.target.value;
    if (state.homeTeamId === state.awayTeamId) {
      // Auto switch away team to another club
      const otherTeams = Object.keys(state.teams).filter(k => k !== state.homeTeamId);
      state.awayTeamId = otherTeams[0];
      elements.awaySelect.value = state.awayTeamId;
    }
    runAnalysis();
  });

  elements.awaySelect.addEventListener('change', (e) => {
    state.awayTeamId = e.target.value;
    if (state.awayTeamId === state.homeTeamId) {
      const otherTeams = Object.keys(state.teams).filter(k => k !== state.awayTeamId);
      state.homeTeamId = otherTeams[0];
      elements.homeSelect.value = state.homeTeamId;
    }
    runAnalysis();
  });

  // Swap teams button
  elements.btnSwapTeams.addEventListener('click', () => {
    const temp = state.homeTeamId;
    state.homeTeamId = state.awayTeamId;
    state.awayTeamId = temp;

    elements.homeSelect.value = state.homeTeamId;
    elements.awaySelect.value = state.awayTeamId;
    runAnalysis();
  });

  // Tab switching
  elements.tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.dataset.tab;
      state.activeTab = targetTab;

      elements.tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      elements.tabPanes.forEach(pane => {
        if (pane.id === `tab-${targetTab}`) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      });
    });
  });

  // API Modal
  elements.btnOpenApiModal.addEventListener('click', () => elements.apiModal.classList.add('active'));
  elements.btnCloseApiModal.addEventListener('click', () => elements.apiModal.classList.remove('active'));

  elements.btnSaveApiSettings.addEventListener('click', async () => {
    const provider = elements.apiProviderSelect.value;
    const apiKey = elements.apiKeyInput.value.trim();
    saveApiSettings({ provider, apiKey });

    if (provider === 'football-data' && apiKey) {
      elements.btnSaveApiSettings.textContent = 'Syncing...';
      elements.btnSaveApiSettings.disabled = true;

      try {
        const liveFixtures = await fetchLiveFootballDataMatches(apiKey);
        if (liveFixtures && liveFixtures.length > 0) {
          UPCOMING_FIXTURES.length = 0;
          UPCOMING_FIXTURES.push(...liveFixtures);
          state.activeFixtureId = liveFixtures[0].id;
          state.homeTeamId = liveFixtures[0].homeTeamId;
          state.awayTeamId = liveFixtures[0].awayTeamId;
          populateFixtureStrip();
          runAnalysis();
          showToast(`Successfully synchronized ${liveFixtures.length} live matches from Football-Data.org!`);
        }
      } catch (err) {
        alert(`Football-Data.org Sync: ${err.message}\n(Note: Direct browser calls can be restricted by CORS. You can also run .\\pull_matches.ps1 in the app directory to pull directly without browser CORS).`);
      } finally {
        elements.btnSaveApiSettings.textContent = 'Save & Sync';
        elements.btnSaveApiSettings.disabled = false;
      }
    } else {
      showToast('API Settings Saved.');
    }
    elements.apiModal.classList.remove('active');
  });

  // CSV Modal
  elements.btnOpenCsvModal.addEventListener('click', () => elements.csvModal.classList.add('active'));
  elements.btnCloseCsvModal.addEventListener('click', () => elements.csvModal.classList.remove('active'));
  elements.btnDownloadSampleCsv.addEventListener('click', () => downloadSampleCsv());

  // CSV Drag and drop / file input
  elements.csvDropZone.addEventListener('click', () => elements.csvFileInput.click());

  elements.csvFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) handleCsvFile(file);
  });

  elements.csvDropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    elements.csvDropZone.style.borderColor = 'var(--accent-gold)';
  });

  elements.csvDropZone.addEventListener('dragleave', () => {
    elements.csvDropZone.style.borderColor = 'var(--border-medium)';
  });

  elements.csvDropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    elements.csvDropZone.style.borderColor = 'var(--border-medium)';
    const file = e.dataTransfer.files[0];
    if (file) handleCsvFile(file);
  });

  // Backtest Filters & Refresh
  if (elements.backtestMatchdayFilter) {
    elements.backtestMatchdayFilter.addEventListener('change', () => renderBacktestingSuite());
  }
  if (elements.backtestEdgeFilter) {
    elements.backtestEdgeFilter.addEventListener('change', () => renderBacktestingSuite());
  }
  if (elements.btnRerunBacktest) {
    elements.btnRerunBacktest.addEventListener('click', () => {
      renderBacktestingSuite();
      showToast('Backtesting model evaluation refreshed!');
    });
  }
}

function handleCsvFile(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const records = parseCsv(e.target.result);
      if (records.length === 0) {
        alert('Could not parse any rows from the CSV. Please check formatting.');
        return;
      }

      // Update team stats matching team_name
      let matchCount = 0;
      records.forEach(r => {
        const teamObj = Object.values(state.teams).find(
          t => t.name.toLowerCase() === (r.team_name || '').toLowerCase()
        );
        if (teamObj) {
          if (r.goals_for !== undefined) teamObj.goalsFor = r.goals_for;
          if (r.goals_against !== undefined) teamObj.goalsAgainst = r.goals_against;
          if (r.xg_for !== undefined) teamObj.xG = r.xg_for;
          if (r.xg_against !== undefined) teamObj.xGA = r.xg_against;
          if (r.avg_corners_won !== undefined) teamObj.corners.avgWon = r.avg_corners_won;
          if (r.avg_corners_conceded !== undefined) teamObj.corners.avgConceded = r.avg_corners_conceded;
          if (r.possession_pct !== undefined) teamObj.tacticalStyle.possessionPct = r.possession_pct;
          matchCount++;
        }
      });

      elements.csvModal.classList.remove('active');
      showToast(`Successfully updated statistics for ${matchCount} teams from CSV!`);
      runAnalysis();
    } catch (err) {
      alert('Error parsing CSV file: ' + err.message);
    }
  };
  reader.readAsText(file);
}

function loadApiConfig() {
  const config = getApiSettings();
  if (elements.apiProviderSelect) elements.apiProviderSelect.value = config.provider || 'demo';
  if (elements.apiKeyInput) elements.apiKeyInput.value = config.apiKey || '';
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast-notice';
  toast.innerHTML = `<span>✓</span> <span>${message}</span>`;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.5s ease';
    setTimeout(() => toast.remove(), 500);
  }, 3500);
}

// Start application when DOM is loaded
window.addEventListener('DOMContentLoaded', init);
