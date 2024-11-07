export type ApiResponse<T> = 
| { data: T | null, error?: string | null }
| { data?: T | null, error: string | null };
