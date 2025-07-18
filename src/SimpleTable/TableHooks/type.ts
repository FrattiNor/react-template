import type { TableDataItem } from '../TableTypes/type';
import type useTableInstance from './useTableInstance';

export type TableInstance<T extends TableDataItem> = ReturnType<typeof useTableInstance<T>>;
