/**
 * Player Shots & Shots on Goal (SoT) Analytical Engine
 *
 * Predicts individual player shot probabilities based on:
 * 1. Historical shots per 90 and shots on target (SoT) per 90.
 * 2. Opponent defensive shot allowance and concession rates.
 * 3. Team projected shot volume and possession dominance.
 * 4. Poisson probabilities for >=1, >=2, and >=3 shots on target.
 */

import { LA_LIGA_PLAYERS } from '../data/playersData.js';
import { LEAGUE_AVERAGES } from '../data/teamsData.js';

function poissonPmf(k, lambda) {
  if (lambda <= 0) return k === 0 ? 1 : 0;
  let fact = 1;
  for (let i = 2; i <= k; i++) fact *= i;
  return (Math.pow(lambda, k) * Math.exp(-lambda)) / fact;
}

/**
 * Computes projected shots and shots on goal for all active players in a matchup
 */
export function calculatePlayerShotProps(homeTeam, awayTeam) {
  const avgLeagueShotsConceded = 12.0;

  // 1. Project total team shots in this specific matchup
  const homeOpponentDefenseFactor = (awayTeam.shots.avgShotsConceded / avgLeagueShotsConceded);
  const homePossessionFactor = (homeTeam.tacticalStyle.possessionPct / 50.0);
  const projectedHomeTeamShots = homeTeam.shots.avgShotsPerMatch * homeOpponentDefenseFactor * 1.06; // home advantage

  const awayOpponentDefenseFactor = (homeTeam.shots.avgShotsConceded / avgLeagueShotsConceded);
  const awayPossessionFactor = (awayTeam.tacticalStyle.possessionPct / 50.0);
  const projectedAwayTeamShots = awayTeam.shots.avgShotsPerMatch * awayOpponentDefenseFactor * 0.94; // away discount

  // Team volume multiplier
  const homeVolumeMultiplier = projectedHomeTeamShots / (homeTeam.shots.avgShotsPerMatch || 1);
  const awayVolumeMultiplier = projectedAwayTeamShots / (awayTeam.shots.avgShotsPerMatch || 1);

  // 2. Fetch players for each squad
  const homePlayers = LA_LIGA_PLAYERS.filter(p => p.teamId === homeTeam.id);
  const awayPlayers = LA_LIGA_PLAYERS.filter(p => p.teamId === awayTeam.id);

  function processPlayer(player, multiplier, teamCrest, teamShort) {
    // Expected shots adjusted for match tempo and opponent defense
    const expectedShots = Number((player.shotsPer90 * multiplier).toFixed(2));
    const accuracy = player.shootingAccuracyPct / 100;
    const expectedSoT = Number((expectedShots * accuracy).toFixed(2));

    // Poisson probabilities for shots on target
    // P(SoT >= 1) = 1 - P(0)
    const pZeroSoT = Math.exp(-expectedSoT);
    const pOneOrMore = Math.max(0, Math.min(0.99, 1 - pZeroSoT));

    // P(SoT >= 2) = 1 - P(0) - P(1)
    const pOneSoT = expectedSoT * Math.exp(-expectedSoT);
    const pTwoOrMore = Math.max(0, Math.min(0.95, 1 - pZeroSoT - pOneSoT));

    // P(SoT >= 3)
    const pTwoSoT = (Math.pow(expectedSoT, 2) * Math.exp(-expectedSoT)) / 2;
    const pThreeOrMore = Math.max(0, Math.min(0.90, 1 - pZeroSoT - pOneSoT - pTwoSoT));

    // Anytime Goal Expectancy
    const goalProb = Math.max(0, Math.min(0.85, 1 - Math.exp(-expectedShots * (player.goalConversionPct / 100))));

    return {
      id: player.id,
      name: player.name,
      teamId: player.teamId,
      teamShort: teamShort,
      teamBadge: teamCrest,
      position: player.position,
      number: player.number,
      role: player.role,
      shotsPer90: player.shotsPer90,
      sotPer90: player.shotsOnTargetPer90,
      accuracyPct: player.shootingAccuracyPct,
      conversionPct: player.goalConversionPct,
      expectedShots: expectedShots,
      expectedSoT: expectedSoT,
      penaltyDuty: player.penaltyTaker,
      freeKickDuty: player.freeKickTaker,

      probabilities: {
        onePlusSoT: Number((pOneOrMore * 100).toFixed(1)),
        twoPlusSoT: Number((pTwoOrMore * 100).toFixed(1)),
        threePlusSoT: Number((pThreeOrMore * 100).toFixed(1)),
        anytimeGoal: Number((goalProb * 100).toFixed(1))
      },

      fairOdds: {
        onePlusSoT: Number((1 / pOneOrMore).toFixed(2)),
        twoPlusSoT: Number((1 / pTwoOrMore).toFixed(2)),
        anytimeGoal: Number((1 / goalProb).toFixed(2))
      }
    };
  }

  const processedHome = homePlayers
    .map(p => processPlayer(p, homeVolumeMultiplier, homeTeam.badge, homeTeam.shortName))
    .sort((a, b) => b.expectedSoT - a.expectedSoT);

  const processedAway = awayPlayers
    .map(p => processPlayer(p, awayVolumeMultiplier, awayTeam.badge, awayTeam.shortName))
    .sort((a, b) => b.expectedSoT - a.expectedSoT);

  const matchTopThreats = [...processedHome, ...processedAway]
    .sort((a, b) => b.expectedSoT - a.expectedSoT)
    .slice(0, 6);

  return {
    projectedTeamShots: {
      home: Number(projectedHomeTeamShots.toFixed(1)),
      away: Number(projectedAwayTeamShots.toFixed(1))
    },
    homeShooters: processedHome,
    awayShooters: processedAway,
    matchTopThreats: matchTopThreats
  };
}
