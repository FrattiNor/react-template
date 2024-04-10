/* eslint-disable react-refresh/only-export-components */
import type { FC, ReactNode } from 'react';
import { createContext, useContext } from 'react';

import type { AnyObj, TableProps } from './type';
import useTable from './useTable';

type TableContextProps<T extends AnyObj> = ReturnType<typeof useTable<T>>;

type NextComponentType = <T extends AnyObj>(props: TableProps<T>) => ReactNode | null;

const TableContext = createContext<TableContextProps<any>>({} as TableContextProps<any>);

// Hoc
export const TableContextHoc = (Component: FC) => {
    const NextComponent: NextComponentType = (props) => {
        const value = useTable(props);
        return <TableContext.Provider value={value}>{<Component />}</TableContext.Provider>;
    };

    return NextComponent;
};

// Hook
export const useTableContext = <T extends AnyObj>() => {
    return useContext<TableContextProps<T>>(TableContext as any);
};
