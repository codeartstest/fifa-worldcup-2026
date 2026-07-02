export interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta: {
    cached: boolean;
    cacheTTL: number;
    pagination?: { page: number; perPage: number; total: number };
  };
  error?: { code: number; message: string };
}

export function envelope<T>(data: T, meta: { cached: boolean; cacheTTL: number; pagination?: { page: number; perPage: number; total: number } }): ApiResponse<T> {
  return { success: true, data, meta };
}

export function errorEnvelope(message: string, code: number): ApiResponse<null> {
  return { success: false, data: null, meta: { cached: false, cacheTTL: 0 }, error: { code, message } };
}