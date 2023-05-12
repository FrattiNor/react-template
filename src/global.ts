export type ReturnPagination = { total: number; pageSize: number; current: number; totalPages: number };

export type ListData<T> = { list: T[]; pagination: ReturnPagination };

export type Pagination = Omit<ReturnPagination, 'total' | 'totalPages'>;
