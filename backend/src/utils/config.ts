import dotenv from 'dotenv';
dotenv.config();

export interface AppConfig {
  port: number;
  apiFootballKey: string;
  apiFootballBaseUrl: string;
  rateLimitPerMinute: number;
  cacheTtlNonLive: number;
  cacheTtlLive: number;
  corsOrigins: string;
  upstreamTimeoutMs: number;
}

export const config: AppConfig = {
  port: parseInt(process.env.PORT || '3000', 10),
  apiFootballKey: process.env.API_FOOTBALL_KEY || '',
  apiFootballBaseUrl: process.env.API_FOOTBALL_BASE_URL || 'https://v3.football.api-sports.io',
  rateLimitPerMinute: parseInt(process.env.RATE_LIMIT_PER_MINUTE || '100', 10),
  cacheTtlNonLive: parseInt(process.env.CACHE_TTL_NON_LIVE || '300', 10),
  cacheTtlLive: parseInt(process.env.CACHE_TTL_LIVE || '30', 10),
  corsOrigins: process.env.CORS_ORIGINS || 'http://localhost:4200',
  upstreamTimeoutMs: parseInt(process.env.UPSTREAM_TIMEOUT_MS || '5000', 10)
};