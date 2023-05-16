type ReturnPagination = { total: number; pageSize: number; current: number; totalPages: number };

export type PartialKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type ListData<T> = { list: T[]; pagination: ReturnPagination };
