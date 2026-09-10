/**
 * La Liga 2026 Season Complete 20-Team Statistical Database
 * Features advanced metrics: xG, xGA, shot volume, corners won/conceded,
 * crossing frequency, possession %, PPDA, home/away splits, and recent form.
 */

export const LA_LIGA_TEAMS = {
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
      played: 14,
      won: 12,
      drawn: 1,
      lost: 1,
      gf: 38,
      ga: 10,
      xG: 34.2,
      xGA: 10.8,
      cornersFor: 7.4,
      cornersAgainst: 3.1
    },
    awayRecord: {
      played: 13,
      won: 8,
      drawn: 3,
      lost: 2,
      gf: 24,
      ga: 12,
      xG: 24.2,
      xGA: 13.3,
      cornersFor: 5.9,
      cornersAgainst: 4.2
    },
    corners: {
      avgWon: 6.67,
      avgConceded: 3.63,
      totalWon: 180,
      totalConceded: 98,
      over8_5_pct: 68,
      over9_5_pct: 54,
      over10_5_pct: 42
    },
    shots: {
      avgShotsPerMatch: 17.4,
      avgShotsConceded: 9.2,
      shotsOnTargetPerMatch: 6.8,
      shotConversionPct: 13.2
    },
    crossing: {
      crossesPerMatch: 18.2,
      crossAccuracyPct: 29.5,
      wingPlayBiasPct: 62
    },
    tacticalStyle: {
      possessionPct: 61.4,
      passAccuracyPct: 89.2,
      fieldTiltPct: 68.5,
      ppda: 9.8,
      directness: 34.2,
      cleanSheets: 13,
      bttsPct: 44
    },
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
      played: 13,
      won: 11,
      drawn: 1,
      lost: 1,
      gf: 42,
      ga: 12,
      xG: 39.5,
      xGA: 12.1,
      cornersFor: 7.8,
      cornersAgainst: 3.4
    },
    awayRecord: {
      played: 14,
      won: 8,
      drawn: 3,
      lost: 3,
      gf: 26,
      ga: 14,
      xG: 25.3,
      xGA: 15.4,
      cornersFor: 6.2,
      cornersAgainst: 4.5
    },
    corners: {
      avgWon: 6.96,
      avgConceded: 3.97,
      totalWon: 188,
      totalConceded: 107,
      over8_5_pct: 72,
      over9_5_pct: 58,
      over10_5_pct: 46
    },
    shots: {
      avgShotsPerMatch: 18.2,
      avgShotsConceded: 10.1,
      shotsOnTargetPerMatch: 7.2,
      shotConversionPct: 13.8
    },
    crossing: {
      crossesPerMatch: 20.4,
      crossAccuracyPct: 31.2,
      wingPlayBiasPct: 70
    },
    tacticalStyle: {
      possessionPct: 65.8,
      passAccuracyPct: 88.7,
      fieldTiltPct: 74.2,
      ppda: 8.2,
      directness: 31.0,
      cleanSheets: 11,
      bttsPct: 52
    },
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
      played: 14,
      won: 11,
      drawn: 2,
      lost: 1,
      gf: 31,
      ga: 9,
      xG: 29.4,
      xGA: 9.8,
      cornersFor: 6.1,
      cornersAgainst: 3.8
    },
    awayRecord: {
      played: 13,
      won: 6,
      drawn: 4,
      lost: 3,
      gf: 17,
      ga: 11,
      xG: 18.5,
      xGA: 12.0,
      cornersFor: 4.8,
      cornersAgainst: 4.9
    },
    corners: {
      avgWon: 5.48,
      avgConceded: 4.33,
      totalWon: 148,
      totalConceded: 117,
      over8_5_pct: 60,
      over9_5_pct: 46,
      over10_5_pct: 35
    },
    shots: {
      avgShotsPerMatch: 14.3,
      avgShotsConceded: 9.5,
      shotsOnTargetPerMatch: 5.5,
      shotConversionPct: 12.4
    },
    crossing: {
      crossesPerMatch: 16.5,
      crossAccuracyPct: 27.8,
      wingPlayBiasPct: 58
    },
    tacticalStyle: {
      possessionPct: 53.2,
      passAccuracyPct: 85.1,
      fieldTiltPct: 56.4,
      ppda: 11.2,
      directness: 39.5,
      cleanSheets: 14,
      bttsPct: 37
    },
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
      played: 14,
      won: 9,
      drawn: 4,
      lost: 1,
      gf: 28,
      ga: 10,
      xG: 28.1,
      xGA: 11.2,
      cornersFor: 6.8,
      cornersAgainst: 3.5
    },
    awayRecord: {
      played: 13,
      won: 5,
      drawn: 4,
      lost: 4,
      gf: 16,
      ga: 14,
      xG: 18.1,
      xGA: 15.1,
      cornersFor: 5.2,
      cornersAgainst: 4.8
    },
    corners: {
      avgWon: 6.04,
      avgConceded: 4.12,
      totalWon: 163,
      totalConceded: 111,
      over8_5_pct: 64,
      over9_5_pct: 52,
      over10_5_pct: 39
    },
    shots: {
      avgShotsPerMatch: 15.1,
      avgShotsConceded: 9.8,
      shotsOnTargetPerMatch: 5.3,
      shotConversionPct: 10.8
    },
    crossing: {
      crossesPerMatch: 22.8,
      crossAccuracyPct: 30.1,
      wingPlayBiasPct: 74
    },
    tacticalStyle: {
      possessionPct: 54.8,
      passAccuracyPct: 83.4,
      fieldTiltPct: 61.2,
      ppda: 8.9,
      directness: 43.1,
      cleanSheets: 12,
      bttsPct: 41
    },
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
      played: 13,
      won: 7,
      drawn: 3,
      lost: 3,
      gf: 28,
      ga: 19,
      xG: 26.5,
      xGA: 18.2,
      cornersFor: 5.7,
      cornersAgainst: 4.8
    },
    awayRecord: {
      played: 14,
      won: 6,
      drawn: 3,
      lost: 5,
      gf: 21,
      ga: 22,
      xG: 21.3,
      xGA: 22.0,
      cornersFor: 4.6,
      cornersAgainst: 5.5
    },
    corners: {
      avgWon: 5.15,
      avgConceded: 5.19,
      totalWon: 139,
      totalConceded: 140,
      over8_5_pct: 66,
      over9_5_pct: 53,
      over10_5_pct: 44
    },
    shots: {
      avgShotsPerMatch: 13.9,
      avgShotsConceded: 12.8,
      shotsOnTargetPerMatch: 5.4,
      shotConversionPct: 13.1
    },
    crossing: {
      crossesPerMatch: 17.1,
      crossAccuracyPct: 26.4,
      wingPlayBiasPct: 61
    },
    tacticalStyle: {
      possessionPct: 51.5,
      passAccuracyPct: 84.6,
      fieldTiltPct: 52.0,
      ppda: 11.8,
      directness: 44.0,
      cleanSheets: 7,
      bttsPct: 70
    },
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
      played: 14,
      won: 7,
      drawn: 3,
      lost: 4,
      gf: 19,
      ga: 12,
      xG: 21.6,
      xGA: 12.8,
      cornersFor: 5.6,
      cornersAgainst: 3.9
    },
    awayRecord: {
      played: 13,
      won: 5,
      drawn: 4,
      lost: 4,
      gf: 14,
      ga: 13,
      xG: 16.8,
      xGA: 14.1,
      cornersFor: 4.8,
      cornersAgainst: 4.7
    },
    corners: {
      avgWon: 5.22,
      avgConceded: 4.29,
      totalWon: 141,
      totalConceded: 116,
      over8_5_pct: 56,
      over9_5_pct: 44,
      over10_5_pct: 32
    },
    shots: {
      avgShotsPerMatch: 13.1,
      avgShotsConceded: 9.7,
      shotsOnTargetPerMatch: 4.6,
      shotConversionPct: 9.4
    },
    crossing: {
      crossesPerMatch: 19.3,
      crossAccuracyPct: 28.1,
      wingPlayBiasPct: 65
    },
    tacticalStyle: {
      possessionPct: 56.7,
      passAccuracyPct: 83.9,
      fieldTiltPct: 60.1,
      ppda: 9.4,
      directness: 36.8,
      cleanSheets: 11,
      bttsPct: 41
    },
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
      played: 14,
      won: 7,
      drawn: 4,
      lost: 3,
      gf: 22,
      ga: 14,
      xG: 23.4,
      xGA: 15.2,
      cornersFor: 5.5,
      cornersAgainst: 4.4
    },
    awayRecord: {
      played: 13,
      won: 4,
      drawn: 4,
      lost: 5,
      gf: 13,
      ga: 17,
      xG: 16.1,
      xGA: 18.8,
      cornersFor: 4.4,
      cornersAgainst: 5.2
    },
    corners: {
      avgWon: 4.96,
      avgConceded: 4.78,
      totalWon: 134,
      totalConceded: 129,
      over8_5_pct: 58,
      over9_5_pct: 46,
      over10_5_pct: 35
    },
    shots: {
      avgShotsPerMatch: 13.4,
      avgShotsConceded: 11.2,
      shotsOnTargetPerMatch: 4.8,
      shotConversionPct: 9.7
    },
    crossing: {
      crossesPerMatch: 18.6,
      crossAccuracyPct: 26.9,
      wingPlayBiasPct: 63
    },
    tacticalStyle: {
      possessionPct: 53.8,
      passAccuracyPct: 83.2,
      fieldTiltPct: 55.4,
      ppda: 11.4,
      directness: 39.8,
      cleanSheets: 8,
      bttsPct: 52
    },
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
      played: 13,
      won: 7,
      drawn: 2,
      lost: 4,
      gf: 24,
      ga: 17,
      xG: 23.5,
      xGA: 16.8,
      cornersFor: 5.3,
      cornersAgainst: 4.6
    },
    awayRecord: {
      played: 14,
      won: 4,
      drawn: 4,
      lost: 6,
      gf: 15,
      ga: 20,
      xG: 17.7,
      xGA: 21.8,
      cornersFor: 4.3,
      cornersAgainst: 5.6
    },
    corners: {
      avgWon: 4.81,
      avgConceded: 5.11,
      totalWon: 130,
      totalConceded: 138,
      over8_5_pct: 62,
      over9_5_pct: 49,
      over10_5_pct: 38
    },
    shots: {
      avgShotsPerMatch: 12.8,
      avgShotsConceded: 11.9,
      shotsOnTargetPerMatch: 4.7,
      shotConversionPct: 11.2
    },
    crossing: {
      crossesPerMatch: 16.4,
      crossAccuracyPct: 28.5,
      wingPlayBiasPct: 59
    },
    tacticalStyle: {
      possessionPct: 55.4,
      passAccuracyPct: 85.0,
      fieldTiltPct: 57.1,
      ppda: 10.9,
      directness: 35.4,
      cleanSheets: 7,
      bttsPct: 59
    },
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
      played: 14,
      won: 7,
      drawn: 3,
      lost: 4,
      gf: 25,
      ga: 18,
      xG: 23.9,
      xGA: 18.5,
      cornersFor: 5.6,
      cornersAgainst: 4.8
    },
    awayRecord: {
      played: 13,
      won: 3,
      drawn: 4,
      lost: 6,
      gf: 16,
      ga: 22,
      xG: 15.9,
      xGA: 23.0,
      cornersFor: 4.5,
      cornersAgainst: 5.7
    },
    corners: {
      avgWon: 5.07,
      avgConceded: 5.26,
      totalWon: 137,
      totalConceded: 142,
      over8_5_pct: 65,
      over9_5_pct: 51,
      over10_5_pct: 40
    },
    shots: {
      avgShotsPerMatch: 12.6,
      avgShotsConceded: 12.4,
      shotsOnTargetPerMatch: 4.5,
      shotConversionPct: 12.0
    },
    crossing: {
      crossesPerMatch: 17.5,
      crossAccuracyPct: 27.2,
      wingPlayBiasPct: 64
    },
    tacticalStyle: {
      possessionPct: 53.1,
      passAccuracyPct: 82.8,
      fieldTiltPct: 53.8,
      ppda: 11.1,
      directness: 41.2,
      cleanSheets: 5,
      bttsPct: 67
    },
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
      played: 14,
      won: 6,
      drawn: 4,
      lost: 4,
      gf: 16,
      ga: 13,
      xG: 18.2,
      xGA: 14.1,
      cornersFor: 5.0,
      cornersAgainst: 4.4
    },
    awayRecord: {
      played: 13,
      won: 4,
      drawn: 2,
      lost: 7,
      gf: 12,
      ga: 17,
      xG: 13.2,
      xGA: 18.7,
      cornersFor: 3.8,
      cornersAgainst: 5.6
    },
    corners: {
      avgWon: 4.41,
      avgConceded: 4.96,
      totalWon: 119,
      totalConceded: 134,
      over8_5_pct: 54,
      over9_5_pct: 42,
      over10_5_pct: 31
    },
    shots: {
      avgShotsPerMatch: 11.2,
      avgShotsConceded: 11.5,
      shotsOnTargetPerMatch: 3.8,
      shotConversionPct: 9.3
    },
    crossing: {
      crossesPerMatch: 20.8,
      crossAccuracyPct: 29.8,
      wingPlayBiasPct: 71
    },
    tacticalStyle: {
      possessionPct: 46.2,
      passAccuracyPct: 78.9,
      fieldTiltPct: 45.1,
      ppda: 13.4,
      directness: 48.2,
      cleanSheets: 8,
      bttsPct: 44
    },
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
      played: 14,
      won: 7,
      drawn: 3,
      lost: 4,
      gf: 22,
      ga: 18,
      xG: 21.0,
      xGA: 17.5,
      cornersFor: 5.3,
      cornersAgainst: 4.5
    },
    awayRecord: {
      played: 13,
      won: 2,
      drawn: 5,
      lost: 6,
      gf: 12,
      ga: 21,
      xG: 13.9,
      xGA: 21.7,
      cornersFor: 4.1,
      cornersAgainst: 5.4
    },
    corners: {
      avgWon: 4.74,
      avgConceded: 4.93,
      totalWon: 128,
      totalConceded: 133,
      over8_5_pct: 57,
      over9_5_pct: 44,
      over10_5_pct: 34
    },
    shots: {
      avgShotsPerMatch: 11.8,
      avgShotsConceded: 12.2,
      shotsOnTargetPerMatch: 4.0,
      shotConversionPct: 10.7
    },
    crossing: {
      crossesPerMatch: 18.9,
      crossAccuracyPct: 27.5,
      wingPlayBiasPct: 67
    },
    tacticalStyle: {
      possessionPct: 48.9,
      passAccuracyPct: 79.5,
      fieldTiltPct: 48.2,
      ppda: 12.1,
      directness: 46.5,
      cleanSheets: 7,
      bttsPct: 56
    },
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
      played: 13,
      won: 5,
      drawn: 4,
      lost: 4,
      gf: 17,
      ga: 15,
      xG: 18.0,
      xGA: 15.2,
      cornersFor: 5.8,
      cornersAgainst: 4.5
    },
    awayRecord: {
      played: 14,
      won: 4,
      drawn: 4,
      lost: 6,
      gf: 12,
      ga: 18,
      xG: 14.1,
      xGA: 19.3,
      cornersFor: 4.4,
      cornersAgainst: 5.3
    },
    corners: {
      avgWon: 5.07,
      avgConceded: 4.93,
      totalWon: 137,
      totalConceded: 133,
      over8_5_pct: 61,
      over9_5_pct: 48,
      over10_5_pct: 37
    },
    shots: {
      avgShotsPerMatch: 12.5,
      avgShotsConceded: 11.6,
      shotsOnTargetPerMatch: 4.1,
      shotConversionPct: 8.6
    },
    crossing: {
      crossesPerMatch: 21.3,
      crossAccuracyPct: 28.2,
      wingPlayBiasPct: 69
    },
    tacticalStyle: {
      possessionPct: 49.6,
      passAccuracyPct: 79.1,
      fieldTiltPct: 51.5,
      ppda: 8.7,
      directness: 44.2,
      cleanSheets: 7,
      bttsPct: 48
    },
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
      played: 14,
      won: 6,
      drawn: 3,
      lost: 5,
      gf: 19,
      ga: 17,
      xG: 21.0,
      xGA: 16.8,
      cornersFor: 5.7,
      cornersAgainst: 4.3
    },
    awayRecord: {
      played: 13,
      won: 3,
      drawn: 4,
      lost: 6,
      gf: 13,
      ga: 21,
      xG: 14.6,
      xGA: 21.1,
      cornersFor: 4.7,
      cornersAgainst: 5.6
    },
    corners: {
      avgWon: 5.22,
      avgConceded: 4.93,
      totalWon: 141,
      totalConceded: 133,
      over8_5_pct: 63,
      over9_5_pct: 50,
      over10_5_pct: 38
    },
    shots: {
      avgShotsPerMatch: 13.0,
      avgShotsConceded: 12.1,
      shotsOnTargetPerMatch: 4.4,
      shotConversionPct: 9.1
    },
    crossing: {
      crossesPerMatch: 22.1,
      crossAccuracyPct: 27.6,
      wingPlayBiasPct: 72
    },
    tacticalStyle: {
      possessionPct: 54.2,
      passAccuracyPct: 83.1,
      fieldTiltPct: 56.8,
      ppda: 10.5,
      directness: 37.9,
      cleanSheets: 6,
      bttsPct: 56
    },
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
      played: 13,
      won: 5,
      drawn: 4,
      lost: 4,
      gf: 19,
      ga: 17,
      xG: 18.2,
      xGA: 18.0,
      cornersFor: 4.5,
      cornersAgainst: 5.1
    },
    awayRecord: {
      played: 14,
      won: 3,
      drawn: 4,
      lost: 7,
      gf: 14,
      ga: 25,
      xG: 13.6,
      xGA: 25.1,
      cornersFor: 3.6,
      cornersAgainst: 6.2
    },
    corners: {
      avgWon: 4.04,
      avgConceded: 5.67,
      totalWon: 109,
      totalConceded: 153,
      over8_5_pct: 59,
      over9_5_pct: 47,
      over10_5_pct: 37
    },
    shots: {
      avgShotsPerMatch: 10.9,
      avgShotsConceded: 13.4,
      shotsOnTargetPerMatch: 3.7,
      shotConversionPct: 11.2
    },
    crossing: {
      crossesPerMatch: 14.8,
      crossAccuracyPct: 26.1,
      wingPlayBiasPct: 56
    },
    tacticalStyle: {
      possessionPct: 52.6,
      passAccuracyPct: 83.7,
      fieldTiltPct: 50.8,
      ppda: 12.7,
      directness: 35.1,
      cleanSheets: 5,
      bttsPct: 63
    },
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
      played: 14,
      won: 6,
      drawn: 3,
      lost: 5,
      gf: 18,
      ga: 16,
      xG: 19.5,
      xGA: 15.8,
      cornersFor: 5.4,
      cornersAgainst: 4.5
    },
    awayRecord: {
      played: 13,
      won: 2,
      drawn: 3,
      lost: 8,
      gf: 11,
      ga: 22,
      xG: 13.0,
      xGA: 21.6,
      cornersFor: 4.0,
      cornersAgainst: 5.7
    },
    corners: {
      avgWon: 4.74,
      avgConceded: 5.07,
      totalWon: 128,
      totalConceded: 137,
      over8_5_pct: 59,
      over9_5_pct: 46,
      over10_5_pct: 35
    },
    shots: {
      avgShotsPerMatch: 11.9,
      avgShotsConceded: 11.8,
      shotsOnTargetPerMatch: 3.9,
      shotConversionPct: 9.1
    },
    crossing: {
      crossesPerMatch: 21.6,
      crossAccuracyPct: 29.1,
      wingPlayBiasPct: 73
    },
    tacticalStyle: {
      possessionPct: 45.1,
      passAccuracyPct: 76.5,
      fieldTiltPct: 46.2,
      ppda: 11.0,
      directness: 48.9,
      cleanSheets: 6,
      bttsPct: 52
    },
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
      played: 14,
      won: 5,
      drawn: 6,
      lost: 3,
      gf: 13,
      ga: 10,
      xG: 14.8,
      xGA: 11.2,
      cornersFor: 4.4,
      cornersAgainst: 3.9
    },
    awayRecord: {
      played: 13,
      won: 2,
      drawn: 3,
      lost: 8,
      gf: 7,
      ga: 16,
      xG: 9.7,
      xGA: 17.0,
      cornersFor: 3.5,
      cornersAgainst: 5.1
    },
    corners: {
      avgWon: 3.96,
      avgConceded: 4.48,
      totalWon: 107,
      totalConceded: 121,
      over8_5_pct: 44,
      over9_5_pct: 33,
      over10_5_pct: 22
    },
    shots: {
      avgShotsPerMatch: 10.2,
      avgShotsConceded: 10.5,
      shotsOnTargetPerMatch: 3.2,
      shotConversionPct: 7.2
    },
    crossing: {
      crossesPerMatch: 19.5,
      crossAccuracyPct: 25.4,
      wingPlayBiasPct: 68
    },
    tacticalStyle: {
      possessionPct: 43.8,
      passAccuracyPct: 73.2,
      fieldTiltPct: 41.6,
      ppda: 8.5,
      directness: 52.1,
      cleanSheets: 9,
      bttsPct: 37
    },
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
      played: 14,
      won: 5,
      drawn: 5,
      lost: 4,
      gf: 18,
      ga: 17,
      xG: 18.5,
      xGA: 16.2,
      cornersFor: 5.1,
      cornersAgainst: 4.8
    },
    awayRecord: {
      played: 13,
      won: 1,
      drawn: 5,
      lost: 7,
      gf: 10,
      ga: 22,
      xG: 12.5,
      xGA: 23.3,
      cornersFor: 3.8,
      cornersAgainst: 5.8
    },
    corners: {
      avgWon: 4.48,
      avgConceded: 5.26,
      totalWon: 121,
      totalConceded: 142,
      over8_5_pct: 61,
      over9_5_pct: 47,
      over10_5_pct: 36
    },
    shots: {
      avgShotsPerMatch: 10.8,
      avgShotsConceded: 12.6,
      shotsOnTargetPerMatch: 3.6,
      shotConversionPct: 9.6
    },
    crossing: {
      crossesPerMatch: 17.8,
      crossAccuracyPct: 26.5,
      wingPlayBiasPct: 62
    },
    tacticalStyle: {
      possessionPct: 45.8,
      passAccuracyPct: 78.4,
      fieldTiltPct: 45.0,
      ppda: 11.5,
      directness: 46.2,
      cleanSheets: 5,
      bttsPct: 56
    },
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
      played: 14,
      won: 5,
      drawn: 4,
      lost: 5,
      gf: 17,
      ga: 19,
      xG: 16.9,
      xGA: 18.8,
      cornersFor: 4.8,
      cornersAgainst: 5.0
    },
    awayRecord: {
      played: 13,
      won: 1,
      drawn: 3,
      lost: 9,
      gf: 8,
      ga: 25,
      xG: 11.0,
      xGA: 26.3,
      cornersFor: 3.5,
      cornersAgainst: 6.1
    },
    corners: {
      avgWon: 4.19,
      avgConceded: 5.52,
      totalWon: 113,
      totalConceded: 149,
      over8_5_pct: 61,
      over9_5_pct: 49,
      over10_5_pct: 38
    },
    shots: {
      avgShotsPerMatch: 10.4,
      avgShotsConceded: 13.9,
      shotsOnTargetPerMatch: 3.4,
      shotConversionPct: 8.9
    },
    crossing: {
      crossesPerMatch: 18.2,
      crossAccuracyPct: 25.8,
      wingPlayBiasPct: 66
    },
    tacticalStyle: {
      possessionPct: 43.1,
      passAccuracyPct: 76.9,
      fieldTiltPct: 41.8,
      ppda: 12.3,
      directness: 49.5,
      cleanSheets: 4,
      bttsPct: 56
    },
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
      played: 13,
      won: 4,
      drawn: 4,
      lost: 5,
      gf: 13,
      ga: 16,
      xG: 13.9,
      xGA: 16.0,
      cornersFor: 4.2,
      cornersAgainst: 4.8
    },
    awayRecord: {
      played: 14,
      won: 1,
      drawn: 5,
      lost: 8,
      gf: 9,
      ga: 21,
      xG: 9.9,
      xGA: 22.6,
      cornersFor: 3.4,
      cornersAgainst: 5.7
    },
    corners: {
      avgWon: 3.78,
      avgConceded: 5.26,
      totalWon: 102,
      totalConceded: 142,
      over8_5_pct: 54,
      over9_5_pct: 41,
      over10_5_pct: 29
    },
    shots: {
      avgShotsPerMatch: 9.6,
      avgShotsConceded: 12.9,
      shotsOnTargetPerMatch: 3.1,
      shotConversionPct: 8.5
    },
    crossing: {
      crossesPerMatch: 16.0,
      crossAccuracyPct: 24.8,
      wingPlayBiasPct: 60
    },
    tacticalStyle: {
      possessionPct: 42.5,
      passAccuracyPct: 76.1,
      fieldTiltPct: 39.5,
      ppda: 13.1,
      directness: 51.0,
      cleanSheets: 6,
      bttsPct: 44
    },
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
      played: 14,
      won: 3,
      drawn: 4,
      lost: 7,
      gf: 11,
      ga: 21,
      xG: 13.2,
      xGA: 23.4,
      cornersFor: 4.1,
      cornersAgainst: 5.3
    },
    awayRecord: {
      played: 13,
      won: 1,
      drawn: 1,
      lost: 11,
      gf: 7,
      ga: 34,
      xG: 8.4,
      xGA: 29.8,
      cornersFor: 3.2,
      cornersAgainst: 6.8
    },
    corners: {
      avgWon: 3.67,
      avgConceded: 6.04,
      totalWon: 99,
      totalConceded: 163,
      over8_5_pct: 64,
      over9_5_pct: 53,
      over10_5_pct: 44
    },
    shots: {
      avgShotsPerMatch: 9.1,
      avgShotsConceded: 15.2,
      shotsOnTargetPerMatch: 2.8,
      shotConversionPct: 7.3
    },
    crossing: {
      crossesPerMatch: 15.5,
      crossAccuracyPct: 23.9,
      wingPlayBiasPct: 58
    },
    tacticalStyle: {
      possessionPct: 44.0,
      passAccuracyPct: 76.8,
      fieldTiltPct: 38.2,
      ppda: 13.8,
      directness: 48.0,
      cleanSheets: 3,
      bttsPct: 48
    },
    form: ['L', 'L', 'L', 'L', 'L'],
    recentMatches: [
      { opp: 'Athletic Club', gf: 1, ga: 4, xg: 0.8, xga: 2.9, home: false, result: 'L' },
      { opp: 'Celta Vigo', gf: 1, ga: 3, xg: 0.9, xga: 2.4, home: true, result: 'L' },
      { opp: 'Osasuna', gf: 0, ga: 1, xg: 0.7, xga: 1.5, home: false, result: 'L' },
      { opp: 'Sevilla', gf: 1, ga: 2, xg: 0.9, xga: 2.1, home: false, result: 'L' },
      { opp: 'Alavés', gf: 2, ga: 3, xg: 1.5, xga: 2.1, home: false, result: 'L' }
    ]
  }
};

export const LEAGUE_AVERAGES = {
  goalsPerMatch: 2.62,
  homeGoalsPerMatch: 1.48,
  awayGoalsPerMatch: 1.14,
  homeWinPct: 44.1,
  drawPct: 26.8,
  awayWinPct: 29.1,
  cornersPerMatch: 9.72,
  homeCornersPerMatch: 5.41,
  awayCornersPerMatch: 4.31,
  shotsPerMatch: 25.6,
  shotsOnTargetPerMatch: 8.8,
  homeAdvantageFactor: 1.28,
  dixonColesRho: -0.11
};
