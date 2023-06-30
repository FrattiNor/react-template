/// <reference types="vite/client" />

type ReturnPagination = { total: number; pageSize: number; current: number; totalPages: number };

type PartialKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type ListData<T> = { list: T[]; pagination: ReturnPagination };

// range-picker value
type RangeValue<DateType> = [DateType | null, DateType | null] | null;
