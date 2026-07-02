import axios, { AxiosInstance } from 'axios';
import { config } from '../utils/config';

const footballApi: AxiosInstance = axios.create({
  baseURL: config.apiFootballBaseUrl,
  timeout: config.upstreamTimeoutMs,
  headers: {
    'x-apisports-key': config.apiFootballKey
  }
});

export async function fetchFromApi(path: string, params?: Record<string, string | number>): Promise<any> {
  const response = await footballApi.get(path, { params });
  return response.data;
}

export default footballApi;