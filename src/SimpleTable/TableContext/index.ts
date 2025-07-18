import { createContext, useContext } from 'react';
import type { TableDataItem } from '../TableTypes/type';
import type { TableInstance } from '../TableHooks/type';

export const TableContext = createContext({} as TableInstance<TableDataItem>);

export const useTableContext = <T extends TableDataItem>() => useContext(TableContext) as TableInstance<T>;
