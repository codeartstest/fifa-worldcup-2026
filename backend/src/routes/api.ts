import { Router, Request, Response } from 'express';
import { fetchFromApi } from '../services/footballApi';
import { getOrFetch, getStale } from '../middleware/cache';
import { envelope, errorEnvelope } from '../utils/envelope';
import { config } from '../utils/config';
import * as fs from 'fs';
import * as path from 'path';

const router = Router();

function handleRequest(
  cacheKey: string,
  upstreamPath: string,
  upstreamParams: Record<string, string | number> | undefined,
  ttl: number,
  res: Response
): void {
  getOrFetch(cacheKey, () => fetchFromApi(upstreamPath, upstreamParams), ttl)
    .then(result => {
      res.json(envelope(result.data, { cached: result.cached, cacheTTL: result.cacheTTL }));
    })
    .catch(err => {
      const stale = getStale<any>(cacheKey);
      if (stale) {
        res.json(envelope(stale, { cached: true, cacheTTL: 0 }));
      } else {
        res.status(503).json(errorEnvelope(err.message || 'Upstream service unavailable', 503));
      }
    });
}

router.get('/fixtures', (req: Request, res: Response) => {
  const params: Record<string, string | number> = {};
  if (req.query.date) params.date = String(req.query.date);
  if (req.query.league) params.league = String(req.query.league);
  if (req.query.season) params.season = String(req.query.season);
  if (req.query.round) params.round = String(req.query.round);
  const cacheKey = `fixtures:${JSON.stringify(params)}`;
  handleRequest(cacheKey, '/fixtures', params, config.cacheTtlNonLive, res);
});

router.get('/matches/live', (_req: Request, res: Response) => {
  handleRequest('matches:live', '/fixtures', { live: 'all' }, config.cacheTtlLive, res);
});

router.get('/matches/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  handleRequest(`matches:${id}`, '/fixtures', { id }, config.cacheTtlNonLive, res);
});

router.get('/standings', (req: Request, res: Response) => {
  const params: Record<string, string | number> = { league: String(req.query.league || '1'), season: String(req.query.season || '2026') };
  const cacheKey = `standings:${params.league}:${params.season}`;
  handleRequest(cacheKey, '/standings', params, config.cacheTtlNonLive, res);
});

router.get('/bracket', (req: Request, res: Response) => {
  const params: Record<string, string | number> = { league: String(req.query.league || '1'), season: String(req.query.season || '2026') };
  const cacheKey = `bracket:${params.league}:${params.season}`;
  getOrFetch(cacheKey, async () => {
    const data = await fetchFromApi('/fixtures', { ...params, timezone: 'UTC' });
    const rounds = ['Round of 32', 'Round of 16', 'Quarter-finals', 'Semi-finals', 'Final', '3rd Place'];
    const bracketRounds = rounds
      .map(round => ({
        round,
        matches: (data.response || []).filter((f: any) => f.league.round === round)
      }))
      .filter(r => r.matches.length > 0);
    return bracketRounds;
  }, config.cacheTtlNonLive)
    .then(result => {
      res.json(envelope(result.data, { cached: result.cached, cacheTTL: result.cacheTTL }));
    })
    .catch(err => {
      const stale = getStale<any>(cacheKey);
      if (stale) {
        res.json(envelope(stale, { cached: true, cacheTTL: 0 }));
      } else {
        res.status(503).json(errorEnvelope(err.message || 'Upstream service unavailable', 503));
      }
    });
});

router.get('/players', (req: Request, res: Response) => {
  const params: Record<string, string | number> = { league: String(req.query.league || '1'), season: String(req.query.season || '2026') };
  const cacheKey = `players:${params.league}:${params.season}`;
  handleRequest(cacheKey, '/players', params, config.cacheTtlNonLive, res);
});

router.get('/teams/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  const cacheKey = `teams:${id}`;
  getOrFetch(cacheKey, async () => {
    const [teamRes, squadRes] = await Promise.all([
      fetchFromApi('/teams', { id }),
      fetchFromApi('/players', { team: id, season: 2026 })
    ]);
    return {
      ...teamRes.response?.[0]?.team,
      squad: squadRes.response?.map((p: any) => p.player) || []
    };
  }, config.cacheTtlNonLive)
    .then(result => {
      res.json(envelope(result.data, { cached: result.cached, cacheTTL: result.cacheTTL }));
    })
    .catch(err => {
      const stale = getStale<any>(cacheKey);
      if (stale) {
        res.json(envelope(stale, { cached: true, cacheTTL: 0 }));
      } else {
        res.status(503).json(errorEnvelope(err.message || 'Upstream service unavailable', 503));
      }
    });
});

router.get('/venues', (req: Request, res: Response) => {
  const params: Record<string, string | number> = {};
  if (req.query.search) params.search = String(req.query.search);
  const cacheKey = `venues:${JSON.stringify(params)}`;
  handleRequest(cacheKey, '/venues', Object.keys(params).length ? params : undefined, config.cacheTtlNonLive, res);
});

router.get('/news', (_req: Request, res: Response) => {
  const cacheKey = 'news:all';
  getOrFetch(cacheKey, () => {
    const newsPath = path.join(__dirname, '../../data/news.json');
    const raw = fs.readFileSync(newsPath, 'utf-8');
    return JSON.parse(raw);
  }, config.cacheTtlNonLive)
    .then(result => {
      res.json(envelope(result.data, { cached: result.cached, cacheTTL: result.cacheTTL }));
    })
    .catch(err => {
      res.status(500).json(errorEnvelope(err.message || 'Failed to load news', 500));
    });
});

router.get('/health', (_req: Request, res: Response) => {
  const { getCacheKeys } = require('../middleware/cache');
  res.json(envelope({ status: 'ok', uptime: process.uptime(), cacheKeys: getCacheKeys() }, { cached: false, cacheTTL: 0 }));
});

export default router;