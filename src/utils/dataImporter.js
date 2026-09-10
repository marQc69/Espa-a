/**
 * Data Importer & Live Football-Data.org Synchronization Utility
 *
 * Supports:
 * 1. Live automatic match fetching from https://api.football-data.org/v4/competitions/PD/matches
 * 2. Mapping Football-Data.org official club names to La Liga team IDs
 * 3. Dynamic updating of upcoming fixtures and dates
 * 4. Safe localStorage API key management
 * 5. CSV match log parsing & sample CSV template generation
 */

// Mapping of Football-Data.org team names and aliases to internal team IDs
export const FOOTBALL_DATA_NAME_MAP = {
  'real madrid cf': 'real-madrid',
  'real madrid': 'real-madrid',
  'fc barcelona': 'barcelona',
  'barcelona': 'barcelona',
  'club atlético de madrid': 'atletico-madrid',
  'atlético de madrid': 'atletico-madrid',
  'atletico madrid': 'atletico-madrid',
  'athletic club': 'athletic-club',
  'athletic bilbao': 'athletic-club',
  'villarreal cf': 'villarreal',
  'villarreal': 'villarreal',
  'real sociedad de fútbol': 'real-sociedad',
  'real sociedad': 'real-sociedad',
  'real betis balompié': 'real-betis',
  'real betis': 'real-betis',
  'girona fc': 'girona',
  'girona': 'girona',
  'rc celta de vigo': 'celta-vigo',
  'celta vigo': 'celta-vigo',
  'celta de vigo': 'celta-vigo',
  'rcd mallorca': 'mallorca',
  'mallorca': 'mallorca',
  'ca osasuna': 'osasuna',
  'osasuna': 'osasuna',
  'rayo vallecano de madrid': 'rayo-vallecano',
  'rayo vallecano': 'rayo-vallecano',
  'sevilla fc': 'sevilla',
  'sevilla': 'sevilla',
  'ud las palmas': 'las-palmas',
  'las palmas': 'las-palmas',
  'deportivo alavés': 'alaves',
  'alavés': 'alaves',
  'alaves': 'alaves',
  'getafe cf': 'getafe',
  'getafe': 'getafe',
  'valencia cf': 'valencia',
  'valencia': 'valencia',
  'rcd espanyol de barcelona': 'espanyol',
  'rcd espanyol': 'espanyol',
  'espanyol': 'espanyol',
  'cd leganés': 'leganes',
  'leganés': 'leganes',
  'leganes': 'leganes',
  'real valladolid cf': 'valladolid',
  'real valladolid': 'valladolid',
  'valladolid': 'valladolid'
};

export function resolveTeamId(teamName) {
  if (!teamName) return null;
  const clean = teamName.toLowerCase().trim();
  if (FOOTBALL_DATA_NAME_MAP[clean]) return FOOTBALL_DATA_NAME_MAP[clean];
  for (const [key, id] of Object.entries(FOOTBALL_DATA_NAME_MAP)) {
    if (clean.includes(key) || key.includes(clean)) return id;
  }
  return null;
}

/**
 * Fetches real live upcoming matches from Football-Data.org (Primera División: PD)
 */
export async function fetchLiveFootballDataMatches(apiKey) {
  if (!apiKey || !apiKey.trim()) {
    throw new Error('API Key is required to connect to Football-Data.org.');
  }

  const endpoint = 'https://api.football-data.org/v4/competitions/PD/matches?status=SCHEDULED';

  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'X-Auth-Token': apiKey.trim()
    }
  });

  if (!response.ok) {
    if (response.status === 403) {
      throw new Error('Invalid or expired Football-Data.org API Key (HTTP 403 Forbidden). Please check your token.');
    } else if (response.status === 429) {
      throw new Error('Football-Data.org rate limit reached (10 requests/minute on free tier). Please wait a moment.');
    }
    throw new Error(`Football-Data.org API error: HTTP ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  if (!data.matches || data.matches.length === 0) {
    throw new Error('No scheduled upcoming matches returned by Football-Data.org.');
  }

  // Transform matches into internal fixture format
  const mappedFixtures = [];

  for (let m of data.matches) {
    const homeName = m.homeTeam?.name;
    const awayName = m.awayTeam?.name;
    const homeId = resolveTeamId(homeName);
    const awayId = resolveTeamId(awayName);

    if (homeId && awayId) {
      const dateObj = new Date(m.utcDate);
      const yyyy = dateObj.getFullYear();
      const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
      const dd = String(dateObj.getDate()).padStart(2, '0');
      const hh = String(dateObj.getHours()).padStart(2, '0');
      const min = String(dateObj.getMinutes()).padStart(2, '0');

      const isDerby = (homeId === 'real-madrid' && awayId === 'barcelona') ||
                      (homeId === 'barcelona' && awayId === 'real-madrid') ||
                      (homeId === 'sevilla' && awayId === 'real-betis') ||
                      (homeId === 'real-betis' && awayId === 'sevilla') ||
                      (homeId === 'atletico-madrid' && awayId === 'real-madrid') ||
                      (homeId === 'girona' && awayId === 'barcelona');

      mappedFixtures.push({
        id: `fd-${m.id}`,
        matchday: m.matchday || 1,
        date: `${yyyy}-${mm}-${dd}`,
        time: `${hh}:${min} CET`,
        homeTeamId: homeId,
        awayTeamId: awayId,
        venue: `${m.homeTeam.shortName || homeName} Stadium, Spain`,
        isDerby: isDerby,
        headline: `Live Official Matchday ${m.matchday || ''}: ${homeName} vs ${awayName}`
      });
    }
  }

  return mappedFixtures;
}

export function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  const records = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = [];
    let inQuotes = false;
    let currentVal = '';

    for (let char of line) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(currentVal.trim());
        currentVal = '';
      } else {
        currentVal += char;
      }
    }
    values.push(currentVal.trim());

    const record = {};
    headers.forEach((header, idx) => {
      let val = values[idx] !== undefined ? values[idx] : '';
      if (!isNaN(val) && val !== '') {
        record[header] = Number(val);
      } else {
        record[header] = val;
      }
    });

    records.push(record);
  }

  return records;
}

export function generateSampleCsv() {
  const headers = [
    'team_name', 'played', 'won', 'drawn', 'lost', 'goals_for', 'goals_against',
    'xg_for', 'xg_against', 'avg_corners_won', 'avg_corners_conceded',
    'avg_shots_per_game', 'possession_pct', 'clean_sheets'
  ];

  const sampleRows = [
    ['Real Madrid', 27, 20, 4, 3, 62, 22, 58.4, 24.1, 6.67, 3.63, 17.4, 61.4, 13],
    ['FC Barcelona', 27, 19, 4, 4, 68, 26, 64.8, 27.5, 6.96, 3.97, 18.2, 65.8, 11],
    ['Atlético de Madrid', 27, 17, 6, 4, 48, 20, 47.9, 21.8, 5.48, 4.33, 14.3, 53.2, 14],
    ['Athletic Club', 27, 14, 8, 5, 44, 24, 46.2, 26.3, 6.04, 4.12, 15.1, 54.8, 12],
    ['Villarreal CF', 27, 13, 6, 8, 49, 41, 47.8, 40.2, 5.15, 5.19, 13.9, 51.5, 7]
  ];

  return [headers.join(','), ...sampleRows.map(r => r.join(','))].join('\n');
}

export function downloadSampleCsv() {
  const csv = generateSampleCsv();
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'laliga_2026_sample_stats.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export const API_SETTINGS_STORAGE_KEY = 'laliga_predictor_api_config';

export function getApiSettings() {
  try {
    const raw = localStorage.getItem(API_SETTINGS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : { provider: 'football-data', apiKey: '' };
  } catch (e) {
    return { provider: 'football-data', apiKey: '' };
  }
}

export function saveApiSettings(settings) {
  try {
    localStorage.setItem(API_SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    return true;
  } catch (e) {
    console.error('Failed to save API settings', e);
    return false;
  }
}
