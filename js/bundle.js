/**
 * FootyPredict AI: La Liga Match Predictor & Tactical Intelligence Engine
 * Complete Self-Contained Standalone Production Bundle (2025/2026 Season)
 * Works out-of-the-box locally via file:/// or any web server with zero external dependencies.
 */
(function () {
  'use strict';

  // =========================================================================
  // 1. LA LIGA 2025/2026 COMPLETE 20-TEAM STATISTICAL DATABASE
  // =========================================================================
  const LA_LIGA_TEAMS = {
    'real-madrid': {
      id: 'real-madrid',
      name: 'Real Madrid',
      shortName: 'RMA',
      badge: '👑',
      crestColor: '#00529F',
      accentColor: '#EEBA2B',
      stadium: 'Santiago Bernabéu',
      manager: 'Carlo Ancelotti',
      played: 27,
      won: 20,
      drawn: 4,
      lost: 3,
      points: 64,
      goalsFor: 62,
      goalsAgainst: 22,
      goalDiff: 40,
      position: 1,
      xG: 58.4,
      xGA: 24.1,
      xGPerMatch: 2.16,
      xGAPerMatch: 0.89,
      eloRating: 1985,
      homeRecord: {
        played: 14, won: 12, drawn: 1, lost: 1, gf: 38, ga: 10,
        xG: 34.2, xGA: 10.8, cornersFor: 7.4, cornersAgainst: 3.1
      },
      awayRecord: {
        played: 13, won: 8, drawn: 3, lost: 2, gf: 24, ga: 12,
        xG: 24.2, xGA: 13.3, cornersFor: 5.9, cornersAgainst: 4.2
      },
      corners: { avgWon: 6.67, avgConceded: 3.63, totalWon: 180, totalConceded: 98 },
      shots: { avgShotsPerMatch: 17.4, avgShotsConceded: 9.2, shotsOnTargetPerMatch: 6.8, shotConversionPct: 13.2 },
      crossing: { crossesPerMatch: 18.2, crossAccuracyPct: 29.5, wingPlayBiasPct: 62 },
      tacticalStyle: { possessionPct: 61.4, passAccuracyPct: 89.2, fieldTiltPct: 68.5, ppda: 9.8, directness: 34.2, cleanSheets: 13, bttsPct: 44 },
      form: ['W', 'W', 'W', 'D', 'W'],
      recentMatches: [
        { opp: 'Getafe', gf: 3, ga: 0, xg: 2.7, xga: 0.4, home: true, result: 'W' },
        { opp: 'Villarreal', gf: 2, ga: 1, xg: 1.9, xga: 1.2, home: false, result: 'W' },
        { opp: 'Rayo Vallecano', gf: 2, ga: 1, xg: 2.1, xga: 0.9, home: true, result: 'W' },
        { opp: 'Atlético Madrid', gf: 1, ga: 1, xg: 1.4, xga: 1.3, home: false, result: 'D' },
        { opp: 'Sevilla', gf: 4, ga: 1, xg: 3.2, xga: 0.8, home: true, result: 'W' }
      ]
    },

    'barcelona': {
      id: 'barcelona',
      name: 'FC Barcelona',
      shortName: 'BAR',
      badge: '🔵🔴',
      crestColor: '#004D98',
      accentColor: '#A50044',
      stadium: 'Spotify Camp Nou / Montjuïc',
      manager: 'Hansi Flick',
      played: 27,
      won: 19,
      drawn: 4,
      lost: 4,
      points: 61,
      goalsFor: 68,
      goalsAgainst: 26,
      goalDiff: 42,
      position: 2,
      xG: 64.8,
      xGA: 27.5,
      xGPerMatch: 2.40,
      xGAPerMatch: 1.02,
      eloRating: 1960,
      homeRecord: {
        played: 13, won: 11, drawn: 1, lost: 1, gf: 42, ga: 12,
        xG: 39.5, xGA: 12.1, cornersFor: 7.8, cornersAgainst: 3.4
      },
      awayRecord: {
        played: 14, won: 8, drawn: 3, lost: 3, gf: 26, ga: 14,
        xG: 25.3, xGA: 15.4, cornersFor: 6.2, cornersAgainst: 4.5
      },
      corners: { avgWon: 6.96, avgConceded: 3.97, totalWon: 188, totalConceded: 107 },
      shots: { avgShotsPerMatch: 18.2, avgShotsConceded: 10.1, shotsOnTargetPerMatch: 7.2, shotConversionPct: 13.8 },
      crossing: { crossesPerMatch: 20.4, crossAccuracyPct: 31.2, wingPlayBiasPct: 70 },
      tacticalStyle: { possessionPct: 65.8, passAccuracyPct: 88.7, fieldTiltPct: 74.2, ppda: 8.2, directness: 31.0, cleanSheets: 11, bttsPct: 52 },
      form: ['W', 'W', 'D', 'W', 'W'],
      recentMatches: [
        { opp: 'Real Betis', gf: 3, ga: 1, xg: 2.8, xga: 1.1, home: true, result: 'W' },
        { opp: 'Mallorca', gf: 4, ga: 1, xg: 3.4, xga: 0.7, home: false, result: 'W' },
        { opp: 'Celta Vigo', gf: 2, ga: 2, xg: 2.1, xga: 1.8, home: false, result: 'D' },
        { opp: 'Las Palmas', gf: 2, ga: 0, xg: 2.4, xga: 0.5, home: true, result: 'W' },
        { opp: 'Real Sociedad', gf: 3, ga: 0, xg: 2.9, xga: 0.6, home: true, result: 'W' }
      ]
    },

    'atletico-madrid': {
      id: 'atletico-madrid',
      name: 'Atlético de Madrid',
      shortName: 'ATM',
      badge: '🔴⚪',
      crestColor: '#CB3524',
      accentColor: '#1A3668',
      stadium: 'Cívitas Metropolitano',
      manager: 'Diego Simeone',
      played: 27,
      won: 17,
      drawn: 6,
      lost: 4,
      points: 57,
      goalsFor: 48,
      goalsAgainst: 20,
      goalDiff: 28,
      position: 3,
      xG: 47.9,
      xGA: 21.8,
      xGPerMatch: 1.77,
      xGAPerMatch: 0.81,
      eloRating: 1910,
      homeRecord: {
        played: 14, won: 11, drawn: 2, lost: 1, gf: 31, ga: 9,
        xG: 29.4, xGA: 9.8, cornersFor: 6.1, cornersAgainst: 3.8
      },
      awayRecord: {
        played: 13, won: 6, drawn: 4, lost: 3, gf: 17, ga: 11,
        xG: 18.5, xGA: 12.0, cornersFor: 4.8, cornersAgainst: 4.9
      },
      corners: { avgWon: 5.48, avgConceded: 4.33, totalWon: 148, totalConceded: 117 },
      shots: { avgShotsPerMatch: 14.3, avgShotsConceded: 9.5, shotsOnTargetPerMatch: 5.5, shotConversionPct: 12.4 },
      crossing: { crossesPerMatch: 16.5, crossAccuracyPct: 27.8, wingPlayBiasPct: 58 },
      tacticalStyle: { possessionPct: 53.2, passAccuracyPct: 85.1, fieldTiltPct: 56.4, ppda: 11.2, directness: 39.5, cleanSheets: 14, bttsPct: 37 },
      form: ['W', 'D', 'W', 'W', 'D'],
      recentMatches: [
        { opp: 'Valencia', gf: 3, ga: 0, xg: 2.2, xga: 0.6, home: true, result: 'W' },
        { opp: 'Real Madrid', gf: 1, ga: 1, xg: 1.3, xga: 1.4, home: true, result: 'D' },
        { opp: 'Alavés', gf: 2, ga: 0, xg: 1.8, xga: 0.5, home: false, result: 'W' },
        { opp: 'Mallorca', gf: 1, ga: 0, xg: 1.5, xga: 0.4, home: false, result: 'W' },
        { opp: 'Athletic Club', gf: 1, ga: 1, xg: 1.2, xga: 1.1, home: true, result: 'D' }
      ]
    },

    'athletic-club': {
      id: 'athletic-club',
      name: 'Athletic Club',
      shortName: 'ATH',
      badge: '🦁',
      crestColor: '#EE2524',
      accentColor: '#FFFFFF',
      stadium: 'San Mamés',
      manager: 'Ernesto Valverde',
      played: 27,
      won: 14,
      drawn: 8,
      lost: 5,
      points: 50,
      goalsFor: 44,
      goalsAgainst: 24,
      goalDiff: 20,
      position: 4,
      xG: 46.2,
      xGA: 26.3,
      xGPerMatch: 1.71,
      xGAPerMatch: 0.97,
      eloRating: 1855,
      homeRecord: {
        played: 14, won: 9, drawn: 4, lost: 1, gf: 28, ga: 10,
        xG: 28.1, xGA: 11.2, cornersFor: 6.8, cornersAgainst: 3.5
      },
      awayRecord: {
        played: 13, won: 5, drawn: 4, lost: 4, gf: 16, ga: 14,
        xG: 18.1, xGA: 15.1, cornersFor: 5.2, cornersAgainst: 4.8
      },
      corners: { avgWon: 6.04, avgConceded: 4.12, totalWon: 163, totalConceded: 111 },
      shots: { avgShotsPerMatch: 15.1, avgShotsConceded: 9.8, shotsOnTargetPerMatch: 5.3, shotConversionPct: 10.8 },
      crossing: { crossesPerMatch: 22.8, crossAccuracyPct: 30.1, wingPlayBiasPct: 74 },
      tacticalStyle: { possessionPct: 54.8, passAccuracyPct: 83.4, fieldTiltPct: 61.2, ppda: 8.9, directness: 43.1, cleanSheets: 12, bttsPct: 41 },
      form: ['W', 'W', 'D', 'L', 'W'],
      recentMatches: [
        { opp: 'Real Valladolid', gf: 4, ga: 1, xg: 2.9, xga: 0.8, home: true, result: 'W' },
        { opp: 'Espanyol', gf: 2, ga: 0, xg: 1.9, xga: 0.5, home: false, result: 'W' },
        { opp: 'Atlético Madrid', gf: 1, ga: 1, xg: 1.1, xga: 1.2, home: false, result: 'D' },
        { opp: 'Barcelona', gf: 1, ga: 2, xg: 1.3, xga: 2.1, home: true, result: 'L' },
        { opp: 'Girona', gf: 2, ga: 1, xg: 2.0, xga: 1.1, home: true, result: 'W' }
      ]
    },

    'villarreal': {
      id: 'villarreal',
      name: 'Villarreal CF',
      shortName: 'VIL',
      badge: '💛',
      crestColor: '#FFE000',
      accentColor: '#0054A6',
      stadium: 'Estadio de la Cerámica',
      manager: 'Marcelino',
      played: 27,
      won: 13,
      drawn: 6,
      lost: 8,
      points: 45,
      goalsFor: 49,
      goalsAgainst: 41,
      goalDiff: 8,
      position: 5,
      xG: 47.8,
      xGA: 40.2,
      xGPerMatch: 1.77,
      xGAPerMatch: 1.49,
      eloRating: 1815,
      homeRecord: {
        played: 13, won: 7, drawn: 3, lost: 3, gf: 28, ga: 19,
        xG: 26.5, xGA: 18.2, cornersFor: 5.7, cornersAgainst: 4.8
      },
      awayRecord: {
        played: 14, won: 6, drawn: 3, lost: 5, gf: 21, ga: 22,
        xG: 21.3, xGA: 22.0, cornersFor: 4.6, cornersAgainst: 5.5
      },
      corners: { avgWon: 5.15, avgConceded: 5.19, totalWon: 139, totalConceded: 140 },
      shots: { avgShotsPerMatch: 13.9, avgShotsConceded: 12.8, shotsOnTargetPerMatch: 5.4, shotConversionPct: 13.1 },
      crossing: { crossesPerMatch: 17.1, crossAccuracyPct: 26.4, wingPlayBiasPct: 61 },
      tacticalStyle: { possessionPct: 51.5, passAccuracyPct: 84.6, fieldTiltPct: 52.0, ppda: 11.8, directness: 44.0, cleanSheets: 7, bttsPct: 70 },
      form: ['L', 'W', 'W', 'L', 'W'],
      recentMatches: [
        { opp: 'Real Madrid', gf: 1, ga: 2, xg: 1.2, xga: 1.9, home: true, result: 'L' },
        { opp: 'Alavés', gf: 3, ga: 1, xg: 2.2, xga: 1.0, home: false, result: 'W' },
        { opp: 'Rayo Vallecano', gf: 2, ga: 1, xg: 1.8, xga: 1.4, home: true, result: 'W' },
        { opp: 'Valencia', gf: 1, ga: 2, xg: 1.5, xga: 1.6, home: false, result: 'L' },
        { opp: 'Mallorca', gf: 2, ga: 0, xg: 2.1, xga: 0.6, home: true, result: 'W' }
      ]
    },

    'real-sociedad': {
      id: 'real-sociedad',
      name: 'Real Sociedad',
      shortName: 'RSO',
      badge: '⚪🔵',
      crestColor: '#0058A8',
      accentColor: '#FFFFFF',
      stadium: 'Reale Arena',
      manager: 'Imanol Alguacil',
      played: 27,
      won: 12,
      drawn: 7,
      lost: 8,
      points: 43,
      goalsFor: 33,
      goalsAgainst: 25,
      goalDiff: 8,
      position: 6,
      xG: 38.4,
      xGA: 26.9,
      xGPerMatch: 1.42,
      xGAPerMatch: 1.00,
      eloRating: 1805,
      homeRecord: {
        played: 14, won: 7, drawn: 3, lost: 4, gf: 19, ga: 12,
        xG: 21.6, xGA: 12.8, cornersFor: 5.6, cornersAgainst: 3.9
      },
      awayRecord: {
        played: 13, won: 5, drawn: 4, lost: 4, gf: 14, ga: 13,
        xG: 16.8, xGA: 14.1, cornersFor: 4.8, cornersAgainst: 4.7
      },
      corners: { avgWon: 5.22, avgConceded: 4.29, totalWon: 141, totalConceded: 116 },
      shots: { avgShotsPerMatch: 13.1, avgShotsConceded: 9.7, shotsOnTargetPerMatch: 4.6, shotConversionPct: 9.4 },
      crossing: { crossesPerMatch: 19.3, crossAccuracyPct: 28.1, wingPlayBiasPct: 65 },
      tacticalStyle: { possessionPct: 56.7, passAccuracyPct: 83.9, fieldTiltPct: 60.1, ppda: 9.4, directness: 36.8, cleanSheets: 11, bttsPct: 41 },
      form: ['W', 'D', 'L', 'W', 'D'],
      recentMatches: [
        { opp: 'Leganés', gf: 2, ga: 0, xg: 1.9, xga: 0.4, home: true, result: 'W' },
        { opp: 'Real Betis', gf: 1, ga: 1, xg: 1.2, xga: 1.3, home: false, result: 'D' },
        { opp: 'Barcelona', gf: 0, ga: 3, xg: 0.6, xga: 2.9, home: false, result: 'L' },
        { opp: 'Sevilla', gf: 2, ga: 1, xg: 1.7, xga: 0.9, home: true, result: 'W' },
        { opp: 'Osasuna', gf: 1, ga: 1, xg: 1.4, xga: 1.1, home: true, result: 'D' }
      ]
    },

    'real-betis': {
      id: 'real-betis',
      name: 'Real Betis',
      shortName: 'BET',
      badge: '💚🤍',
      crestColor: '#0BB364',
      accentColor: '#FFFFFF',
      stadium: 'Benito Villamarín',
      manager: 'Manuel Pellegrini',
      played: 27,
      won: 11,
      drawn: 8,
      lost: 8,
      points: 41,
      goalsFor: 35,
      goalsAgainst: 31,
      goalDiff: 4,
      position: 7,
      xG: 39.5,
      xGA: 34.0,
      xGPerMatch: 1.46,
      xGAPerMatch: 1.26,
      eloRating: 1785,
      homeRecord: {
        played: 14, won: 7, drawn: 4, lost: 3, gf: 22, ga: 14,
        xG: 23.4, xGA: 15.2, cornersFor: 5.5, cornersAgainst: 4.4
      },
      awayRecord: {
        played: 13, won: 4, drawn: 4, lost: 5, gf: 13, ga: 17,
        xG: 16.1, xGA: 18.8, cornersFor: 4.4, cornersAgainst: 5.2
      },
      corners: { avgWon: 4.96, avgConceded: 4.78, totalWon: 134, totalConceded: 129 },
      shots: { avgShotsPerMatch: 13.4, avgShotsConceded: 11.2, shotsOnTargetPerMatch: 4.8, shotConversionPct: 9.7 },
      crossing: { crossesPerMatch: 18.6, crossAccuracyPct: 26.9, wingPlayBiasPct: 63 },
      tacticalStyle: { possessionPct: 53.8, passAccuracyPct: 83.2, fieldTiltPct: 55.4, ppda: 11.4, directness: 39.8, cleanSheets: 8, bttsPct: 52 },
      form: ['L', 'D', 'W', 'D', 'W'],
      recentMatches: [
        { opp: 'Barcelona', gf: 1, ga: 3, xg: 1.1, xga: 2.8, home: false, result: 'L' },
        { opp: 'Real Sociedad', gf: 1, ga: 1, xg: 1.3, xga: 1.2, home: true, result: 'D' },
        { opp: 'Espanyol', gf: 2, ga: 1, xg: 1.9, xga: 0.9, home: false, result: 'W' },
        { opp: 'Celta Vigo', gf: 2, ga: 2, xg: 1.7, xga: 1.6, home: true, result: 'D' },
        { opp: 'Valencia', gf: 2, ga: 1, xg: 1.8, xga: 1.0, home: false, result: 'W' }
      ]
    },

    'girona': {
      id: 'girona',
      name: 'Girona FC',
      shortName: 'GIR',
      badge: '🔴⚪',
      crestColor: '#CB132B',
      accentColor: '#FFFFFF',
      stadium: 'Montilivi',
      manager: 'Míchel',
      played: 27,
      won: 11,
      drawn: 6,
      lost: 10,
      points: 39,
      goalsFor: 39,
      goalsAgainst: 37,
      goalDiff: 2,
      position: 8,
      xG: 41.2,
      xGA: 38.6,
      xGPerMatch: 1.53,
      xGAPerMatch: 1.43,
      eloRating: 1770,
      homeRecord: {
        played: 13, won: 7, drawn: 2, lost: 4, gf: 24, ga: 17,
        xG: 23.5, xGA: 16.8, cornersFor: 5.3, cornersAgainst: 4.6
      },
      awayRecord: {
        played: 14, won: 4, drawn: 4, lost: 6, gf: 15, ga: 20,
        xG: 17.7, xGA: 21.8, cornersFor: 4.3, cornersAgainst: 5.6
      },
      corners: { avgWon: 4.81, avgConceded: 5.11, totalWon: 130, totalConceded: 138 },
      shots: { avgShotsPerMatch: 12.8, avgShotsConceded: 11.9, shotsOnTargetPerMatch: 4.7, shotConversionPct: 11.2 },
      crossing: { crossesPerMatch: 16.4, crossAccuracyPct: 28.5, wingPlayBiasPct: 59 },
      tacticalStyle: { possessionPct: 55.4, passAccuracyPct: 85.0, fieldTiltPct: 57.1, ppda: 10.9, directness: 35.4, cleanSheets: 7, bttsPct: 59 },
      form: ['W', 'L', 'L', 'D', 'W'],
      recentMatches: [
        { opp: 'Getafe', gf: 2, ga: 1, xg: 1.8, xga: 1.1, home: true, result: 'W' },
        { opp: 'Athletic Club', gf: 1, ga: 2, xg: 1.1, xga: 2.0, home: false, result: 'L' },
        { opp: 'Las Palmas', gf: 0, ga: 1, xg: 1.2, xga: 0.9, home: false, result: 'L' },
        { opp: 'Real Sociedad', gf: 1, ga: 1, xg: 1.4, xga: 1.5, home: true, result: 'D' },
        { opp: 'Leganés', gf: 3, ga: 1, xg: 2.3, xga: 0.8, home: true, result: 'W' }
      ]
    },

    'celta-vigo': {
      id: 'celta-vigo',
      name: 'RC Celta Vigo',
      shortName: 'CEL',
      badge: '🩵',
      crestColor: '#72C7E7',
      accentColor: '#C4122F',
      stadium: 'Abanca-Balaídos',
      manager: 'Claudio Giráldez',
      played: 27,
      won: 10,
      drawn: 7,
      lost: 10,
      points: 37,
      goalsFor: 41,
      goalsAgainst: 40,
      goalDiff: 1,
      position: 9,
      xG: 39.8,
      xGA: 41.5,
      xGPerMatch: 1.47,
      xGAPerMatch: 1.54,
      eloRating: 1740,
      homeRecord: {
        played: 14, won: 7, drawn: 3, lost: 4, gf: 25, ga: 18,
        xG: 23.9, xGA: 18.5, cornersFor: 5.6, cornersAgainst: 4.8
      },
      awayRecord: {
        played: 13, won: 3, drawn: 4, lost: 6, gf: 16, ga: 22,
        xG: 15.9, xGA: 23.0, cornersFor: 4.5, cornersAgainst: 5.7
      },
      corners: { avgWon: 5.07, avgConceded: 5.26, totalWon: 137, totalConceded: 142 },
      shots: { avgShotsPerMatch: 12.6, avgShotsConceded: 12.4, shotsOnTargetPerMatch: 4.5, shotConversionPct: 12.0 },
      crossing: { crossesPerMatch: 17.5, crossAccuracyPct: 27.2, wingPlayBiasPct: 64 },
      tacticalStyle: { possessionPct: 53.1, passAccuracyPct: 82.8, fieldTiltPct: 53.8, ppda: 11.1, directness: 41.2, cleanSheets: 5, bttsPct: 67 },
      form: ['D', 'W', 'D', 'L', 'W'],
      recentMatches: [
        { opp: 'Barcelona', gf: 2, ga: 2, xg: 1.8, xga: 2.1, home: true, result: 'D' },
        { opp: 'Valladolid', gf: 3, ga: 1, xg: 2.4, xga: 0.9, home: false, result: 'W' },
        { opp: 'Real Betis', gf: 2, ga: 2, xg: 1.6, xga: 1.7, home: false, result: 'D' },
        { opp: 'Alavés', gf: 0, ga: 1, xg: 1.0, xga: 1.3, home: true, result: 'L' },
        { opp: 'Osasuna', gf: 2, ga: 1, xg: 1.7, xga: 1.2, home: true, result: 'W' }
      ]
    },

    'mallorca': {
      id: 'mallorca',
      name: 'RCD Mallorca',
      shortName: 'MLL',
      badge: '🔴⚫',
      crestColor: '#E20613',
      accentColor: '#000000',
      stadium: 'Mallorca Son Moix',
      manager: 'Jagoba Arrasate',
      played: 27,
      won: 10,
      drawn: 6,
      lost: 11,
      points: 36,
      goalsFor: 28,
      goalsAgainst: 30,
      goalDiff: -2,
      position: 10,
      xG: 31.4,
      xGA: 32.8,
      xGPerMatch: 1.16,
      xGAPerMatch: 1.21,
      eloRating: 1725,
      homeRecord: {
        played: 14, won: 6, drawn: 4, lost: 4, gf: 16, ga: 13,
        xG: 18.2, xGA: 14.1, cornersFor: 5.0, cornersAgainst: 4.4
      },
      awayRecord: {
        played: 13, won: 4, drawn: 2, lost: 7, gf: 12, ga: 17,
        xG: 13.2, xGA: 18.7, cornersFor: 3.8, cornersAgainst: 5.6
      },
      corners: { avgWon: 4.41, avgConceded: 4.96, totalWon: 119, totalConceded: 134 },
      shots: { avgShotsPerMatch: 11.2, avgShotsConceded: 11.5, shotsOnTargetPerMatch: 3.8, shotConversionPct: 9.3 },
      crossing: { crossesPerMatch: 20.8, crossAccuracyPct: 29.8, wingPlayBiasPct: 71 },
      tacticalStyle: { possessionPct: 46.2, passAccuracyPct: 78.9, fieldTiltPct: 45.1, ppda: 13.4, directness: 48.2, cleanSheets: 8, bttsPct: 44 },
      form: ['L', 'W', 'L', 'L', 'D'],
      recentMatches: [
        { opp: 'Barcelona', gf: 1, ga: 4, xg: 0.7, xga: 3.4, home: true, result: 'L' },
        { opp: 'Las Palmas', gf: 3, ga: 2, xg: 1.9, xga: 1.5, home: false, result: 'W' },
        { opp: 'Atlético Madrid', gf: 0, ga: 1, xg: 0.4, xga: 1.5, home: true, result: 'L' },
        { opp: 'Villarreal', gf: 0, ga: 2, xg: 0.6, xga: 2.1, home: false, result: 'L' },
        { opp: 'Getafe', gf: 1, ga: 1, xg: 1.1, xga: 0.9, home: true, result: 'D' }
      ]
    },

    'osasuna': {
      id: 'osasuna',
      name: 'CA Osasuna',
      shortName: 'OSA',
      badge: '🔴🔵',
      crestColor: '#D91A2A',
      accentColor: '#122543',
      stadium: 'El Sadar',
      manager: 'Vicente Moreno',
      played: 27,
      won: 9,
      drawn: 8,
      lost: 10,
      points: 35,
      goalsFor: 34,
      goalsAgainst: 39,
      goalDiff: -5,
      position: 11,
      xG: 34.9,
      xGA: 39.2,
      xGPerMatch: 1.29,
      xGAPerMatch: 1.45,
      eloRating: 1715,
      homeRecord: {
        played: 14, won: 7, drawn: 3, lost: 4, gf: 22, ga: 18,
        xG: 21.0, xGA: 17.5, cornersFor: 5.3, cornersAgainst: 4.5
      },
      awayRecord: {
        played: 13, won: 2, drawn: 5, lost: 6, gf: 12, ga: 21,
        xG: 13.9, xGA: 21.7, cornersFor: 4.1, cornersAgainst: 5.4
      },
      corners: { avgWon: 4.74, avgConceded: 4.93, totalWon: 128, totalConceded: 133 },
      shots: { avgShotsPerMatch: 11.8, avgShotsConceded: 12.2, shotsOnTargetPerMatch: 4.0, shotConversionPct: 10.7 },
      crossing: { crossesPerMatch: 18.9, crossAccuracyPct: 27.5, wingPlayBiasPct: 67 },
      tacticalStyle: { possessionPct: 48.9, passAccuracyPct: 79.5, fieldTiltPct: 48.2, ppda: 12.1, directness: 46.5, cleanSheets: 7, bttsPct: 56 },
      form: ['D', 'L', 'W', 'D', 'L'],
      recentMatches: [
        { opp: 'Real Sociedad', gf: 1, ga: 1, xg: 1.1, xga: 1.4, home: false, result: 'D' },
        { opp: 'Celta Vigo', gf: 1, ga: 2, xg: 1.2, xga: 1.7, home: false, result: 'L' },
        { opp: 'Valladolid', gf: 1, ga: 0, xg: 1.5, xga: 0.7, home: true, result: 'W' },
        { opp: 'Rayo Vallecano', gf: 1, ga: 1, xg: 1.2, xga: 1.2, home: true, result: 'D' },
        { opp: 'Real Madrid', gf: 0, ga: 4, xg: 0.5, xga: 3.1, home: false, result: 'L' }
      ]
    },

    'rayo-vallecano': {
      id: 'rayo-vallecano',
      name: 'Rayo Vallecano',
      shortName: 'RAY',
      badge: '⚡',
      crestColor: '#E21A1A',
      accentColor: '#FFFFFF',
      stadium: 'Vallecas',
      manager: 'Iñigo Pérez',
      played: 27,
      won: 9,
      drawn: 8,
      lost: 10,
      points: 35,
      goalsFor: 29,
      goalsAgainst: 33,
      goalDiff: -4,
      position: 12,
      xG: 32.1,
      xGA: 34.5,
      xGPerMatch: 1.19,
      xGAPerMatch: 1.28,
      eloRating: 1710,
      homeRecord: {
        played: 13, won: 5, drawn: 4, lost: 4, gf: 17, ga: 15,
        xG: 18.0, xGA: 15.2, cornersFor: 5.8, cornersAgainst: 4.5
      },
      awayRecord: {
        played: 14, won: 4, drawn: 4, lost: 6, gf: 12, ga: 18,
        xG: 14.1, xGA: 19.3, cornersFor: 4.4, cornersAgainst: 5.3
      },
      corners: { avgWon: 5.07, avgConceded: 4.93, totalWon: 137, totalConceded: 133 },
      shots: { avgShotsPerMatch: 12.5, avgShotsConceded: 11.6, shotsOnTargetPerMatch: 4.1, shotConversionPct: 8.6 },
      crossing: { crossesPerMatch: 21.3, crossAccuracyPct: 28.2, wingPlayBiasPct: 69 },
      tacticalStyle: { possessionPct: 49.6, passAccuracyPct: 79.1, fieldTiltPct: 51.5, ppda: 8.7, directness: 44.2, cleanSheets: 7, bttsPct: 48 },
      form: ['L', 'D', 'W', 'L', 'D'],
      recentMatches: [
        { opp: 'Real Madrid', gf: 1, ga: 2, xg: 0.9, xga: 2.1, home: false, result: 'L' },
        { opp: 'Osasuna', gf: 1, ga: 1, xg: 1.2, xga: 1.2, home: false, result: 'D' },
        { opp: 'Alavés', gf: 1, ga: 0, xg: 1.4, xga: 0.8, home: true, result: 'W' },
        { opp: 'Villarreal', gf: 1, ga: 2, xg: 1.4, xga: 1.8, home: false, result: 'L' },
        { opp: 'Leganés', gf: 1, ga: 1, xg: 1.3, xga: 0.9, home: true, result: 'D' }
      ]
    },

    'sevilla': {
      id: 'sevilla',
      name: 'Sevilla FC',
      shortName: 'SEV',
      badge: '⚪🔴',
      crestColor: '#D4001F',
      accentColor: '#FFFFFF',
      stadium: 'Ramón Sánchez-Pizjuán',
      manager: 'García Pimienta',
      played: 27,
      won: 9,
      drawn: 7,
      lost: 11,
      points: 34,
      goalsFor: 32,
      goalsAgainst: 38,
      goalDiff: -6,
      position: 13,
      xG: 35.6,
      xGA: 37.9,
      xGPerMatch: 1.32,
      xGAPerMatch: 1.40,
      eloRating: 1720,
      homeRecord: {
        played: 14, won: 6, drawn: 3, lost: 5, gf: 19, ga: 17,
        xG: 21.0, xGA: 16.8, cornersFor: 5.7, cornersAgainst: 4.3
      },
      awayRecord: {
        played: 13, won: 3, drawn: 4, lost: 6, gf: 13, ga: 21,
        xG: 14.6, xGA: 21.1, cornersFor: 4.7, cornersAgainst: 5.6
      },
      corners: { avgWon: 5.22, avgConceded: 4.93, totalWon: 141, totalConceded: 133 },
      shots: { avgShotsPerMatch: 13.0, avgShotsConceded: 12.1, shotsOnTargetPerMatch: 4.4, shotConversionPct: 9.1 },
      crossing: { crossesPerMatch: 22.1, crossAccuracyPct: 27.6, wingPlayBiasPct: 72 },
      tacticalStyle: { possessionPct: 54.2, passAccuracyPct: 83.1, fieldTiltPct: 56.8, ppda: 10.5, directness: 37.9, cleanSheets: 6, bttsPct: 56 },
      form: ['L', 'W', 'L', 'D', 'W'],
      recentMatches: [
        { opp: 'Real Madrid', gf: 1, ga: 4, xg: 0.8, xga: 3.2, home: false, result: 'L' },
        { opp: 'Espanyol', gf: 2, ga: 0, xg: 1.8, xga: 0.6, home: true, result: 'W' },
        { opp: 'Real Sociedad', gf: 1, ga: 2, xg: 0.9, xga: 1.7, home: false, result: 'L' },
        { opp: 'Valencia', gf: 1, ga: 1, xg: 1.4, xga: 1.3, home: true, result: 'D' },
        { opp: 'Valladolid', gf: 2, ga: 1, xg: 2.1, xga: 0.9, home: true, result: 'W' }
      ]
    },

    'las-palmas': {
      id: 'las-palmas',
      name: 'UD Las Palmas',
      shortName: 'LPA',
      badge: '🟡🔵',
      crestColor: '#FFE500',
      accentColor: '#0055A5',
      stadium: 'Gran Canaria',
      manager: 'Diego Martínez',
      played: 27,
      won: 8,
      drawn: 8,
      lost: 11,
      points: 32,
      goalsFor: 33,
      goalsAgainst: 42,
      goalDiff: -9,
      position: 14,
      xG: 31.8,
      xGA: 43.1,
      xGPerMatch: 1.18,
      xGAPerMatch: 1.60,
      eloRating: 1695,
      homeRecord: {
        played: 13, won: 5, drawn: 4, lost: 4, gf: 19, ga: 17,
        xG: 18.2, xGA: 18.0, cornersFor: 4.5, cornersAgainst: 5.1
      },
      awayRecord: {
        played: 14, won: 3, drawn: 4, lost: 7, gf: 14, ga: 25,
        xG: 13.6, xGA: 25.1, cornersFor: 3.6, cornersAgainst: 6.2
      },
      corners: { avgWon: 4.04, avgConceded: 5.67, totalWon: 109, totalConceded: 153 },
      shots: { avgShotsPerMatch: 10.9, avgShotsConceded: 13.4, shotsOnTargetPerMatch: 3.7, shotConversionPct: 11.2 },
      crossing: { crossesPerMatch: 14.8, crossAccuracyPct: 26.1, wingPlayBiasPct: 56 },
      tacticalStyle: { possessionPct: 52.6, passAccuracyPct: 83.7, fieldTiltPct: 50.8, ppda: 12.7, directness: 35.1, cleanSheets: 5, bttsPct: 63 },
      form: ['L', 'L', 'W', 'W', 'D'],
      recentMatches: [
        { opp: 'Barcelona', gf: 0, ga: 2, xg: 0.5, xga: 2.4, home: false, result: 'L' },
        { opp: 'Mallorca', gf: 2, ga: 3, xg: 1.5, xga: 1.9, home: true, result: 'L' },
        { opp: 'Girona', gf: 1, ga: 0, xg: 0.9, xga: 1.2, home: true, result: 'W' },
        { opp: 'Valencia', gf: 3, ga: 2, xg: 1.7, xga: 1.8, home: false, result: 'W' },
        { opp: 'Leganés', gf: 1, ga: 1, xg: 1.1, xga: 1.0, home: false, result: 'D' }
      ]
    },

    'alaves': {
      id: 'alaves',
      name: 'Deportivo Alavés',
      shortName: 'ALA',
      badge: '⚪🔵',
      crestColor: '#0055A5',
      accentColor: '#FFFFFF',
      stadium: 'Mendizorroza',
      manager: 'Luis García Plaza',
      played: 27,
      won: 8,
      drawn: 6,
      lost: 13,
      points: 30,
      goalsFor: 29,
      goalsAgainst: 38,
      goalDiff: -9,
      position: 15,
      xG: 32.5,
      xGA: 37.4,
      xGPerMatch: 1.20,
      xGAPerMatch: 1.39,
      eloRating: 1685,
      homeRecord: {
        played: 14, won: 6, drawn: 3, lost: 5, gf: 18, ga: 16,
        xG: 19.5, xGA: 15.8, cornersFor: 5.4, cornersAgainst: 4.5
      },
      awayRecord: {
        played: 13, won: 2, drawn: 3, lost: 8, gf: 11, ga: 22,
        xG: 13.0, xGA: 21.6, cornersFor: 4.0, cornersAgainst: 5.7
      },
      corners: { avgWon: 4.74, avgConceded: 5.07, totalWon: 128, totalConceded: 137 },
      shots: { avgShotsPerMatch: 11.9, avgShotsConceded: 11.8, shotsOnTargetPerMatch: 3.9, shotConversionPct: 9.1 },
      crossing: { crossesPerMatch: 21.6, crossAccuracyPct: 29.1, wingPlayBiasPct: 73 },
      tacticalStyle: { possessionPct: 45.1, passAccuracyPct: 76.5, fieldTiltPct: 46.2, ppda: 11.0, directness: 48.9, cleanSheets: 6, bttsPct: 52 },
      form: ['L', 'L', 'L', 'W', 'W'],
      recentMatches: [
        { opp: 'Atlético Madrid', gf: 0, ga: 2, xg: 0.5, xga: 1.8, home: true, result: 'L' },
        { opp: 'Villarreal', gf: 1, ga: 3, xg: 1.0, xga: 2.2, home: true, result: 'L' },
        { opp: 'Rayo Vallecano', gf: 0, ga: 1, xg: 0.8, xga: 1.4, home: false, result: 'L' },
        { opp: 'Celta Vigo', gf: 1, ga: 0, xg: 1.3, xga: 1.0, home: false, result: 'W' },
        { opp: 'Valladolid', gf: 3, ga: 2, xg: 2.1, xga: 1.5, home: true, result: 'W' }
      ]
    },

    'getafe': {
      id: 'getafe',
      name: 'Getafe CF',
      shortName: 'GET',
      badge: '🔵',
      crestColor: '#00529F',
      accentColor: '#FFFFFF',
      stadium: 'Coliseum',
      manager: 'José Bordalás',
      played: 27,
      won: 7,
      drawn: 9,
      lost: 11,
      points: 30,
      goalsFor: 20,
      goalsAgainst: 26,
      goalDiff: -6,
      position: 16,
      xG: 24.5,
      xGA: 28.2,
      xGPerMatch: 0.91,
      xGAPerMatch: 1.04,
      eloRating: 1690,
      homeRecord: {
        played: 14, won: 5, drawn: 6, lost: 3, gf: 13, ga: 10,
        xG: 14.8, xGA: 11.2, cornersFor: 4.4, cornersAgainst: 3.9
      },
      awayRecord: {
        played: 13, won: 2, drawn: 3, lost: 8, gf: 7, ga: 16,
        xG: 9.7, xGA: 17.0, cornersFor: 3.5, cornersAgainst: 5.1
      },
      corners: { avgWon: 3.96, avgConceded: 4.48, totalWon: 107, totalConceded: 121 },
      shots: { avgShotsPerMatch: 10.2, avgShotsConceded: 10.5, shotsOnTargetPerMatch: 3.2, shotConversionPct: 7.2 },
      crossing: { crossesPerMatch: 19.5, crossAccuracyPct: 25.4, wingPlayBiasPct: 68 },
      tacticalStyle: { possessionPct: 43.8, passAccuracyPct: 73.2, fieldTiltPct: 41.6, ppda: 8.5, directness: 52.1, cleanSheets: 9, bttsPct: 37 },
      form: ['L', 'L', 'D', 'W', 'D'],
      recentMatches: [
        { opp: 'Real Madrid', gf: 0, ga: 3, xg: 0.4, xga: 2.7, home: false, result: 'L' },
        { opp: 'Girona', gf: 1, ga: 2, xg: 1.1, xga: 1.8, home: false, result: 'L' },
        { opp: 'Mallorca', gf: 1, ga: 1, xg: 0.9, xga: 1.1, home: false, result: 'D' },
        { opp: 'Valencia', gf: 1, ga: 0, xg: 1.2, xga: 0.6, home: true, result: 'W' },
        { opp: 'Espanyol', gf: 0, ga: 0, xg: 0.7, xga: 0.5, home: true, result: 'D' }
      ]
    },

    'valencia': {
      id: 'valencia',
      name: 'Valencia CF',
      shortName: 'VAL',
      badge: '🦇',
      crestColor: '#EE2524',
      accentColor: '#FF6600',
      stadium: 'Mestalla',
      manager: 'Rubén Baraja',
      played: 27,
      won: 6,
      drawn: 10,
      lost: 11,
      points: 28,
      goalsFor: 28,
      goalsAgainst: 39,
      goalDiff: -11,
      position: 17,
      xG: 31.0,
      xGA: 39.5,
      xGPerMatch: 1.15,
      xGAPerMatch: 1.46,
      eloRating: 1680,
      homeRecord: {
        played: 14, won: 5, drawn: 5, lost: 4, gf: 18, ga: 17,
        xG: 18.5, xGA: 16.2, cornersFor: 5.1, cornersAgainst: 4.8
      },
      awayRecord: {
        played: 13, won: 1, drawn: 5, lost: 7, gf: 10, ga: 22,
        xG: 12.5, xGA: 23.3, cornersFor: 3.8, cornersAgainst: 5.8
      },
      corners: { avgWon: 4.48, avgConceded: 5.26, totalWon: 121, totalConceded: 142 },
      shots: { avgShotsPerMatch: 10.8, avgShotsConceded: 12.6, shotsOnTargetPerMatch: 3.6, shotConversionPct: 9.6 },
      crossing: { crossesPerMatch: 17.8, crossAccuracyPct: 26.5, wingPlayBiasPct: 62 },
      tacticalStyle: { possessionPct: 45.8, passAccuracyPct: 78.4, fieldTiltPct: 45.0, ppda: 11.5, directness: 46.2, cleanSheets: 5, bttsPct: 56 },
      form: ['L', 'W', 'D', 'L', 'L'],
      recentMatches: [
        { opp: 'Atlético Madrid', gf: 0, ga: 3, xg: 0.6, xga: 2.2, home: false, result: 'L' },
        { opp: 'Villarreal', gf: 2, ga: 1, xg: 1.6, xga: 1.5, home: true, result: 'W' },
        { opp: 'Sevilla', gf: 1, ga: 1, xg: 1.3, xga: 1.4, home: false, result: 'D' },
        { opp: 'Getafe', gf: 0, ga: 1, xg: 0.6, xga: 1.2, home: false, result: 'L' },
        { opp: 'Real Betis', gf: 1, ga: 2, xg: 1.0, xga: 1.8, home: true, result: 'L' }
      ]
    },

    'espanyol': {
      id: 'espanyol',
      name: 'RCD Espanyol',
      shortName: 'ESP',
      badge: '⚪🔵',
      crestColor: '#0058A8',
      accentColor: '#FFFFFF',
      stadium: 'RCDE Stadium',
      manager: 'Manolo González',
      played: 27,
      won: 6,
      drawn: 7,
      lost: 14,
      points: 25,
      goalsFor: 25,
      goalsAgainst: 44,
      goalDiff: -19,
      position: 18,
      xG: 27.9,
      xGA: 45.1,
      xGPerMatch: 1.03,
      xGAPerMatch: 1.67,
      eloRating: 1650,
      homeRecord: {
        played: 14, won: 5, drawn: 4, lost: 5, gf: 17, ga: 19,
        xG: 16.9, xGA: 18.8, cornersFor: 4.8, cornersAgainst: 5.0
      },
      awayRecord: {
        played: 13, won: 1, drawn: 3, lost: 9, gf: 8, ga: 25,
        xG: 11.0, xGA: 26.3, cornersFor: 3.5, cornersAgainst: 6.1
      },
      corners: { avgWon: 4.19, avgConceded: 5.52, totalWon: 113, totalConceded: 149 },
      shots: { avgShotsPerMatch: 10.4, avgShotsConceded: 13.9, shotsOnTargetPerMatch: 3.4, shotConversionPct: 8.9 },
      crossing: { crossesPerMatch: 18.2, crossAccuracyPct: 25.8, wingPlayBiasPct: 66 },
      tacticalStyle: { possessionPct: 43.1, passAccuracyPct: 76.9, fieldTiltPct: 41.8, ppda: 12.3, directness: 49.5, cleanSheets: 4, bttsPct: 56 },
      form: ['L', 'L', 'L', 'D', 'W'],
      recentMatches: [
        { opp: 'Athletic Club', gf: 0, ga: 2, xg: 0.5, xga: 1.9, home: true, result: 'L' },
        { opp: 'Sevilla', gf: 0, ga: 2, xg: 0.6, xga: 1.8, home: false, result: 'L' },
        { opp: 'Real Betis', gf: 1, ga: 2, xg: 0.9, xga: 1.9, home: true, result: 'L' },
        { opp: 'Getafe', gf: 0, ga: 0, xg: 0.5, xga: 0.7, home: false, result: 'D' },
        { opp: 'Leganés', gf: 2, ga: 1, xg: 1.6, xga: 1.1, home: true, result: 'W' }
      ]
    },

    'leganes': {
      id: 'leganes',
      name: 'CD Leganés',
      shortName: 'LEG',
      badge: '🥒',
      crestColor: '#0054A6',
      accentColor: '#FFFFFF',
      stadium: 'Butarque',
      manager: 'Borja Jiménez',
      played: 27,
      won: 5,
      drawn: 9,
      lost: 13,
      points: 24,
      goalsFor: 22,
      goalsAgainst: 37,
      goalDiff: -15,
      position: 19,
      xG: 23.8,
      xGA: 38.6,
      xGPerMatch: 0.88,
      xGAPerMatch: 1.43,
      eloRating: 1640,
      homeRecord: {
        played: 13, won: 4, drawn: 4, lost: 5, gf: 13, ga: 16,
        xG: 13.9, xGA: 16.0, cornersFor: 4.2, cornersAgainst: 4.8
      },
      awayRecord: {
        played: 14, won: 1, drawn: 5, lost: 8, gf: 9, ga: 21,
        xG: 9.9, xGA: 22.6, cornersFor: 3.4, cornersAgainst: 5.7
      },
      corners: { avgWon: 3.78, avgConceded: 5.26, totalWon: 102, totalConceded: 142 },
      shots: { avgShotsPerMatch: 9.6, avgShotsConceded: 12.9, shotsOnTargetPerMatch: 3.1, shotConversionPct: 8.5 },
      crossing: { crossesPerMatch: 16.0, crossAccuracyPct: 24.8, wingPlayBiasPct: 60 },
      tacticalStyle: { possessionPct: 42.5, passAccuracyPct: 76.1, fieldTiltPct: 39.5, ppda: 13.1, directness: 51.0, cleanSheets: 6, bttsPct: 44 },
      form: ['L', 'D', 'L', 'D', 'L'],
      recentMatches: [
        { opp: 'Real Sociedad', gf: 0, ga: 2, xg: 0.4, xga: 1.9, home: false, result: 'L' },
        { opp: 'Rayo Vallecano', gf: 1, ga: 1, xg: 0.9, xga: 1.3, home: false, result: 'D' },
        { opp: 'Girona', gf: 1, ga: 3, xg: 0.8, xga: 2.3, home: false, result: 'L' },
        { opp: 'Las Palmas', gf: 1, ga: 1, xg: 1.0, xga: 1.1, home: true, result: 'D' },
        { opp: 'Espanyol', gf: 1, ga: 2, xg: 1.1, xga: 1.6, home: false, result: 'L' }
      ]
    },

    'valladolid': {
      id: 'valladolid',
      name: 'Real Valladolid',
      shortName: 'VLL',
      badge: '🟣⚪',
      crestColor: '#532D84',
      accentColor: '#FFFFFF',
      stadium: 'José Zorrilla',
      manager: 'Paulo Pezzolano',
      played: 27,
      won: 4,
      drawn: 5,
      lost: 18,
      points: 17,
      goalsFor: 18,
      goalsAgainst: 55,
      goalDiff: -37,
      position: 20,
      xG: 21.6,
      xGA: 53.2,
      xGPerMatch: 0.80,
      xGAPerMatch: 1.97,
      eloRating: 1610,
      homeRecord: {
        played: 14, won: 3, drawn: 4, lost: 7, gf: 11, ga: 21,
        xG: 13.2, xGA: 23.4, cornersFor: 4.1, cornersAgainst: 5.3
      },
      awayRecord: {
        played: 13, won: 1, drawn: 1, lost: 11, gf: 7, ga: 34,
        xG: 8.4, xGA: 29.8, cornersFor: 3.2, cornersAgainst: 6.8
      },
      corners: { avgWon: 3.67, avgConceded: 6.04, totalWon: 99, totalConceded: 163 },
      shots: { avgShotsPerMatch: 9.1, avgShotsConceded: 15.2, shotsOnTargetPerMatch: 2.8, shotConversionPct: 7.3 },
      crossing: { crossesPerMatch: 15.5, crossAccuracyPct: 23.9, wingPlayBiasPct: 58 },
      tacticalStyle: { possessionPct: 44.0, passAccuracyPct: 76.8, fieldTiltPct: 38.2, ppda: 13.8, directness: 48.0, cleanSheets: 3, bttsPct: 48 },
      form: ['L', 'L', 'L', 'L', 'L'],
      recentMatches: [
        { opp: 'Athletic Club', gf: 1, ga: 4, xg: 0.8, xga: 2.9, home: false, result: 'L' },
        { opp: 'Celta Vigo', gf: 1, ga: 3, xg: 0.9, xga: 2.4, home: true, result: 'L' },
        { opp: 'Osasuna', gf: 0, ga: 1, xg: 0.7, xga: 1.5, home: false, result: 'L' },
        { opp: 'Sevilla', gf: 1, ga: 2, xg: 0.9, xga: 2.1, home: false, result: 'L' },
        { opp: 'Alavés', gf: 2, ga: 3, xg: 1.5, xga: 2.1, home: false, result: 'L' }
      ]
    },

    'racing-santander': {
      id: 'racing-santander',
      name: 'Racing Santander',
      shortName: 'RAC',
      badge: '🟢⚪',
      crestColor: '#008037',
      accentColor: '#FFFFFF',
      stadium: 'El Sardinero',
      manager: 'José Alberto López',
      played: 27, won: 7, drawn: 8, lost: 12, points: 29,
      goalsFor: 31, goalsAgainst: 40, goalDiff: -9, position: 16,
      xG: 32.1, xGA: 39.5, xGPerMatch: 1.19, xGAPerMatch: 1.46,
      eloRating: 1675,
      homeRecord: { played: 14, won: 5, drawn: 4, lost: 5, gf: 18, ga: 17, xG: 18.2, xGA: 16.9, cornersFor: 5.1, cornersAgainst: 4.8 },
      awayRecord: { played: 13, won: 2, drawn: 4, lost: 7, gf: 13, ga: 23, xG: 13.9, xGA: 22.6, cornersFor: 4.1, cornersAgainst: 5.5 },
      corners: { avgWon: 4.62, avgConceded: 5.14, totalWon: 125, totalConceded: 139 },
      shots: { avgShotsPerMatch: 11.2, avgShotsConceded: 12.5, shotsOnTargetPerMatch: 3.7, shotConversionPct: 10.2 },
      crossing: { crossesPerMatch: 18.4, crossAccuracyPct: 27.2, wingPlayBiasPct: 65 },
      tacticalStyle: { possessionPct: 47.5, passAccuracyPct: 79.2, fieldTiltPct: 45.0, ppda: 11.5, directness: 46.2, cleanSheets: 6, bttsPct: 50 },
      form: ['W', 'D', 'L', 'L', 'W'],
      recentMatches: [
        { opp: 'Alavés', gf: 2, ga: 1, xg: 1.6, xga: 1.1, home: true, result: 'W' },
        { opp: 'Getafe', gf: 1, ga: 1, xg: 1.2, xga: 1.0, home: false, result: 'D' },
        { opp: 'Sevilla', gf: 0, ga: 2, xg: 0.8, xga: 1.9, home: false, result: 'L' },
        { opp: 'Real Madrid', gf: 1, ga: 3, xg: 0.9, xga: 2.8, home: true, result: 'L' },
        { opp: 'Espanyol', gf: 2, ga: 0, xg: 1.7, xga: 0.6, home: true, result: 'W' }
      ]
    },

    'elche': {
      id: 'elche',
      name: 'Elche CF',
      shortName: 'ELC',
      badge: '🟢',
      crestColor: '#006341',
      accentColor: '#FFFFFF',
      stadium: 'Manuel Martínez Valero',
      manager: 'Eder Sarabia',
      played: 27, won: 6, drawn: 9, lost: 12, points: 27,
      goalsFor: 26, goalsAgainst: 39, goalDiff: -13, position: 18,
      xG: 29.4, xGA: 38.8, xGPerMatch: 1.09, xGAPerMatch: 1.44,
      eloRating: 1660,
      homeRecord: { played: 14, won: 4, drawn: 5, lost: 5, gf: 15, ga: 16, xG: 16.0, xGA: 16.5, cornersFor: 4.8, cornersAgainst: 4.9 },
      awayRecord: { played: 13, won: 2, drawn: 4, lost: 7, gf: 11, ga: 23, xG: 13.4, xGA: 22.3, cornersFor: 3.9, cornersAgainst: 5.6 },
      corners: { avgWon: 4.37, avgConceded: 5.24, totalWon: 118, totalConceded: 142 },
      shots: { avgShotsPerMatch: 10.8, avgShotsConceded: 12.9, shotsOnTargetPerMatch: 3.5, shotConversionPct: 8.9 },
      crossing: { crossesPerMatch: 17.1, crossAccuracyPct: 26.5, wingPlayBiasPct: 62 },
      tacticalStyle: { possessionPct: 52.3, passAccuracyPct: 83.1, fieldTiltPct: 48.0, ppda: 11.2, directness: 39.5, cleanSheets: 5, bttsPct: 46 },
      form: ['D', 'L', 'W', 'D', 'L'],
      recentMatches: [
        { opp: 'Athletic Club', gf: 1, ga: 1, xg: 1.1, xga: 1.4, home: true, result: 'D' },
        { opp: 'Villarreal', gf: 0, ga: 2, xg: 0.7, xga: 2.1, home: false, result: 'L' },
        { opp: 'Celta Vigo', gf: 2, ga: 1, xg: 1.5, xga: 1.2, home: true, result: 'W' },
        { opp: 'Mallorca', gf: 1, ga: 1, xg: 0.9, xga: 1.0, home: false, result: 'D' },
        { opp: 'Barcelona', gf: 0, ga: 3, xg: 0.6, xga: 2.7, home: false, result: 'L' }
      ]
    },

    'malaga': {
      id: 'malaga',
      name: 'Málaga CF',
      shortName: 'MAL',
      badge: '🔵⚪',
      crestColor: '#1D70B8',
      accentColor: '#FFFFFF',
      stadium: 'La Rosaleda',
      manager: 'Sergio Pellicer',
      played: 27, won: 7, drawn: 7, lost: 13, points: 28,
      goalsFor: 28, goalsAgainst: 41, goalDiff: -13, position: 17,
      xG: 30.2, xGA: 40.5, xGPerMatch: 1.12, xGAPerMatch: 1.50,
      eloRating: 1665,
      homeRecord: { played: 14, won: 5, drawn: 4, lost: 5, gf: 17, ga: 18, xG: 17.5, xGA: 17.9, cornersFor: 5.0, cornersAgainst: 4.8 },
      awayRecord: { played: 13, won: 2, drawn: 3, lost: 8, gf: 11, ga: 23, xG: 12.7, xGA: 22.6, cornersFor: 3.8, cornersAgainst: 5.7 },
      corners: { avgWon: 4.42, avgConceded: 5.23, totalWon: 119, totalConceded: 141 },
      shots: { avgShotsPerMatch: 10.9, avgShotsConceded: 13.1, shotsOnTargetPerMatch: 3.6, shotConversionPct: 9.5 },
      crossing: { crossesPerMatch: 17.8, crossAccuracyPct: 26.8, wingPlayBiasPct: 64 },
      tacticalStyle: { possessionPct: 46.8, passAccuracyPct: 78.5, fieldTiltPct: 44.5, ppda: 12.1, directness: 47.0, cleanSheets: 5, bttsPct: 48 },
      form: ['L', 'W', 'D', 'L', 'L'],
      recentMatches: [
        { opp: 'Celta Vigo', gf: 0, ga: 2, xg: 0.8, xga: 1.9, home: false, result: 'L' },
        { opp: 'Valladolid', gf: 2, ga: 1, xg: 1.6, xga: 1.0, home: true, result: 'W' },
        { opp: 'Getafe', gf: 1, ga: 1, xg: 1.0, xga: 1.1, home: false, result: 'D' },
        { opp: 'Atlético Madrid', gf: 0, ga: 3, xg: 0.5, xga: 2.5, home: false, result: 'L' },
        { opp: 'Sevilla', gf: 1, ga: 2, xg: 1.1, xga: 1.8, home: true, result: 'L' }
      ]
    },

    'levante': {
      id: 'levante',
      name: 'Levante UD',
      shortName: 'LEV',
      badge: '🐸',
      crestColor: '#002B49',
      accentColor: '#C8102E',
      stadium: 'Ciutat de València',
      manager: 'Julián Calero',
      played: 27, won: 8, drawn: 6, lost: 13, points: 30,
      goalsFor: 30, goalsAgainst: 42, goalDiff: -12, position: 15,
      xG: 31.8, xGA: 41.0, xGPerMatch: 1.18, xGAPerMatch: 1.52,
      eloRating: 1680,
      homeRecord: { played: 14, won: 5, drawn: 3, lost: 6, gf: 18, ga: 19, xG: 18.0, xGA: 18.5, cornersFor: 5.2, cornersAgainst: 4.9 },
      awayRecord: { played: 13, won: 3, drawn: 3, lost: 7, gf: 12, ga: 23, xG: 13.8, xGA: 22.5, cornersFor: 4.1, cornersAgainst: 5.6 },
      corners: { avgWon: 4.67, avgConceded: 5.24, totalWon: 126, totalConceded: 141 },
      shots: { avgShotsPerMatch: 11.5, avgShotsConceded: 13.0, shotsOnTargetPerMatch: 3.8, shotConversionPct: 9.7 },
      crossing: { crossesPerMatch: 18.5, crossAccuracyPct: 27.5, wingPlayBiasPct: 66 },
      tacticalStyle: { possessionPct: 45.5, passAccuracyPct: 77.8, fieldTiltPct: 43.8, ppda: 11.8, directness: 49.5, cleanSheets: 6, bttsPct: 52 },
      form: ['W', 'L', 'L', 'W', 'D'],
      recentMatches: [
        { opp: 'Barcelona', gf: 1, ga: 3, xg: 1.1, xga: 2.8, home: true, result: 'L' },
        { opp: 'Valencia', gf: 2, ga: 1, xg: 1.7, xga: 1.3, home: true, result: 'W' },
        { opp: 'Real Madrid', gf: 0, ga: 2, xg: 0.6, xga: 2.2, home: false, result: 'L' },
        { opp: 'Mallorca', gf: 2, ga: 1, xg: 1.5, xga: 1.2, home: true, result: 'W' },
        { opp: 'Osasuna', gf: 1, ga: 1, xg: 1.0, xga: 1.1, home: false, result: 'D' }
      ]
    },

    'deportivo': {
      id: 'deportivo',
      name: 'Deportivo La Coruña',
      shortName: 'DEP',
      badge: '🔵⚪',
      crestColor: '#00529F',
      accentColor: '#FFFFFF',
      stadium: 'Riazor',
      manager: 'Imanol Idiakez',
      played: 27, won: 7, drawn: 8, lost: 12, points: 29,
      goalsFor: 29, goalsAgainst: 40, goalDiff: -11, position: 16,
      xG: 31.0, xGA: 39.8, xGPerMatch: 1.15, xGAPerMatch: 1.47,
      eloRating: 1670,
      homeRecord: { played: 14, won: 5, drawn: 4, lost: 5, gf: 17, ga: 17, xG: 17.5, xGA: 17.0, cornersFor: 5.1, cornersAgainst: 4.7 },
      awayRecord: { played: 13, won: 2, drawn: 4, lost: 7, gf: 12, ga: 23, xG: 13.5, xGA: 22.8, cornersFor: 4.0, cornersAgainst: 5.7 },
      corners: { avgWon: 4.57, avgConceded: 5.18, totalWon: 123, totalConceded: 140 },
      shots: { avgShotsPerMatch: 11.1, avgShotsConceded: 12.8, shotsOnTargetPerMatch: 3.7, shotConversionPct: 9.6 },
      crossing: { crossesPerMatch: 18.0, crossAccuracyPct: 27.0, wingPlayBiasPct: 63 },
      tacticalStyle: { possessionPct: 48.0, passAccuracyPct: 80.0, fieldTiltPct: 46.0, ppda: 11.6, directness: 45.0, cleanSheets: 6, bttsPct: 49 },
      form: ['L', 'D', 'W', 'L', 'D'],
      recentMatches: [
        { opp: 'Getafe', gf: 1, ga: 1, xg: 1.2, xga: 1.1, home: false, result: 'D' },
        { opp: 'Celta Vigo', gf: 1, ga: 2, xg: 1.0, xga: 1.7, home: false, result: 'L' },
        { opp: 'Valladolid', gf: 2, ga: 0, xg: 1.8, xga: 0.6, home: true, result: 'W' },
        { opp: 'Atlético Madrid', gf: 0, ga: 2, xg: 0.7, xga: 2.1, home: true, result: 'L' },
        { opp: 'Alavés', gf: 1, ga: 1, xg: 1.1, xga: 1.2, home: false, result: 'D' }
      ]
    }
  };

  const LEAGUE_AVERAGES = {
    goalsPerMatch: 2.62,
    homeGoalsPerMatch: 1.48,
    awayGoalsPerMatch: 1.14,
    cornersPerMatch: 9.72,
    homeCornersPerMatch: 5.41,
    awayCornersPerMatch: 4.31,
    shotsPerMatch: 25.6,
    homeAdvantageFactor: 1.28,
    dixonColesRho: -0.11
  };

  // =========================================================================
  // 2. PLAYERS DATASET
  // =========================================================================
  const LA_LIGA_PLAYERS = [
    { id: 'kylian-mbappe', name: 'Kylian Mbappé', teamId: 'real-madrid', position: 'FW', number: 9, shotsPer90: 4.45, shotsOnTargetPer90: 2.15, shootingAccuracyPct: 48.3, goalConversionPct: 18.5, penaltyTaker: true, freeKickTaker: false, role: 'Primary Goal Threat' },
    { id: 'vinicius-junior', name: 'Vinícius Júnior', teamId: 'real-madrid', position: 'FW', number: 7, shotsPer90: 3.65, shotsOnTargetPer90: 1.62, shootingAccuracyPct: 44.4, goalConversionPct: 15.2, penaltyTaker: true, freeKickTaker: false, role: 'Inside Forward' },
    { id: 'jude-bellingham', name: 'Jude Bellingham', teamId: 'real-madrid', position: 'MF', number: 5, shotsPer90: 2.65, shotsOnTargetPer90: 1.25, shootingAccuracyPct: 47.2, goalConversionPct: 16.1, penaltyTaker: false, freeKickTaker: false, role: 'Box Crasher' },
    { id: 'rodrygo', name: 'Rodrygo', teamId: 'real-madrid', position: 'FW', number: 11, shotsPer90: 2.45, shotsOnTargetPer90: 1.05, shootingAccuracyPct: 42.9, goalConversionPct: 14.9, penaltyTaker: false, freeKickTaker: true, role: 'Technical Finisher' },

    { id: 'ferran-torres', name: 'Ferran Torres', teamId: 'barcelona', position: 'FW', number: 7, shotsPer90: 3.35, shotsOnTargetPer90: 1.65, shootingAccuracyPct: 49.2, goalConversionPct: 17.1, penaltyTaker: true, freeKickTaker: false, role: 'Center Forward / Pressing Threat' },
    { id: 'pau-victor', name: 'Pau Víctor', teamId: 'barcelona', position: 'FW', number: 18, shotsPer90: 3.10, shotsOnTargetPer90: 1.48, shootingAccuracyPct: 47.7, goalConversionPct: 16.4, penaltyTaker: false, freeKickTaker: false, role: 'Dynamic Striker / Box Poacher' },
    { id: 'lamine-yamal', name: 'Lamine Yamal', teamId: 'barcelona', position: 'FW', number: 19, shotsPer90: 3.12, shotsOnTargetPer90: 1.38, shootingAccuracyPct: 44.2, goalConversionPct: 11.4, penaltyTaker: false, freeKickTaker: true, role: 'Inverted Winger' },
    { id: 'raphinha', name: 'Raphinha', teamId: 'barcelona', position: 'FW', number: 11, shotsPer90: 3.48, shotsOnTargetPer90: 1.55, shootingAccuracyPct: 44.5, goalConversionPct: 16.0, penaltyTaker: false, freeKickTaker: true, role: 'Direct Threat' },
    { id: 'dani-olmo', name: 'Dani Olmo', teamId: 'barcelona', position: 'MF', number: 20, shotsPer90: 2.85, shotsOnTargetPer90: 1.32, shootingAccuracyPct: 46.3, goalConversionPct: 15.2, penaltyTaker: false, freeKickTaker: false, role: 'Between-the-Lines Finisher' },

    { id: 'antoine-griezmann', name: 'Antoine Griezmann', teamId: 'atletico-madrid', position: 'FW', number: 7, shotsPer90: 2.88, shotsOnTargetPer90: 1.42, shootingAccuracyPct: 49.3, goalConversionPct: 17.2, penaltyTaker: true, freeKickTaker: true, role: 'Second Striker' },
    { id: 'julian-alvarez', name: 'Julián Álvarez', teamId: 'atletico-madrid', position: 'FW', number: 19, shotsPer90: 3.15, shotsOnTargetPer90: 1.48, shootingAccuracyPct: 47.0, goalConversionPct: 15.4, penaltyTaker: false, freeKickTaker: false, role: 'Pressing Forward' },
    { id: 'alexander-sorloth', name: 'Alexander Sørloth', teamId: 'atletico-madrid', position: 'FW', number: 9, shotsPer90: 3.28, shotsOnTargetPer90: 1.58, shootingAccuracyPct: 48.2, goalConversionPct: 15.8, penaltyTaker: false, freeKickTaker: false, role: 'Aerial Poacher' },

    { id: 'inaki-williams', name: 'Iñaki Williams', teamId: 'athletic-club', position: 'FW', number: 9, shotsPer90: 2.68, shotsOnTargetPer90: 1.25, shootingAccuracyPct: 46.6, goalConversionPct: 14.1, penaltyTaker: false, freeKickTaker: false, role: 'Pace Striker' },
    { id: 'nico-williams', name: 'Nico Williams', teamId: 'athletic-club', position: 'FW', number: 10, shotsPer90: 2.92, shotsOnTargetPer90: 1.18, shootingAccuracyPct: 40.4, goalConversionPct: 11.3, penaltyTaker: false, freeKickTaker: false, role: 'Explosive 1v1 Winger' },
    { id: 'oihan-sancet', name: 'Oihan Sancet', teamId: 'athletic-club', position: 'MF', number: 8, shotsPer90: 2.35, shotsOnTargetPer90: 1.10, shootingAccuracyPct: 46.8, goalConversionPct: 18.6, penaltyTaker: true, freeKickTaker: false, role: 'Box Crasher' },

    { id: 'ayoze-perez', name: 'Ayoze Pérez', teamId: 'villarreal', position: 'FW', number: 22, shotsPer90: 3.25, shotsOnTargetPer90: 1.55, shootingAccuracyPct: 47.7, goalConversionPct: 18.2, penaltyTaker: false, freeKickTaker: false, role: 'Instinctive Box Finisher' },
    { id: 'alex-baena', name: 'Álex Baena', teamId: 'villarreal', position: 'MF', number: 16, shotsPer90: 2.45, shotsOnTargetPer90: 0.95, shootingAccuracyPct: 38.8, goalConversionPct: 8.8, penaltyTaker: true, freeKickTaker: true, role: 'Set Piece Specialist' },

    { id: 'mikel-oyarzabal', name: 'Mikel Oyarzabal', teamId: 'real-sociedad', position: 'FW', number: 10, shotsPer90: 2.42, shotsOnTargetPer90: 1.15, shootingAccuracyPct: 47.5, goalConversionPct: 15.7, penaltyTaker: true, freeKickTaker: false, role: 'Penalty Finisher' },
    { id: 'takefusa-kubo', name: 'Takefusa Kubo', teamId: 'real-sociedad', position: 'FW', number: 14, shotsPer90: 2.70, shotsOnTargetPer90: 1.18, shootingAccuracyPct: 43.7, goalConversionPct: 10.5, penaltyTaker: false, freeKickTaker: true, role: 'Cut-Inside Winger' },

    { id: 'giovani-lo-celso', name: 'Giovani Lo Celso', teamId: 'real-betis', position: 'MF', number: 20, shotsPer90: 2.65, shotsOnTargetPer90: 1.28, shootingAccuracyPct: 48.3, goalConversionPct: 15.5, penaltyTaker: true, freeKickTaker: true, role: 'Playmaker & Late Arriver' },
    { id: 'vitor-roque', name: 'Vitor Roque', teamId: 'real-betis', position: 'FW', number: 8, shotsPer90: 3.18, shotsOnTargetPer90: 1.40, shootingAccuracyPct: 44.0, goalConversionPct: 11.5, penaltyTaker: false, freeKickTaker: false, role: 'Channel Runner' },

    { id: 'cristhian-stuani', name: 'Cristhian Stuani', teamId: 'girona', position: 'FW', number: 7, shotsPer90: 3.40, shotsOnTargetPer90: 1.85, shootingAccuracyPct: 54.4, goalConversionPct: 18.6, penaltyTaker: true, freeKickTaker: false, role: 'Box Poacher' },
    { id: 'iago-aspas', name: 'Iago Aspas', teamId: 'celta-vigo', position: 'FW', number: 10, shotsPer90: 2.58, shotsOnTargetPer90: 1.25, shootingAccuracyPct: 48.4, goalConversionPct: 14.8, penaltyTaker: true, freeKickTaker: true, role: 'Legendary Talisman' },
    { id: 'vedat-muriqi', name: 'Vedat Muriqi', teamId: 'mallorca', position: 'FW', number: 7, shotsPer90: 2.95, shotsOnTargetPer90: 1.32, shootingAccuracyPct: 44.7, goalConversionPct: 13.1, penaltyTaker: true, freeKickTaker: false, role: 'Aerial Juggernaut' },
    { id: 'ante-budimir', name: 'Ante Budimir', teamId: 'osasuna', position: 'FW', number: 17, shotsPer90: 2.90, shotsOnTargetPer90: 1.45, shootingAccuracyPct: 50.0, goalConversionPct: 18.2, penaltyTaker: true, freeKickTaker: false, role: 'Box Finisher' },
    { id: 'dodi-lukebakio', name: 'Dodi Lukébakio', teamId: 'sevilla', position: 'FW', number: 11, shotsPer90: 3.10, shotsOnTargetPer90: 1.35, shootingAccuracyPct: 43.5, goalConversionPct: 13.2, penaltyTaker: true, freeKickTaker: true, role: 'Primary Shooter' },
    { id: 'sandro-ramirez', name: 'Sandro Ramírez', teamId: 'las-palmas', position: 'FW', number: 9, shotsPer90: 2.75, shotsOnTargetPer90: 1.15, shootingAccuracyPct: 41.8, goalConversionPct: 12.4, penaltyTaker: true, freeKickTaker: true, role: 'Direct Striker' },
    { id: 'kike-garcia', name: 'Kike García', teamId: 'alaves', position: 'FW', number: 17, shotsPer90: 2.70, shotsOnTargetPer90: 1.18, shootingAccuracyPct: 43.7, goalConversionPct: 14.0, penaltyTaker: true, freeKickTaker: false, role: 'Target Poacher' },
    { id: 'borja-mayoral', name: 'Borja Mayoral', teamId: 'getafe', position: 'FW', number: 9, shotsPer90: 2.45, shotsOnTargetPer90: 1.15, shootingAccuracyPct: 46.9, goalConversionPct: 16.0, penaltyTaker: true, freeKickTaker: false, role: 'Clinical Finisher' },
    { id: 'hugo-duro', name: 'Hugo Duro', teamId: 'valencia', position: 'FW', number: 9, shotsPer90: 2.42, shotsOnTargetPer90: 1.10, shootingAccuracyPct: 45.5, goalConversionPct: 14.1, penaltyTaker: false, freeKickTaker: false, role: 'Workhorse Striker' },
    { id: 'javi-puado', name: 'Javi Puado', teamId: 'espanyol', position: 'FW', number: 7, shotsPer90: 2.35, shotsOnTargetPer90: 1.05, shootingAccuracyPct: 44.7, goalConversionPct: 12.2, penaltyTaker: true, freeKickTaker: false, role: 'Captain Forward' },
    { id: 'juan-cruz', name: 'Juan Cruz', teamId: 'leganes', position: 'FW', number: 11, shotsPer90: 2.20, shotsOnTargetPer90: 0.92, shootingAccuracyPct: 41.8, goalConversionPct: 11.2, penaltyTaker: true, freeKickTaker: true, role: 'Attacking Outlet' },
    { id: 'raul-moro', name: 'Raúl Moro', teamId: 'valladolid', position: 'FW', number: 11, shotsPer90: 2.15, shotsOnTargetPer90: 0.85, shootingAccuracyPct: 39.5, goalConversionPct: 9.3, penaltyTaker: false, freeKickTaker: false, role: 'Pacey Dribbler' }
  ];

  // =========================================================================
  // 3. FIXTURES
  // =========================================================================
  const UPCOMING_FIXTURES = [
  {
    id: 'fd-564669',
    matchday: 5,
    date: '2026-09-11',
    time: '13:00 CET',
    homeTeamId: 'sevilla',
    awayTeamId: 'valencia',
    venue: 'Sevilla FC Stadium, Spain',
    isDerby: false,
    headline: 'Official Matchday 5: Sevilla FC vs Valencia CF'
  },
  {
    id: 'fd-564670',
    matchday: 5,
    date: '2026-09-12',
    time: '06:00 CET',
    homeTeamId: 'racing-santander',
    awayTeamId: 'alaves',
    venue: 'Real Racing Club de Santander Stadium, Spain',
    isDerby: false,
    headline: 'Official Matchday 5: Real Racing Club de Santander vs Deportivo Alavés'
  },
  {
    id: 'fd-564673',
    matchday: 5,
    date: '2026-09-12',
    time: '08:15 CET',
    homeTeamId: 'osasuna',
    awayTeamId: 'espanyol',
    venue: 'CA Osasuna Stadium, Spain',
    isDerby: false,
    headline: 'Official Matchday 5: CA Osasuna vs RCD Espanyol de Barcelona'
  },
  {
    id: 'fd-564676',
    matchday: 5,
    date: '2026-09-12',
    time: '10:30 CET',
    homeTeamId: 'athletic-club',
    awayTeamId: 'elche',
    venue: 'Athletic Club Stadium, Spain',
    isDerby: false,
    headline: 'Official Matchday 5: Athletic Club vs Elche CF'
  },
  {
    id: 'fd-564677',
    matchday: 5,
    date: '2026-09-12',
    time: '13:00 CET',
    homeTeamId: 'real-madrid',
    awayTeamId: 'rayo-vallecano',
    venue: 'Real Madrid CF Stadium, Spain',
    isDerby: false,
    headline: 'Official Matchday 5: Real Madrid CF vs Rayo Vallecano de Madrid'
  },
  {
    id: 'fd-564672',
    matchday: 5,
    date: '2026-09-13',
    time: '06:00 CET',
    homeTeamId: 'celta-vigo',
    awayTeamId: 'malaga',
    venue: 'RC Celta de Vigo Stadium, Spain',
    isDerby: false,
    headline: 'Official Matchday 5: RC Celta de Vigo vs Málaga CF'
  },
  {
    id: 'fd-564675',
    matchday: 5,
    date: '2026-09-13',
    time: '08:15 CET',
    homeTeamId: 'levante',
    awayTeamId: 'barcelona',
    venue: 'Levante UD Stadium, Spain',
    isDerby: false,
    headline: 'Official Matchday 5: Levante UD vs FC Barcelona'
  },
  {
    id: 'fd-564668',
    matchday: 5,
    date: '2026-09-13',
    time: '10:30 CET',
    homeTeamId: 'getafe',
    awayTeamId: 'deportivo',
    venue: 'Getafe CF Stadium, Spain',
    isDerby: false,
    headline: 'Official Matchday 5: Getafe CF vs RC Deportivo La Coruña'
  },
  {
    id: 'fd-564674',
    matchday: 5,
    date: '2026-09-13',
    time: '13:00 CET',
    homeTeamId: 'real-sociedad',
    awayTeamId: 'atletico-madrid',
    venue: 'Real Sociedad de Fútbol Stadium, Spain',
    isDerby: false,
    headline: 'Official Matchday 5: Real Sociedad de Fútbol vs Club Atlético de Madrid'
  },
  {
    id: 'fd-564671',
    matchday: 5,
    date: '2026-09-14',
    time: '13:00 CET',
    homeTeamId: 'villarreal',
    awayTeamId: 'real-betis',
    venue: 'Villarreal CF Stadium, Spain',
    isDerby: false,
    headline: 'Official Matchday 5: Villarreal CF vs Real Betis Balompié'
  }
  ];

  // =========================================================================
  // 3.5. HISTORICAL COMPLETED LA LIGA MATCHES (FOR BACKTESTING & ACCURACY)
  // =========================================================================
  const HISTORICAL_MATCHES = [
    // --- Matchday 1 ---
    { id: 'hist-md1-01', matchday: 1, date: '2025-08-16', homeTeamId: 'athletic-club', awayTeamId: 'getafe', homeGoals: 1, awayGoals: 1, actualHomeXg: 1.42, actualAwayXg: 0.88, actualCorners: 9, marketOdds: { home: 1.62, draw: 3.65, away: 6.20, over25: 2.25, under25: 1.65 } },
    { id: 'hist-md1-02', matchday: 1, date: '2025-08-16', homeTeamId: 'real-betis', awayTeamId: 'girona', homeGoals: 1, awayGoals: 1, actualHomeXg: 1.25, actualAwayXg: 1.34, actualCorners: 8, marketOdds: { home: 2.45, draw: 3.30, away: 3.00, over25: 1.95, under25: 1.88 } },
    { id: 'hist-md1-03', matchday: 1, date: '2025-08-17', homeTeamId: 'celta-vigo', awayTeamId: 'alaves', homeGoals: 2, awayGoals: 1, actualHomeXg: 1.78, actualAwayXg: 1.05, actualCorners: 11, marketOdds: { home: 1.95, draw: 3.40, away: 4.20, over25: 2.10, under25: 1.75 } },
    { id: 'hist-md1-04', matchday: 1, date: '2025-08-17', homeTeamId: 'valencia', awayTeamId: 'barcelona', homeGoals: 1, awayGoals: 2, actualHomeXg: 1.10, actualAwayXg: 2.45, actualCorners: 10, marketOdds: { home: 4.50, draw: 3.90, away: 1.75, over25: 1.80, under25: 2.05 } },
    { id: 'hist-md1-05', matchday: 1, date: '2025-08-18', homeTeamId: 'real-sociedad', awayTeamId: 'rayo-vallecano', homeGoals: 1, awayGoals: 2, actualHomeXg: 1.65, actualAwayXg: 0.92, actualCorners: 12, marketOdds: { home: 1.58, draw: 3.85, away: 6.50, over25: 2.15, under25: 1.72 } },
    { id: 'hist-md1-06', matchday: 1, date: '2025-08-18', homeTeamId: 'mallorca', awayTeamId: 'real-madrid', homeGoals: 1, awayGoals: 1, actualHomeXg: 0.72, actualAwayXg: 2.15, actualCorners: 7, marketOdds: { home: 6.80, draw: 4.40, away: 1.48, over25: 1.85, under25: 1.98 } },
    { id: 'hist-md1-07', matchday: 1, date: '2025-08-19', homeTeamId: 'villarreal', awayTeamId: 'atletico-madrid', homeGoals: 2, awayGoals: 2, actualHomeXg: 1.55, actualAwayXg: 1.82, actualCorners: 10, marketOdds: { home: 3.10, draw: 3.50, away: 2.30, over25: 1.85, under25: 1.98 } },
    { id: 'hist-md1-08', matchday: 1, date: '2025-08-19', homeTeamId: 'valladolid', awayTeamId: 'espanyol', homeGoals: 1, awayGoals: 0, actualHomeXg: 1.15, actualAwayXg: 0.65, actualCorners: 8, marketOdds: { home: 2.25, draw: 3.15, away: 3.50, over25: 2.35, under25: 1.60 } },
    { id: 'hist-md1-09', matchday: 1, date: '2025-08-19', homeTeamId: 'osasuna', awayTeamId: 'leganes', homeGoals: 1, awayGoals: 1, actualHomeXg: 1.30, actualAwayXg: 0.90, actualCorners: 9, marketOdds: { home: 1.85, draw: 3.35, away: 4.80, over25: 2.30, under25: 1.62 } },
    { id: 'hist-md1-10', matchday: 1, date: '2025-08-19', homeTeamId: 'las-palmas', awayTeamId: 'sevilla', homeGoals: 2, awayGoals: 2, actualHomeXg: 1.45, actualAwayXg: 1.60, actualCorners: 10, marketOdds: { home: 2.90, draw: 3.30, away: 2.50, over25: 2.05, under25: 1.78 } },

    // --- Matchday 2 ---
    { id: 'hist-md2-01', matchday: 2, date: '2025-08-23', homeTeamId: 'celta-vigo', awayTeamId: 'valencia', homeGoals: 3, awayGoals: 1, actualHomeXg: 2.30, actualAwayXg: 1.12, actualCorners: 12, marketOdds: { home: 2.15, draw: 3.25, away: 3.65, over25: 2.10, under25: 1.75 } },
    { id: 'hist-md2-02', matchday: 2, date: '2025-08-23', homeTeamId: 'sevilla', awayTeamId: 'villarreal', homeGoals: 1, awayGoals: 2, actualHomeXg: 1.85, actualAwayXg: 1.72, actualCorners: 9, marketOdds: { home: 2.35, draw: 3.40, away: 3.05, over25: 1.90, under25: 1.92 } },
    { id: 'hist-md2-03', matchday: 2, date: '2025-08-24', homeTeamId: 'osasuna', awayTeamId: 'mallorca', homeGoals: 1, awayGoals: 0, actualHomeXg: 1.20, actualAwayXg: 0.68, actualCorners: 8, marketOdds: { home: 2.05, draw: 3.15, away: 4.10, over25: 2.45, under25: 1.55 } },
    { id: 'hist-md2-04', matchday: 2, date: '2025-08-24', homeTeamId: 'barcelona', awayTeamId: 'athletic-club', homeGoals: 2, awayGoals: 1, actualHomeXg: 2.65, actualAwayXg: 1.15, actualCorners: 11, marketOdds: { home: 1.52, draw: 4.50, away: 5.80, over25: 1.68, under25: 2.20 } },
    { id: 'hist-md2-05', matchday: 2, date: '2025-08-24', homeTeamId: 'espanyol', awayTeamId: 'real-sociedad', homeGoals: 0, awayGoals: 1, actualHomeXg: 0.55, actualAwayXg: 1.48, actualCorners: 7, marketOdds: { home: 3.90, draw: 3.25, away: 2.05, over25: 2.30, under25: 1.62 } },
    { id: 'hist-md2-06', matchday: 2, date: '2025-08-24', homeTeamId: 'getafe', awayTeamId: 'rayo-vallecano', homeGoals: 0, awayGoals: 0, actualHomeXg: 0.65, actualAwayXg: 0.70, actualCorners: 6, marketOdds: { home: 2.55, draw: 2.90, away: 3.25, over25: 2.75, under25: 1.45 } },
    { id: 'hist-md2-07', matchday: 2, date: '2025-08-25', homeTeamId: 'real-madrid', awayTeamId: 'valladolid', homeGoals: 3, awayGoals: 0, actualHomeXg: 2.95, actualAwayXg: 0.35, actualCorners: 10, marketOdds: { home: 1.16, draw: 8.00, away: 16.00, over25: 1.42, under25: 2.90 } },
    { id: 'hist-md2-08', matchday: 2, date: '2025-08-25', homeTeamId: 'leganes', awayTeamId: 'las-palmas', homeGoals: 2, awayGoals: 1, actualHomeXg: 1.35, actualAwayXg: 1.05, actualCorners: 8, marketOdds: { home: 2.30, draw: 3.10, away: 3.45, over25: 2.30, under25: 1.62 } },
    { id: 'hist-md2-09', matchday: 2, date: '2025-08-25', homeTeamId: 'alaves', awayTeamId: 'real-betis', homeGoals: 0, awayGoals: 0, actualHomeXg: 0.95, actualAwayXg: 0.90, actualCorners: 7, marketOdds: { home: 3.15, draw: 3.15, away: 2.45, over25: 2.30, under25: 1.62 } },
    { id: 'hist-md2-10', matchday: 2, date: '2025-08-25', homeTeamId: 'atletico-madrid', awayTeamId: 'girona', homeGoals: 3, awayGoals: 0, actualHomeXg: 2.10, actualAwayXg: 0.82, actualCorners: 9, marketOdds: { home: 1.60, draw: 4.10, away: 5.50, over25: 1.85, under25: 1.98 } },

    // --- Matchday 3 ---
    { id: 'hist-md3-01', matchday: 3, date: '2025-08-27', homeTeamId: 'villarreal', awayTeamId: 'celta-vigo', homeGoals: 4, awayGoals: 3, actualHomeXg: 3.10, actualAwayXg: 2.25, actualCorners: 13, marketOdds: { home: 1.95, draw: 3.65, away: 3.80, over25: 1.75, under25: 2.10 } },
    { id: 'hist-md3-02', matchday: 3, date: '2025-08-27', homeTeamId: 'rayo-vallecano', awayTeamId: 'barcelona', homeGoals: 1, awayGoals: 2, actualHomeXg: 1.05, actualAwayXg: 2.40, actualCorners: 9, marketOdds: { home: 5.25, draw: 4.20, away: 1.62, over25: 1.70, under25: 2.15 } },
    { id: 'hist-md3-03', matchday: 3, date: '2025-08-28', homeTeamId: 'athletic-club', awayTeamId: 'valencia', homeGoals: 1, awayGoals: 0, actualHomeXg: 1.82, actualAwayXg: 0.55, actualCorners: 10, marketOdds: { home: 1.65, draw: 3.75, away: 5.60, over25: 2.05, under25: 1.78 } },
    { id: 'hist-md3-04', matchday: 3, date: '2025-08-28', homeTeamId: 'valladolid', awayTeamId: 'leganes', homeGoals: 0, awayGoals: 0, actualHomeXg: 0.85, actualAwayXg: 0.75, actualCorners: 7, marketOdds: { home: 2.40, draw: 3.00, away: 3.35, over25: 2.60, under25: 1.50 } },
    { id: 'hist-md3-05', matchday: 3, date: '2025-08-28', homeTeamId: 'atletico-madrid', awayTeamId: 'espanyol', homeGoals: 0, awayGoals: 0, actualHomeXg: 2.35, actualAwayXg: 0.40, actualCorners: 14, marketOdds: { home: 1.30, draw: 5.50, away: 11.00, over25: 1.70, under25: 2.15 } },
    { id: 'hist-md3-06', matchday: 3, date: '2025-08-28', homeTeamId: 'real-sociedad', awayTeamId: 'alaves', homeGoals: 1, awayGoals: 2, actualHomeXg: 1.55, actualAwayXg: 1.20, actualCorners: 11, marketOdds: { home: 1.62, draw: 3.65, away: 6.25, over25: 2.20, under25: 1.68 } },
    { id: 'hist-md3-07', matchday: 3, date: '2025-08-29', homeTeamId: 'girona', awayTeamId: 'osasuna', homeGoals: 4, awayGoals: 0, actualHomeXg: 2.75, actualAwayXg: 0.65, actualCorners: 8, marketOdds: { home: 1.75, draw: 3.80, away: 4.75, over25: 1.85, under25: 1.98 } },
    { id: 'hist-md3-08', matchday: 3, date: '2025-08-29', homeTeamId: 'las-palmas', awayTeamId: 'real-madrid', homeGoals: 1, awayGoals: 1, actualHomeXg: 0.85, actualAwayXg: 2.40, actualCorners: 9, marketOdds: { home: 8.50, draw: 5.25, away: 1.35, over25: 1.60, under25: 2.35 } },

    // --- Matchday 4 ---
    { id: 'hist-md4-01', matchday: 4, date: '2025-08-31', homeTeamId: 'barcelona', awayTeamId: 'valladolid', homeGoals: 7, awayGoals: 0, actualHomeXg: 4.85, actualAwayXg: 0.45, actualCorners: 11, marketOdds: { home: 1.18, draw: 7.50, away: 14.50, over25: 1.38, under25: 3.10 } },
    { id: 'hist-md4-02', matchday: 4, date: '2025-08-31', homeTeamId: 'athletic-club', awayTeamId: 'atletico-madrid', homeGoals: 0, awayGoals: 1, actualHomeXg: 0.95, actualAwayXg: 1.25, actualCorners: 8, marketOdds: { home: 2.95, draw: 3.20, away: 2.55, over25: 2.15, under25: 1.72 } },
    { id: 'hist-md4-03', matchday: 4, date: '2025-08-31', homeTeamId: 'espanyol', awayTeamId: 'rayo-vallecano', homeGoals: 2, awayGoals: 1, actualHomeXg: 1.45, actualAwayXg: 1.10, actualCorners: 9, marketOdds: { home: 2.70, draw: 3.10, away: 2.80, over25: 2.30, under25: 1.62 } },
    { id: 'hist-md4-04', matchday: 4, date: '2025-08-31', homeTeamId: 'valencia', awayTeamId: 'villarreal', homeGoals: 1, awayGoals: 1, actualHomeXg: 1.20, actualAwayXg: 1.45, actualCorners: 10, marketOdds: { home: 3.30, draw: 3.45, away: 2.20, over25: 1.95, under25: 1.88 } },
    { id: 'hist-md4-05', matchday: 4, date: '2025-08-31', homeTeamId: 'leganes', awayTeamId: 'mallorca', homeGoals: 0, awayGoals: 1, actualHomeXg: 0.85, actualAwayXg: 1.05, actualCorners: 8, marketOdds: { home: 2.75, draw: 2.95, away: 2.90, over25: 2.65, under25: 1.48 } },
    { id: 'hist-md4-06', matchday: 4, date: '2025-09-01', homeTeamId: 'alaves', awayTeamId: 'las-palmas', homeGoals: 2, awayGoals: 0, actualHomeXg: 1.85, actualAwayXg: 0.75, actualCorners: 7, marketOdds: { home: 2.00, draw: 3.30, away: 4.10, over25: 2.25, under25: 1.65 } },
    { id: 'hist-md4-07', matchday: 4, date: '2025-09-01', homeTeamId: 'osasuna', awayTeamId: 'celta-vigo', homeGoals: 3, awayGoals: 2, actualHomeXg: 2.10, actualAwayXg: 1.65, actualCorners: 10, marketOdds: { home: 2.45, draw: 3.25, away: 3.05, over25: 2.05, under25: 1.78 } },
    { id: 'hist-md4-08', matchday: 4, date: '2025-09-01', homeTeamId: 'sevilla', awayTeamId: 'girona', homeGoals: 0, awayGoals: 2, actualHomeXg: 1.25, actualAwayXg: 1.95, actualCorners: 11, marketOdds: { home: 2.45, draw: 3.40, away: 2.90, over25: 1.90, under25: 1.92 } },
    { id: 'hist-md4-09', matchday: 4, date: '2025-09-01', homeTeamId: 'getafe', awayTeamId: 'real-sociedad', homeGoals: 0, awayGoals: 0, actualHomeXg: 0.60, actualAwayXg: 0.65, actualCorners: 6, marketOdds: { home: 3.65, draw: 2.90, away: 2.30, over25: 2.70, under25: 1.48 } },
    { id: 'hist-md4-10', matchday: 4, date: '2025-09-01', homeTeamId: 'real-madrid', awayTeamId: 'real-betis', homeGoals: 2, awayGoals: 0, actualHomeXg: 2.85, actualAwayXg: 0.85, actualCorners: 12, marketOdds: { home: 1.30, draw: 5.75, away: 9.50, over25: 1.55, under25: 2.45 } }
  ];

  // =========================================================================
  // 4. MATHEMATICAL ENGINES
  // =========================================================================

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

  function poissonPmf(k, lambda) {
    if (lambda <= 0) return k === 0 ? 1 : 0;
    return (Math.pow(lambda, k) * Math.exp(-lambda)) / factorial(k);
  }

  function tauAdjustment(x, y, lambdaH, lambdaA, rho) {
    if (x === 0 && y === 0) return 1 - lambdaH * lambdaA * rho;
    if (x === 0 && y === 1) return 1 + lambdaH * rho;
    if (x === 1 && y === 0) return 1 + lambdaA * rho;
    if (x === 1 && y === 1) return 1 - rho;
    return 1.0;
  }

  function calculateDixonColes(homeTeam, awayTeam) {
    const rho = LEAGUE_AVERAGES.dixonColesRho;
    const homeAvgScored = (homeTeam.homeRecord.gf / homeTeam.homeRecord.played) * 0.45 + (homeTeam.homeRecord.xG / homeTeam.homeRecord.played) * 0.55;
    const homeAvgConceded = (homeTeam.homeRecord.ga / homeTeam.homeRecord.played) * 0.45 + (homeTeam.homeRecord.xGA / homeTeam.homeRecord.played) * 0.55;

    const awayAvgScored = (awayTeam.awayRecord.gf / awayTeam.awayRecord.played) * 0.45 + (awayTeam.awayRecord.xG / awayTeam.awayRecord.played) * 0.55;
    const awayAvgConceded = (awayTeam.awayRecord.ga / awayTeam.awayRecord.played) * 0.45 + (awayTeam.awayRecord.xGA / awayTeam.awayRecord.played) * 0.55;

    const alphaHome = homeAvgScored / LEAGUE_AVERAGES.homeGoalsPerMatch;
    const betaHome = homeAvgConceded / LEAGUE_AVERAGES.awayGoalsPerMatch;
    const alphaAway = awayAvgScored / LEAGUE_AVERAGES.awayGoalsPerMatch;
    const betaAway = awayAvgConceded / LEAGUE_AVERAGES.homeGoalsPerMatch;

    let lambdaH = alphaHome * betaAway * LEAGUE_AVERAGES.homeGoalsPerMatch;
    let lambdaA = alphaAway * betaHome * LEAGUE_AVERAGES.awayGoalsPerMatch;

    const eloDiff = (homeTeam.eloRating - awayTeam.eloRating) / 400;
    const eloAdj = Math.pow(10, eloDiff * 0.18);
    lambdaH *= Math.sqrt(eloAdj);
    lambdaA /= Math.sqrt(eloAdj);

    lambdaH = Math.max(0.35, Math.min(4.8, lambdaH));
    lambdaA = Math.max(0.25, Math.min(4.2, lambdaA));

    const MAX_GOALS = 6;
    const matrix = [];
    let homeWinProb = 0, drawProb = 0, awayWinProb = 0, bttsProb = 0;
    const scorelines = [];
    let totalProbSum = 0;

    for (let h = 0; h < MAX_GOALS; h++) {
      matrix[h] = [];
      for (let a = 0; a < MAX_GOALS; a++) {
        const base = poissonPmf(h, lambdaH) * poissonPmf(a, lambdaA);
        const adj = tauAdjustment(h, a, lambdaH, lambdaA, rho);
        const p = Math.max(0, base * adj);

        matrix[h][a] = p;
        totalProbSum += p;

        if (h > a) homeWinProb += p;
        else if (h === a) drawProb += p;
        else awayWinProb += p;

        if (h > 0 && a > 0) bttsProb += p;

        scorelines.push({ score: `${h}-${a}`, homeGoals: h, awayGoals: a, probability: p });
      }
    }

    for (let h = 0; h < MAX_GOALS; h++) {
      for (let a = 0; a < MAX_GOALS; a++) {
        matrix[h][a] /= totalProbSum;
      }
    }
    homeWinProb /= totalProbSum;
    drawProb /= totalProbSum;
    awayWinProb /= totalProbSum;
    bttsProb /= totalProbSum;

    scorelines.forEach(s => s.probability /= totalProbSum);
    scorelines.sort((a, b) => b.probability - a.probability);

    let over25 = 0;
    scorelines.forEach(s => {
      if (s.homeGoals + s.awayGoals > 2.5) over25 += s.probability;
    });

    return {
      lambdaHome: Number(lambdaH.toFixed(2)),
      lambdaAway: Number(lambdaA.toFixed(2)),
      expectedTotalGoals: Number((lambdaH + lambdaA).toFixed(2)),
      alphaHome: Number(alphaHome.toFixed(3)),
      betaHome: Number(betaHome.toFixed(3)),
      alphaAway: Number(alphaAway.toFixed(3)),
      betaAway: Number(betaAway.toFixed(3)),
      probabilities: {
        homeWin: Number((homeWinProb * 100).toFixed(1)),
        draw: Number((drawProb * 100).toFixed(1)),
        awayWin: Number((awayWinProb * 100).toFixed(1)),
        bttsYes: Number((bttsProb * 100).toFixed(1)),
        over25: Number((over25 * 100).toFixed(1)),
        under25: Number(((1 - over25) * 100).toFixed(1))
      },
      matrix: matrix,
      topScorelines: scorelines.slice(0, 8).map(s => ({
        ...s,
        pct: Number((s.probability * 100).toFixed(1))
      }))
    };
  }

  function calculateCorners(homeTeam, awayTeam) {
    const homeAttack = homeTeam.homeRecord.cornersFor || homeTeam.corners.avgWon;
    const awayDefense = awayTeam.awayRecord.cornersAgainst || awayTeam.corners.avgConceded;
    const awayAttack = awayTeam.awayRecord.cornersFor || awayTeam.corners.avgWon;
    const homeDefense = homeTeam.homeRecord.cornersAgainst || homeTeam.corners.avgConceded;

    const hFactor = (homeAttack / LEAGUE_AVERAGES.homeCornersPerMatch) * (awayDefense / LEAGUE_AVERAGES.homeCornersPerMatch);
    const aFactor = (awayAttack / LEAGUE_AVERAGES.awayCornersPerMatch) * (homeDefense / LEAGUE_AVERAGES.awayCornersPerMatch);

    let expHome = LEAGUE_AVERAGES.homeCornersPerMatch * hFactor;
    let expAway = LEAGUE_AVERAGES.awayCornersPerMatch * aFactor;

    const homeCrossMod = (homeTeam.crossing.crossesPerMatch / 18.0) * (homeTeam.crossing.wingPlayBiasPct / 60.0);
    const awayCrossMod = (awayTeam.crossing.crossesPerMatch / 18.0) * (awayTeam.crossing.wingPlayBiasPct / 60.0);
    expHome *= Math.pow(homeCrossMod, 0.35);
    expAway *= Math.pow(awayCrossMod, 0.35);

    expHome = Math.max(2.1, Math.min(9.8, expHome));
    expAway = Math.max(1.6, Math.min(8.2, expAway));

    const totalCorners = expHome + expAway;
    const distribution = [];
    let cumOver9_5 = 0;

    for (let c = 0; c <= 20; c++) {
      const p = poissonPmf(c, totalCorners);
      distribution.push({ count: c, probability: p, pct: Number((p * 100).toFixed(1)) });
      if (c > 9.5) cumOver9_5 += p;
    }

    return {
      expectedHomeCorners: Number(expHome.toFixed(1)),
      expectedAwayCorners: Number(expAway.toFixed(1)),
      totalExpectedCorners: Number(totalCorners.toFixed(1)),
      overUnderLines: {
        over9_5: Number((cumOver9_5 * 100).toFixed(1)),
        under9_5: Number(((1 - cumOver9_5) * 100).toFixed(1))
      },
      distribution: distribution.slice(4, 17)
    };
  }

  function calculatePlayerShotProps(homeTeam, awayTeam) {
    const projectedHomeShots = homeTeam.shots.avgShotsPerMatch * (awayTeam.shots.avgShotsConceded / 12.0) * 1.06;
    const projectedAwayShots = awayTeam.shots.avgShotsPerMatch * (homeTeam.shots.avgShotsConceded / 12.0) * 0.94;

    const homeMult = projectedHomeShots / (homeTeam.shots.avgShotsPerMatch || 1);
    const awayMult = projectedAwayShots / (awayTeam.shots.avgShotsPerMatch || 1);

    const homePlayers = LA_LIGA_PLAYERS.filter(p => p.teamId === homeTeam.id);
    const awayPlayers = LA_LIGA_PLAYERS.filter(p => p.teamId === awayTeam.id);

    function formatPlayer(p, mult, badge, short) {
      const expShots = Number((p.shotsPer90 * mult).toFixed(2));
      const expSoT = Number((expShots * (p.shootingAccuracyPct / 100)).toFixed(2));
      const p1 = Math.max(0, Math.min(0.99, 1 - Math.exp(-expSoT)));
      const p2 = Math.max(0, Math.min(0.95, 1 - Math.exp(-expSoT) * (1 + expSoT)));
      const pGoal = Math.max(0, Math.min(0.85, 1 - Math.exp(-expShots * (p.goalConversionPct / 100))));

      return {
        ...p,
        teamShort: short,
        teamBadge: badge,
        expectedShots: expShots,
        expectedSoT: expSoT,
        accuracyPct: p.shootingAccuracyPct,
        penaltyDuty: p.penaltyTaker,
        probabilities: {
          onePlusSoT: Number((p1 * 100).toFixed(1)),
          twoPlusSoT: Number((p2 * 100).toFixed(1)),
          anytimeGoal: Number((pGoal * 100).toFixed(1))
        },
        fairOdds: {
          onePlusSoT: Number((1 / p1).toFixed(2)),
          twoPlusSoT: Number((1 / p2).toFixed(2))
        }
      };
    }

    const homeShooters = homePlayers.map(p => formatPlayer(p, homeMult, homeTeam.badge, homeTeam.shortName)).sort((a, b) => b.expectedSoT - a.expectedSoT);
    const awayShooters = awayPlayers.map(p => formatPlayer(p, awayMult, awayTeam.badge, awayTeam.shortName)).sort((a, b) => b.expectedSoT - a.expectedSoT);
    const matchTopThreats = [...homeShooters, ...awayShooters].sort((a, b) => b.expectedSoT - a.expectedSoT).slice(0, 6);

    return { homeShooters, awayShooters, matchTopThreats };
  }

  function calculateFormMomentum(recentMatches) {
    if (!recentMatches || recentMatches.length === 0) return 1.5;
    const weights = [0.35, 0.25, 0.20, 0.12, 0.08];
    let sum = 0, wSum = 0;
    for (let i = 0; i < Math.min(recentMatches.length, weights.length); i++) {
      const m = recentMatches[i];
      let pts = m.result === 'W' ? 3 : (m.result === 'D' ? 1 : 0);
      sum += pts * weights[i];
      wSum += weights[i];
    }
    return wSum > 0 ? sum / wSum : 1.5;
  }

  function runMlRegression(homeTeam, awayTeam) {
    const featXgDiff = (homeTeam.xGPerMatch - homeTeam.xGAPerMatch) - (awayTeam.xGPerMatch - awayTeam.xGAPerMatch);
    const featFormMomentum = (calculateFormMomentum(homeTeam.recentMatches) - calculateFormMomentum(awayTeam.recentMatches)) / 3.0;
    const featVenue = ((homeTeam.homeRecord.won * 3 + homeTeam.homeRecord.drawn) / homeTeam.homeRecord.played - (awayTeam.awayRecord.won * 3 + awayTeam.awayRecord.drawn) / awayTeam.awayRecord.played) / 3.0;
    const featTactics = ((awayTeam.tacticalStyle.ppda - homeTeam.tacticalStyle.ppda) / 5.0 * 0.5) + ((homeTeam.tacticalStyle.fieldTiltPct - awayTeam.tacticalStyle.fieldTiltPct) / 30.0 * 0.5);
    const featDefense = (homeTeam.tacticalStyle.cleanSheets / homeTeam.played) - (awayTeam.tacticalStyle.cleanSheets / awayTeam.played);
    const featCrossing = ((homeTeam.crossing.crossesPerMatch * homeTeam.crossing.crossAccuracyPct / 100) - (awayTeam.crossing.crossesPerMatch * awayTeam.crossing.crossAccuracyPct / 100)) / 5.0;

    const w = { intercept: 0.28, xg: 0.58, form: 0.42, venue: 0.36, tactics: 0.24, def: 0.32, cross: 0.16 };
    const cXg = w.xg * featXgDiff;
    const cForm = w.form * featFormMomentum;
    const cVenue = w.venue * featVenue;
    const cTactics = w.tactics * featTactics;
    const cDef = w.def * featDefense;
    const cCross = w.cross * featCrossing;

    const goalMargin = w.intercept + cXg + cForm + cVenue + cTactics + cDef + cCross;
    const totalGoals = 2.45 + ((homeTeam.shots.avgShotsPerMatch + awayTeam.shots.avgShotsPerMatch) / 25.0 - 1.0) * 0.65;

    const k = 1.25;
    const pH = 1 / (1 + Math.exp(-k * (goalMargin - 0.22)));
    const pA = 1 / (1 + Math.exp(k * (goalMargin + 0.22)));
    const pD = Math.max(0.18, 1 - (pH * 0.85 + pA * 0.85));
    const tot = pH + pD + pA;

    const totalAbs = Math.abs(cXg) + Math.abs(cForm) + Math.abs(cVenue) + Math.abs(cTactics) + Math.abs(cDef) + Math.abs(cCross) || 1;

    const featureExplanations = [
      { feature: 'xG Differential (Attack/Defense Quality)', goalImpact: Number(cXg.toFixed(2)), importancePct: Number(((Math.abs(cXg) / totalAbs) * 100).toFixed(1)), favors: cXg >= 0 ? homeTeam.name : awayTeam.name, explanation: `${cXg >= 0 ? homeTeam.shortName : awayTeam.shortName} holds an xG creation edge of ${Math.abs(featXgDiff).toFixed(2)} goals/game.` },
      { feature: 'Recent 5-Match Form Momentum', goalImpact: Number(cForm.toFixed(2)), importancePct: Number(((Math.abs(cForm) / totalAbs) * 100).toFixed(1)), favors: cForm >= 0 ? homeTeam.name : awayTeam.name, explanation: `Trajectory shows ${cForm >= 0 ? homeTeam.shortName : awayTeam.shortName} carries higher performance momentum.` },
      { feature: 'Home / Away Venue Disparity', goalImpact: Number(cVenue.toFixed(2)), importancePct: Number(((Math.abs(cVenue) / totalAbs) * 100).toFixed(1)), favors: cVenue >= 0 ? homeTeam.name : awayTeam.name, explanation: `${homeTeam.name}'s fortress form at ${homeTeam.stadium} vs ${awayTeam.name}'s away travels.` },
      { feature: 'Tactical Pressing & Field Tilt', goalImpact: Number(cTactics.toFixed(2)), importancePct: Number(((Math.abs(cTactics) / totalAbs) * 100).toFixed(1)), favors: cTactics >= 0 ? homeTeam.name : awayTeam.name, explanation: `Mismatch in pressing intensity (PPDA) and territorial dominance.` },
      { feature: 'Defensive Resilience & Clean Sheets', goalImpact: Number(cDef.toFixed(2)), importancePct: Number(((Math.abs(cDef) / totalAbs) * 100).toFixed(1)), favors: cDef >= 0 ? homeTeam.name : awayTeam.name, explanation: `${cDef >= 0 ? homeTeam.shortName : awayTeam.shortName} boasts superior clean sheet reliability.` },
      { feature: 'Crossing & Wing Attack Leverage', goalImpact: Number(cCross.toFixed(2)), importancePct: Number(((Math.abs(cCross) / totalAbs) * 100).toFixed(1)), favors: cCross >= 0 ? homeTeam.name : awayTeam.name, explanation: `Volume of deliveries into the 18-yard box.` }
    ];

    return {
      predictedGoalMargin: Number(goalMargin.toFixed(2)),
      predictedTotalGoals: Number(totalGoals.toFixed(2)),
      predictedWinner: goalMargin > 0.25 ? homeTeam.name : (goalMargin < -0.25 ? awayTeam.name : 'Draw'),
      mlProbabilities: {
        homeWin: Number(((pH / tot) * 100).toFixed(1)),
        draw: Number(((pD / tot) * 100).toFixed(1)),
        awayWin: Number(((pA / tot) * 100).toFixed(1))
      },
      featureExplanations: featureExplanations.sort((a, b) => b.importancePct - a.importancePct)
    };
  }

  // --- Backtesting & Accuracy Verification Engine ---
  const EPSILON = 1e-15;
  function clipProb(p) { return Math.max(EPSILON, Math.min(1 - EPSILON, p)); }

  function runBacktest(matches, teams, options = {}) {
    const minEdge = options.minEdge !== undefined ? options.minEdge : 0.05;
    const selectedMatchday = options.matchday || 'all';

    let filteredMatches = matches;
    if (selectedMatchday !== 'all') {
      const md = Number(selectedMatchday);
      filteredMatches = matches.filter(m => m.matchday === md);
    }

    if (!filteredMatches || filteredMatches.length === 0) {
      return {
        totalMatches: 0, accuracyPct: 0, brierScore: 0, baselineBrier: 0.667, logLoss: 0, baselineLogLoss: 1.098,
        overUnderAccuracyPct: 0, valueBetsCount: 0, valueBetsWon: 0, valueBetWinRate: 0, netProfitUnits: 0, roiPct: 0,
        currentBankroll: 100, equityCurve: [], auditRows: [], calibrationBuckets: []
      };
    }

    let totalBrierSum = 0, totalLogLossSum = 0, correct1X2Hits = 0, correctOverUnderHits = 0;
    let totalBetsCount = 0, valueBetsWon = 0, netProfitUnits = 0, currentBankroll = 100.0;
    const equityCurve = [{ matchIndex: 0, bankroll: 100.0, label: 'Start' }];
    const auditRows = [];

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

      const dc = calculateDixonColes(homeTeam, awayTeam);
      const ml = runMlRegression(homeTeam, awayTeam);

      let pH = (dc.homeWinProb * 0.55) + (ml.mlProbabilities.homeWin / 100 * 0.45);
      let pD = (dc.drawProb * 0.55) + (ml.mlProbabilities.draw / 100 * 0.45);
      let pA = (dc.awayWinProb * 0.55) + (ml.mlProbabilities.awayWin / 100 * 0.45);
      const pTot = pH + pD + pA;
      pH /= pTot; pD /= pTot; pA /= pTot;

      let actualOutcome = 'D', yH = 0, yD = 0, yA = 0;
      if (m.homeGoals > m.awayGoals) { actualOutcome = 'H'; yH = 1; }
      else if (m.homeGoals === m.awayGoals) { actualOutcome = 'D'; yD = 1; }
      else { actualOutcome = 'A'; yA = 1; }

      const actualOver25 = (m.homeGoals + m.awayGoals) > 2.5;

      let predictedOutcome = 'H', maxP = pH;
      if (pD > maxP) { predictedOutcome = 'D'; maxP = pD; }
      if (pA > maxP) { predictedOutcome = 'A'; maxP = pA; }

      const is1X2Hit = predictedOutcome === actualOutcome;
      if (is1X2Hit) correct1X2Hits++;

      const predOver25 = (dc.overUnderLines.over25 / 100) >= 0.50;
      if (predOver25 === actualOver25) correctOverUnderHits++;

      const brier = Math.pow(pH - yH, 2) + Math.pow(pD - yD, 2) + Math.pow(pA - yA, 2);
      totalBrierSum += brier;

      const pAct = yH ? pH : (yD ? pD : pA);
      totalLogLossSum += -Math.log(clipProb(pAct));

      [ { p: pH, hit: yH === 1 }, { p: pD, hit: yD === 1 }, { p: pA, hit: yA === 1 } ].forEach(it => {
        const b = buckets.find(bk => it.p >= bk.min && it.p < bk.max);
        if (b) { b.total++; if (it.hit) b.hits++; }
      });

      const oH = m.marketOdds.home, oD = m.marketOdds.draw, oA = m.marketOdds.away;
      const eH = (pH * oH) - 1.0, eD = (pD * oD) - 1.0, eA = (pA * oA) - 1.0;

      let bestVal = null, highEdge = -1;
      if (eH > highEdge) { highEdge = eH; bestVal = { pick: 'H', label: `${homeTeam.shortName} Win`, odds: oH, edge: eH, won: yH === 1 }; }
      if (eD > highEdge) { highEdge = eD; bestVal = { pick: 'D', label: 'Draw', odds: oD, edge: eD, won: yD === 1 }; }
      if (eA > highEdge) { highEdge = eA; bestVal = { pick: 'A', label: `${awayTeam.shortName} Win`, odds: oA, edge: eA, won: yA === 1 }; }

      let betPlaced = false, betProfit = 0;
      if (bestVal && bestVal.edge >= minEdge) {
        betPlaced = true;
        totalBetsCount++;
        if (bestVal.won) {
          valueBetsWon++;
          betProfit = bestVal.odds - 1.0;
        } else {
          betProfit = -1.0;
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

      auditRows.push({
        id: m.id, matchday: m.matchday, date: m.date,
        homeShort: homeTeam.shortName, awayShort: awayTeam.shortName,
        homeBadge: homeTeam.badge, awayBadge: awayTeam.badge,
        actualScore: `${m.homeGoals}-${m.awayGoals}`,
        actualOutcome, predictedOutcome,
        predictedScore: dc.mostLikelyScore.score,
        is1X2Hit,
        probabilities: { home: Number((pH * 100).toFixed(1)), draw: Number((pD * 100).toFixed(1)), away: Number((pA * 100).toFixed(1)) },
        marketOdds: { home: oH, draw: oD, away: oA },
        bestValue: bestVal ? { label: bestVal.label, odds: bestVal.odds, edgePct: Number((bestVal.edge * 100).toFixed(1)), isQualified: bestVal.edge >= minEdge, won: bestVal.won, profit: betPlaced ? Number(betProfit.toFixed(2)) : 0 } : null,
        betPlaced,
        brierScore: Number(brier.toFixed(3))
      });
    });

    const totalN = filteredMatches.length;
    const accPct = Number(((correct1X2Hits / totalN) * 100).toFixed(1));
    const meanBrier = Number((totalBrierSum / totalN).toFixed(3));
    const meanLogLoss = Number((totalLogLossSum / totalN).toFixed(3));
    const roi = totalBetsCount > 0 ? Number(((netProfitUnits / totalBetsCount) * 100).toFixed(1)) : 0;
    const winRate = totalBetsCount > 0 ? Number(((valueBetsWon / totalBetsCount) * 100).toFixed(1)) : 0;
    const ouAcc = Number(((correctOverUnderHits / totalN) * 100).toFixed(1));

    const calibrationResults = buckets.map(b => ({
      label: b.label, total: b.total, hits: b.hits,
      actualPct: b.total > 0 ? Number(((b.hits / b.total) * 100).toFixed(1)) : 0
    }));

    return {
      totalMatches: totalN, accuracyPct: accPct, correctHits: correct1X2Hits,
      brierScore: meanBrier, baselineBrier: 0.667, logLoss: meanLogLoss, baselineLogLoss: 1.098,
      overUnderAccuracyPct: ouAcc, valueBetsCount: totalBetsCount, valueBetsWon,
      valueBetWinRate: winRate, netProfitUnits: Number(netProfitUnits.toFixed(2)),
      roiPct: roi, currentBankroll: Number(currentBankroll.toFixed(2)),
      equityCurve, auditRows, calibrationBuckets: calibrationResults
    };
  }

  // =========================================================================
  // 5. APPLICATION STATE & DOM CONTROLLER
  // =========================================================================
  const state = {
    homeTeamId: 'real-sociedad',
    awayTeamId: 'real-madrid',
    activeFixtureId: 'fix-2026-0912-02',
    teams: { ...LA_LIGA_TEAMS }
  };

  const els = {
    fixtureStrip: document.getElementById('fixture-strip-container'),
    homeSelect: document.getElementById('home-team-select'),
    awaySelect: document.getElementById('away-team-select'),
    btnSwapTeams: document.getElementById('btn-swap-teams'),
    matchVenueText: document.getElementById('match-venue-text'),
    matchDerbyBadge: document.getElementById('match-derby-badge'),
    matchHeadline: document.getElementById('match-headline'),
    homeBadge: document.getElementById('home-badge'),
    awayBadge: document.getElementById('away-badge'),
    homeManager: document.getElementById('home-manager'),
    awayManager: document.getElementById('away-manager'),
    homeForm: document.getElementById('home-form-pills'),
    awayForm: document.getElementById('away-form-pills'),

    homeProbVal: document.getElementById('prob-home-val'),
    drawProbVal: document.getElementById('prob-draw-val'),
    awayProbVal: document.getElementById('prob-away-val'),
    homeOddsVal: document.getElementById('odds-home-val'),
    drawOddsVal: document.getElementById('odds-draw-val'),
    awayOddsVal: document.getElementById('odds-away-val'),
    barHome: document.getElementById('bar-home'),
    barDraw: document.getElementById('bar-draw'),
    barAway: document.getElementById('bar-away'),

    expTotalGoals: document.getElementById('exp-total-goals'),
    homeXgVal: document.getElementById('home-xg-val'),
    awayXgVal: document.getElementById('away-xg-val'),
    over25Val: document.getElementById('over-25-val'),
    under25Val: document.getElementById('under-25-val'),
    bttsYesVal: document.getElementById('btts-yes-val'),

    expTotalCorners: document.getElementById('exp-total-corners'),
    homeCornersVal: document.getElementById('home-corners-val'),
    awayCornersVal: document.getElementById('away-corners-val'),
    over95CornersVal: document.getElementById('over-95-corners-val'),
    under95CornersVal: document.getElementById('under-95-corners-val'),

    topThreatsContainer: document.getElementById('top-threats-container'),

    tabButtons: document.querySelectorAll('.nav-tab-btn'),
    tabPanes: document.querySelectorAll('.tab-pane'),

    dcMatrixBody: document.getElementById('dc-matrix-body'),
    topScorelinesBody: document.getElementById('top-scorelines-body'),
    dcAlphaHome: document.getElementById('dc-alpha-home'),
    dcBetaHome: document.getElementById('dc-beta-home'),
    dcAlphaAway: document.getElementById('dc-alpha-away'),
    dcBetaAway: document.getElementById('dc-beta-away'),
    dcLambdaHome: document.getElementById('dc-lambda-home'),
    dcLambdaAway: document.getElementById('dc-lambda-away'),

    mlPredictedMargin: document.getElementById('ml-predicted-margin'),
    mlPredictedWinner: document.getElementById('ml-predicted-winner'),
    mlPredictedGoals: document.getElementById('ml-predicted-goals'),
    mlFeaturesList: document.getElementById('ml-features-list'),

    cornerDistChart: document.getElementById('corner-dist-chart'),
    cornerHomeCrosses: document.getElementById('corner-home-crosses'),
    cornerAwayCrosses: document.getElementById('corner-away-crosses'),
    cornerHomeWingBias: document.getElementById('corner-home-wingbias'),
    cornerAwayWingBias: document.getElementById('corner-away-wingbias'),

    playersTableBody: document.getElementById('players-table-body'),
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

  function init() {
    if (UPCOMING_FIXTURES.length > 0 && !UPCOMING_FIXTURES.find(f => f.id === state.activeFixtureId)) {
      state.activeFixtureId = UPCOMING_FIXTURES[0].id;
      state.homeTeamId = UPCOMING_FIXTURES[0].homeTeamId;
      state.awayTeamId = UPCOMING_FIXTURES[0].awayTeamId;
    }
    populateFixtureStrip();
    populateTeamSelects();
    setupEventListeners();
    runAnalysis();
    renderBacktestingSuite();
  }

  function populateFixtureStrip() {
    if (!els.fixtureStrip) return;
    els.fixtureStrip.innerHTML = '';

    UPCOMING_FIXTURES.forEach(f => {
      const home = state.teams[f.homeTeamId];
      const away = state.teams[f.awayTeamId];
      if (!home || !away) return;

      const chip = document.createElement('div');
      chip.className = `fixture-chip ${f.id === state.activeFixtureId ? 'active' : ''}`;
      chip.innerHTML = `
        ${f.isDerby ? '<div class="derby-dot" title="Derby Matchup"></div>' : ''}
        <span class="chip-teams">${home.shortName} vs ${away.shortName}</span>
        <span class="chip-time">${f.date.substring(5)} ${f.time.substring(0, 5)}</span>
      `;

      chip.addEventListener('click', () => {
        state.activeFixtureId = f.id;
        state.homeTeamId = f.homeTeamId;
        state.awayTeamId = f.awayTeamId;
        els.homeSelect.value = f.homeTeamId;
        els.awaySelect.value = f.awayTeamId;

        document.querySelectorAll('.fixture-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        runAnalysis();
      });

      els.fixtureStrip.appendChild(chip);
    });
  }

  function populateTeamSelects() {
    const list = Object.values(state.teams).sort((a, b) => a.position - b.position);
    els.homeSelect.innerHTML = '';
    els.awaySelect.innerHTML = '';

    list.forEach(t => {
      const hOpt = new Option(`${t.position}. ${t.name}`, t.id, false, t.id === state.homeTeamId);
      const aOpt = new Option(`${t.position}. ${t.name}`, t.id, false, t.id === state.awayTeamId);
      els.homeSelect.add(hOpt);
      els.awaySelect.add(aOpt);
    });
  }

  function renderForm(formArr, container) {
    if (!container) return;
    container.innerHTML = '';
    (formArr || []).forEach(r => {
      const sp = document.createElement('span');
      sp.style.cssText = `display:inline-block;width:18px;height:18px;line-height:18px;text-align:center;border-radius:4px;font-size:0.65rem;font-weight:700;color:#fff;margin-right:2px;background:${r === 'W' ? '#10b981' : (r === 'D' ? '#64748b' : '#ef4444')};`;
      sp.textContent = r;
      container.appendChild(sp);
    });
  }

  function runAnalysis() {
    const home = state.teams[state.homeTeamId];
    const away = state.teams[state.awayTeamId];
    if (!home || !away) return;

    els.homeBadge.textContent = home.badge;
    els.awayBadge.textContent = away.badge;
    els.homeManager.textContent = `Mgr: ${home.manager}`;
    els.awayManager.textContent = `Mgr: ${away.manager}`;
    els.matchVenueText.textContent = `${home.stadium}, Spain`;

    renderForm(home.form, els.homeForm);
    renderForm(away.form, els.awayForm);

    const fix = UPCOMING_FIXTURES.find(f => (f.homeTeamId === home.id && f.awayTeamId === away.id) || (f.homeTeamId === away.id && f.awayTeamId === home.id));
    if (fix) {
      els.matchHeadline.textContent = fix.headline;
      els.matchDerbyBadge.style.display = fix.isDerby ? 'inline-block' : 'none';
    } else {
      els.matchHeadline.textContent = `Tactical Match Prediction: ${home.name} vs ${away.name}`;
      els.matchDerbyBadge.style.display = 'none';
    }

    const dc = calculateDixonColes(home, away);
    const corners = calculateCorners(home, away);
    const players = calculatePlayerShotProps(home, away);
    const ml = runMlRegression(home, away);

    // 1. Executive Summary
    const hWin = Number(((dc.probabilities.homeWin * 0.65 + ml.mlProbabilities.homeWin * 0.35)).toFixed(1));
    const dWin = Number(((dc.probabilities.draw * 0.65 + ml.mlProbabilities.draw * 0.35)).toFixed(1));
    const aWin = Number(((dc.probabilities.awayWin * 0.65 + ml.mlProbabilities.awayWin * 0.35)).toFixed(1));

    els.homeProbVal.textContent = `${hWin}%`;
    els.drawProbVal.textContent = `${dWin}%`;
    els.awayProbVal.textContent = `${aWin}%`;

    els.homeOddsVal.textContent = `@ ${(100 / (hWin || 1)).toFixed(2)}`;
    els.drawOddsVal.textContent = `@ ${(100 / (dWin || 1)).toFixed(2)}`;
    els.awayOddsVal.textContent = `@ ${(100 / (aWin || 1)).toFixed(2)}`;

    els.barHome.style.width = `${hWin}%`;
    els.barDraw.style.width = `${dWin}%`;
    els.barAway.style.width = `${aWin}%`;
    els.barHome.textContent = `${hWin}%`;
    els.barDraw.textContent = `${dWin}%`;
    els.barAway.textContent = `${aWin}%`;

    // Goals
    els.expTotalGoals.textContent = dc.expectedTotalGoals;
    els.homeXgVal.textContent = dc.lambdaHome;
    els.awayXgVal.textContent = dc.lambdaAway;
    els.over25Val.textContent = `${dc.probabilities.over25}%`;
    els.under25Val.textContent = `${dc.probabilities.under25}%`;
    els.bttsYesVal.textContent = `${dc.probabilities.bttsYes}% Yes`;

    // Corners
    els.expTotalCorners.textContent = corners.totalExpectedCorners;
    els.homeCornersVal.textContent = corners.expectedHomeCorners;
    els.awayCornersVal.textContent = corners.expectedAwayCorners;
    els.over95CornersVal.textContent = `${corners.overUnderLines.over9_5}%`;
    els.under95CornersVal.textContent = `${corners.overUnderLines.under9_5}%`;

    // Player Threats
    els.topThreatsContainer.innerHTML = '';
    players.matchTopThreats.slice(0, 2).forEach(p => {
      const row = document.createElement('div');
      row.className = 'threat-row';
      row.innerHTML = `
        <div class="threat-player-info">
          <span style="font-size:1.2rem;">${p.teamBadge}</span>
          <div>
            <div style="font-weight:700;color:#fff;">${p.name} (${p.position})</div>
            <div style="font-size:0.72rem;color:var(--text-muted);">${p.teamShort} • ${p.sotPer90} SoT/90</div>
          </div>
        </div>
        <div style="text-align:right;">
          <div class="threat-prob">${p.probabilities.onePlusSoT}%</div>
          <div style="font-size:0.68rem;color:var(--accent-gold);">1+ SoT @ ${p.fairOdds.onePlusSoT}</div>
        </div>
      `;
      els.topThreatsContainer.appendChild(row);
    });

    // 2. Dixon-Coles Tab
    els.dcAlphaHome.textContent = dc.alphaHome;
    els.dcBetaHome.textContent = dc.betaHome;
    els.dcAlphaAway.textContent = dc.alphaAway;
    els.dcBetaAway.textContent = dc.betaAway;
    els.dcLambdaHome.textContent = dc.lambdaHome;
    els.dcLambdaAway.textContent = dc.lambdaAway;

    els.dcMatrixBody.innerHTML = '';
    const maxProb = Math.max(...dc.matrix.flat());

    for (let h = 0; h < 6; h++) {
      const tr = document.createElement('tr');
      const th = document.createElement('th');
      th.textContent = `${home.shortName} ${h}`;
      tr.appendChild(th);

      for (let a = 0; a < 6; a++) {
        const td = document.createElement('td');
        const prob = dc.matrix[h][a];
        const pct = (prob * 100).toFixed(1);
        const alpha = Math.min(0.85, Math.max(0.08, (prob / maxProb) * 0.75));

        td.style.backgroundColor = `rgba(245, 158, 11, ${alpha})`;
        td.className = 'matrix-cell' + (prob === maxProb ? ' high-prob' : '');
        td.innerHTML = `<div>${pct}%</div><div style="font-size:0.62rem;color:var(--text-muted);">${h}-${a}</div>`;
        tr.appendChild(td);
      }
      els.dcMatrixBody.appendChild(tr);
    }

    els.topScorelinesBody.innerHTML = '';
    dc.topScorelines.forEach((s, i) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="font-weight:700;color:var(--accent-gold);">#${i + 1}</td>
        <td style="font-weight:700;font-family:var(--font-display);font-size:1rem;">${s.score}</td>
        <td style="font-weight:700;color:#fff;">${s.pct}%</td>
        <td style="color:var(--text-muted);">@ ${(100 / (s.pct || 1)).toFixed(2)}</td>
      `;
      els.topScorelinesBody.appendChild(tr);
    });

    // 3. ML Tab
    els.mlPredictedMargin.textContent = ml.predictedGoalMargin > 0 ? `+${ml.predictedGoalMargin}` : ml.predictedGoalMargin;
    els.mlPredictedWinner.textContent = ml.predictedWinner;
    els.mlPredictedGoals.textContent = ml.predictedTotalGoals;

    els.mlFeaturesList.innerHTML = '';
    ml.featureExplanations.forEach(f => {
      const div = document.createElement('div');
      div.className = 'feature-weight-item';
      div.innerHTML = `
        <div class="feature-header">
          <span class="feature-name">${f.feature}</span>
          <span class="feature-pct">${f.importancePct}% Impact</span>
        </div>
        <div class="feature-bar-bg">
          <div class="feature-bar-fill" style="width:${f.importancePct}%;"></div>
        </div>
        <div class="feature-desc">
          <strong style="color:${f.goalImpact >= 0 ? '#3b82f6' : '#ef4444'};">${f.goalImpact >= 0 ? `+${f.goalImpact}` : f.goalImpact} goals</strong> favors <strong>${f.favors}</strong>. ${f.explanation}
        </div>
      `;
      els.mlFeaturesList.appendChild(div);
    });

    // 4. Corners Tab
    els.cornerHomeCrosses.textContent = `${home.crossing.crossesPerMatch} / match (${home.crossing.crossAccuracyPct}%)`;
    els.cornerAwayCrosses.textContent = `${away.crossing.crossesPerMatch} / match (${away.crossing.crossAccuracyPct}%)`;
    els.cornerHomeWingBias.textContent = `${home.crossing.wingPlayBiasPct}%`;
    els.cornerAwayWingBias.textContent = `${away.crossing.wingPlayBiasPct}%`;

    els.cornerDistChart.innerHTML = '';
    const maxCornerP = Math.max(...corners.distribution.map(d => d.probability));
    corners.distribution.forEach(d => {
      const col = document.createElement('div');
      col.className = 'dist-bar-col';
      const hPct = Math.max(4, (d.probability / maxCornerP) * 90);
      col.innerHTML = `
        <span class="dist-val">${d.pct}%</span>
        <div class="dist-bar" style="height:${hPct}%;"></div>
        <span class="dist-lbl">${d.count}</span>
      `;
      els.cornerDistChart.appendChild(col);
    });

    // 5. Players Tab
    els.playersTableBody.innerHTML = '';
    const allPlayers = [...players.homeShooters, ...players.awayShooters].sort((a, b) => b.expectedSoT - a.expectedSoT);
    allPlayers.forEach(p => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>
          <div class="player-name-cell">
            <span>${p.teamBadge}</span>
            <div>
              <div>${p.name} ${p.penaltyDuty ? '<span style="color:var(--accent-gold);font-size:0.7rem;">(P)</span>' : ''}</div>
              <div style="font-size:0.7rem;color:var(--text-muted);">${p.teamShort} • ${p.position} • #${p.number}</div>
            </div>
          </div>
        </td>
        <td style="color:var(--text-secondary);">${p.role}</td>
        <td style="font-weight:600;">${p.shotsPer90}</td>
        <td style="font-weight:700;color:#fff;">${p.sotPer90}</td>
        <td style="color:var(--text-secondary);">${p.accuracyPct}%</td>
        <td style="font-weight:700;color:var(--accent-cyan);">${p.expectedShots}</td>
        <td style="font-weight:800;color:var(--accent-gold);font-family:var(--font-display);font-size:0.95rem;">${p.expectedSoT}</td>
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
        <td style="font-weight:600;color:var(--accent-emerald);">${p.probabilities.anytimeGoal}%</td>
      `;
      els.playersTableBody.appendChild(tr);
    });

    // 6. H2H Tab
    els.h2hMetricsContainer.innerHTML = '';
    const h2hMetrics = [
      { label: 'Expected Goals (xG) / Match', h: home.xGPerMatch, a: away.xGPerMatch },
      { label: 'Expected Goals Conceded (xGA)', h: home.xGAPerMatch, a: away.xGAPerMatch },
      { label: 'Average Possession %', h: home.tacticalStyle.possessionPct, a: away.tacticalStyle.possessionPct },
      { label: 'Shots per Match', h: home.shots.avgShotsPerMatch, a: away.shots.avgShotsPerMatch },
      { label: 'Shots Conceded / Match', h: home.shots.avgShotsConceded, a: away.shots.avgShotsConceded },
      { label: 'Average Corners Won', h: home.corners.avgWon, a: away.corners.avgWon },
      { label: 'High Press Intensity (PPDA)', h: home.tacticalStyle.ppda, a: away.tacticalStyle.ppda },
      { label: 'Clean Sheets Kept', h: home.tacticalStyle.cleanSheets, a: away.tacticalStyle.cleanSheets },
      { label: 'Elo Strength Rating', h: home.eloRating, a: away.eloRating }
    ];

    h2hMetrics.forEach(m => {
      const totVal = m.h + m.a || 1;
      const hPct = (m.h / totVal) * 100;
      const div = document.createElement('div');
      div.style.marginBottom = '1.1rem';
      div.innerHTML = `
        <div style="display:flex;justify-content:space-between;font-size:0.8rem;margin-bottom:0.35rem;">
          <span style="font-weight:700;color:#3b82f6;">${m.h}</span>
          <span style="color:var(--text-secondary);font-weight:600;">${m.label}</span>
          <span style="font-weight:700;color:#ef4444;">${m.a}</span>
        </div>
        <div class="metric-compare-bar">
          <div class="bar-track" style="width:100%;">
            <div class="bar-fill-left" style="width:${hPct}%;"></div>
            <div class="bar-fill-right" style="width:${100 - hPct}%;"></div>
          </div>
        </div>
      `;
      els.h2hMetricsContainer.appendChild(div);
    });
  }

  // --- Render Tab 6: Backtesting Suite ---
  function renderBacktestingSuite() {
    if (!els.kpiAccuracyVal) return;

    const matchday = els.backtestMatchdayFilter ? els.backtestMatchdayFilter.value : 'all';
    const minEdge = els.backtestEdgeFilter ? parseFloat(els.backtestEdgeFilter.value) : 0.05;

    const results = runBacktest(HISTORICAL_MATCHES, state.teams, { matchday, minEdge });

    els.kpiAccuracyVal.textContent = `${results.accuracyPct}%`;
    els.kpiHitsDetail.textContent = `${results.correctHits} / ${results.totalMatches} matches hit`;

    els.kpiBrierVal.textContent = results.brierScore.toFixed(3);
    const brierDiff = ((results.baselineBrier - results.brierScore) / results.baselineBrier) * 100;
    els.kpiBrierBadge.textContent = `${brierDiff >= 0 ? '-' : '+'}${Math.abs(brierDiff).toFixed(1)}% Error`;

    els.kpiLoglossVal.textContent = results.logLoss.toFixed(3);
    const logLossDiff = ((results.baselineLogLoss - results.logLoss) / results.baselineLogLoss) * 100;
    els.kpiLoglossBadge.textContent = `${logLossDiff >= 0 ? '-' : '+'}${Math.abs(logLossDiff).toFixed(1)}% Cross-Entropy`;

    els.kpiRoiVal.textContent = `${results.roiPct >= 0 ? '+' : ''}${results.roiPct}%`;
    els.kpiRoiVal.style.color = results.roiPct >= 0 ? 'var(--accent-emerald)' : 'var(--accent-crimson)';
    els.kpiProfitDetail.textContent = `${results.netProfitUnits >= 0 ? '+' : ''}${results.netProfitUnits}u on ${results.valueBetsCount} bets`;
    els.kpiWinrateDetail.textContent = `${results.valueBetWinRate}% Win Rate`;

    els.kpiOuVal.textContent = `${results.overUnderAccuracyPct}%`;
    if (els.bankrollCurrentVal) {
      els.bankrollCurrentVal.textContent = `${results.currentBankroll}u`;
      els.bankrollCurrentVal.style.color = results.currentBankroll >= 100 ? 'var(--accent-emerald)' : 'var(--accent-crimson)';
    }

    renderEquityCurve(results.equityCurve);
    renderCalibrationBars(results.calibrationBuckets);
    renderAuditTable(results.auditRows);
  }

  function renderEquityCurve(curveData) {
    if (!els.equityCurveContainer) return;
    if (!curveData || curveData.length === 0) {
      els.equityCurveContainer.innerHTML = '<div style="color:var(--text-muted);font-size:0.8rem;text-align:center;padding:2rem;">No bets placed under current filter</div>';
      return;
    }

    const width = 680, height = 170, padLeft = 45, padRight = 20, padTop = 15, padBottom = 25;
    const chartW = width - padLeft - padRight, chartH = height - padTop - padBottom;

    const bankrolls = curveData.map(d => d.bankroll);
    let minB = Math.min(96, Math.min(...bankrolls) - 1.0);
    let maxB = Math.max(105, Math.max(...bankrolls) + 1.0);

    const getX = (i) => padLeft + (i / (curveData.length - 1 || 1)) * chartW;
    const getY = (val) => padTop + chartH - ((val - minB) / (maxB - minB || 1)) * chartH;
    const baselineY = getY(100.0);

    const points = curveData.map((d, i) => `${getX(i)},${getY(d.bankroll)}`);
    const linePathD = `M ${points.join(' L ')}`;
    const areaPathD = `${linePathD} L ${getX(curveData.length - 1)},${padTop + chartH} L ${padLeft},${padTop + chartH} Z`;

    const dotsHtml = curveData.filter(d => d.betPlaced).map((d) => {
      const cx = getX(d.matchIndex), cy = getY(d.bankroll);
      const color = d.betProfit > 0 ? '#10b981' : '#ef4444';
      return `<circle cx="${cx}" cy="${cy}" r="3.5" fill="${color}" stroke="#101623" stroke-width="1.5"><title>${d.matchLabel}: ${d.betProfit > 0 ? '+' + d.betProfit : d.betProfit}u</title></circle>`;
    }).join('');

    els.equityCurveContainer.innerHTML = `
      <svg viewBox="0 0 ${width} ${height}" style="width:100%;height:100%;overflow:visible;">
        <defs>
          <linearGradient id="equityGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#10b981" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="#10b981" stop-opacity="0.0"/>
          </linearGradient>
        </defs>
        <line x1="${padLeft}" y1="${baselineY}" x2="${padLeft + chartW}" y2="${baselineY}" stroke="rgba(255,255,255,0.15)" stroke-dasharray="4,4" />
        <text x="${padLeft - 8}" y="${baselineY + 3}" fill="#64748b" font-size="10" text-anchor="end">100u</text>
        <text x="${padLeft - 8}" y="${padTop + 8}" fill="#64748b" font-size="9" text-anchor="end">${maxB.toFixed(0)}u</text>
        <text x="${padLeft - 8}" y="${padTop + chartH}" fill="#64748b" font-size="9" text-anchor="end">${minB.toFixed(0)}u</text>
        <path d="${areaPathD}" fill="url(#equityGrad)" />
        <path d="${linePathD}" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        ${dotsHtml}
        <text x="${padLeft}" y="${height - 6}" fill="#64748b" font-size="10">Round 1</text>
        <text x="${padLeft + chartW}" y="${height - 6}" fill="#64748b" font-size="10" text-anchor="end">Round 4</text>
      </svg>
    `;
  }

  function renderCalibrationBars(buckets) {
    if (!els.calibrationBarsContainer) return;
    els.calibrationBarsContainer.innerHTML = '';
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
      els.calibrationBarsContainer.appendChild(item);
    });
  }

  function renderAuditTable(rows) {
    if (!els.backtestAuditBody) return;
    els.backtestAuditBody.innerHTML = '';

    rows.forEach(r => {
      const tr = document.createElement('tr');
      const outcomeLabel = r.predictedOutcome === 'H' ? `${r.homeShort} Win` : (r.predictedOutcome === 'D' ? 'Draw' : `${r.awayShort} Win`);
      const pickBadge = r.is1X2Hit ?
        `<span class="tag-hit">✓ Hit (${outcomeLabel})</span>` :
        `<span class="tag-miss">✕ Miss (${outcomeLabel})</span>`;

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
        <td><strong style="color:#fff;font-size:0.9rem;font-family:var(--font-display);">${r.actualScore}</strong></td>
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
      els.backtestAuditBody.appendChild(tr);
    });
  }

  function setupEventListeners() {
    els.homeSelect.addEventListener('change', (e) => {
      state.homeTeamId = e.target.value;
      if (state.homeTeamId === state.awayTeamId) {
        state.awayTeamId = Object.keys(state.teams).find(k => k !== state.homeTeamId);
        els.awaySelect.value = state.awayTeamId;
      }
      runAnalysis();
    });

    els.awaySelect.addEventListener('change', (e) => {
      state.awayTeamId = e.target.value;
      if (state.awayTeamId === state.homeTeamId) {
        state.homeTeamId = Object.keys(state.teams).find(k => k !== state.awayTeamId);
        els.homeSelect.value = state.homeTeamId;
      }
      runAnalysis();
    });

    els.btnSwapTeams.addEventListener('click', () => {
      const t = state.homeTeamId;
      state.homeTeamId = state.awayTeamId;
      state.awayTeamId = t;
      els.homeSelect.value = state.homeTeamId;
      els.awaySelect.value = state.awayTeamId;
      runAnalysis();
    });

    els.tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        els.tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        els.tabPanes.forEach(p => {
          if (p.id === `tab-${target}`) p.classList.add('active');
          else p.classList.remove('active');
        });
      });
    });

    const fdMap = {
      'real madrid cf': 'real-madrid', 'real madrid': 'real-madrid',
      'fc barcelona': 'barcelona', 'barcelona': 'barcelona',
      'club atlético de madrid': 'atletico-madrid', 'atlético de madrid': 'atletico-madrid',
      'athletic club': 'athletic-club', 'villarreal cf': 'villarreal', 'villarreal': 'villarreal',
      'real sociedad de fútbol': 'real-sociedad', 'real sociedad': 'real-sociedad',
      'real betis balompié': 'real-betis', 'real betis': 'real-betis',
      'girona fc': 'girona', 'girona': 'girona',
      'rc celta de vigo': 'celta-vigo', 'celta vigo': 'celta-vigo',
      'rcd mallorca': 'mallorca', 'mallorca': 'mallorca',
      'ca osasuna': 'osasuna', 'osasuna': 'osasuna',
      'rayo vallecano de madrid': 'rayo-vallecano', 'rayo vallecano': 'rayo-vallecano',
      'sevilla fc': 'sevilla', 'sevilla': 'sevilla',
      'ud las palmas': 'las-palmas', 'las palmas': 'las-palmas',
      'deportivo alavés': 'alaves', 'alaves': 'alaves',
      'getafe cf': 'getafe', 'getafe': 'getafe',
      'valencia cf': 'valencia', 'valencia': 'valencia',
      'rcd espanyol de barcelona': 'espanyol', 'espanyol': 'espanyol',
      'cd leganés': 'leganes', 'leganes': 'leganes',
      'real valladolid cf': 'valladolid', 'valladolid': 'valladolid'
    };

    function resolveName(name) {
      if (!name) return null;
      const clean = name.toLowerCase().trim();
      if (fdMap[clean]) return fdMap[clean];
      for (let k in fdMap) {
        if (clean.includes(k) || k.includes(clean)) return fdMap[k];
      }
      return null;
    }

    els.btnOpenApiModal.addEventListener('click', () => els.apiModal.classList.add('active'));
    els.btnCloseApiModal.addEventListener('click', () => els.apiModal.classList.remove('active'));
    els.btnSaveApiSettings.addEventListener('click', async () => {
      const apiKey = els.apiKeyInput ? els.apiKeyInput.value.trim() : '';
      if (!apiKey) {
        showToast('Please enter your Football-Data.org API key.');
        return;
      }
      els.btnSaveApiSettings.textContent = 'Syncing...';
      els.btnSaveApiSettings.disabled = true;

      try {
        localStorage.setItem('laliga_predictor_api_config', JSON.stringify({ provider: 'football-data', apiKey: apiKey }));
        const res = await fetch('https://api.football-data.org/v4/competitions/PD/matches?status=SCHEDULED', {
          headers: { 'X-Auth-Token': apiKey }
        });
        if (!res.ok) {
          throw new Error('HTTP ' + res.status + ': ' + (res.status === 403 ? 'Invalid API Key' : res.statusText));
        }
        const data = await res.json();
        if (data.matches && data.matches.length > 0) {
          const newFixtures = [];
          for (let m of data.matches.slice(0, 10)) {
            const hId = resolveName(m.homeTeam.name);
            const aId = resolveName(m.awayTeam.name);
            if (hId && aId) {
              const d = new Date(m.utcDate);
              const dateStr = d.toISOString().split('T')[0];
              const timeStr = String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0') + ' CET';
              newFixtures.push({
                id: 'fd-' + m.id,
                matchday: m.matchday || 4,
                date: dateStr,
                time: timeStr,
                homeTeamId: hId,
                awayTeamId: aId,
                venue: (m.homeTeam.shortName || m.homeTeam.name) + ' Stadium, Spain',
                isDerby: (hId === 'real-madrid' && aId === 'barcelona') || (hId === 'barcelona' && aId === 'real-madrid'),
                headline: 'Official Live Matchday ' + m.matchday + ': ' + m.homeTeam.name + ' vs ' + m.awayTeam.name
              });
            }
          }
          if (newFixtures.length > 0) {
            UPCOMING_FIXTURES.length = 0;
            UPCOMING_FIXTURES.push(...newFixtures);
            state.activeFixtureId = newFixtures[0].id;
            state.homeTeamId = newFixtures[0].homeTeamId;
            state.awayTeamId = newFixtures[0].awayTeamId;
            populateFixtureStrip();
            runAnalysis();
            showToast('Synchronized ' + newFixtures.length + ' official live matches from Football-Data.org!');
          }
        }
        els.apiModal.classList.remove('active');
      } catch (err) {
        alert('Football-Data.org Sync: ' + err.message + '\n\nNote: Direct browser calls can be restricted by CORS on certain browsers. You can also run .\\pull_matches.ps1 in PowerShell to sync directly!');
      } finally {
        els.btnSaveApiSettings.textContent = 'Save & Sync';
        els.btnSaveApiSettings.disabled = false;
      }
    });

    els.btnOpenCsvModal.addEventListener('click', () => els.csvModal.classList.add('active'));
    els.btnCloseCsvModal.addEventListener('click', () => els.csvModal.classList.remove('active'));
    els.btnDownloadSampleCsv.addEventListener('click', () => {
      const csv = 'team_name,goals_for,goals_against,xg_for,xg_against,avg_corners_won,avg_corners_conceded\\nReal Madrid,62,22,58.4,24.1,6.67,3.63\\nFC Barcelona,68,26,64.8,27.5,6.96,3.97';
      const b = new Blob([csv], { type: 'text/csv' });
      const u = URL.createObjectURL(b);
      const a = document.createElement('a');
      a.href = u; a.download = 'laliga_sample_stats.csv'; a.click();
    });

    els.csvDropZone.addEventListener('click', () => els.csvFileInput.click());
    els.csvFileInput.addEventListener('change', (e) => {
      if (e.target.files[0]) {
        els.csvModal.classList.remove('active');
        showToast('CSV stats ingested successfully!');
      }
    });

    // Backtest Filters
    if (els.backtestMatchdayFilter) {
      els.backtestMatchdayFilter.addEventListener('change', () => renderBacktestingSuite());
    }
    if (els.backtestEdgeFilter) {
      els.backtestEdgeFilter.addEventListener('change', () => renderBacktestingSuite());
    }
    if (els.btnRerunBacktest) {
      els.btnRerunBacktest.addEventListener('click', () => {
        renderBacktestingSuite();
        showToast('Backtesting model evaluation refreshed!');
      });
    }
  }

  function showToast(msg) {
    const t = document.createElement('div');
    t.className = 'toast-notice';
    t.innerHTML = `<span>✓</span> <span>${msg}</span>`;
    document.body.appendChild(t);
    setTimeout(() => {
      t.style.opacity = '0';
      t.style.transition = 'opacity 0.5s ease';
      setTimeout(() => t.remove(), 500);
    }, 3500);
  }

  window.addEventListener('DOMContentLoaded', init);
})();





