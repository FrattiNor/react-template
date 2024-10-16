import { createContext, useContext } from 'react';

import { type AnyObj } from './type';

import type useTable from './useTable';

type TableContextProps<T extends AnyObj> = ReturnType<typeof useTable<T>>;

export const TableContext = createContext<TableContextProps<any>>({} as TableContextProps<any>);

// Hook
export const useTableContext = <T extends AnyObj>() => {
	return useContext<TableContextProps<T>>(TableContext as any);
};
