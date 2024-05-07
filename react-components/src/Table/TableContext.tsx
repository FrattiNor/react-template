/* eslint-disable react-refresh/only-export-components */
import type { FC, ReactNode } from 'react';
import { createContext, forwardRef, useContext, useImperativeHandle } from 'react';

import useTable from './useTable';

import type { AnyObj, TableProps, TableRef } from './type';

type TableContextProps<T extends AnyObj> = ReturnType<typeof useTable<T>>;

type NextComponentType = <T extends AnyObj>(props: TableProps<T> & React.RefAttributes<TableRef>) => ReactNode | null;

const TableContext = createContext<TableContextProps<any>>({} as TableContextProps<any>);

// Hoc
export const TableContextHoc = (Component: FC) => {
    const NextComponent: NextComponentType = forwardRef((props, ref) => {
        const value = useTable(props);

        useImperativeHandle(
            ref,
            () => ({
                scrollTo: (options: { left?: number; top?: number; behavior?: 'auto' | 'instant' | 'smooth' }) => {
                    if (value.bodyRef.current) value.bodyRef.current.scrollTo(options);
                },
            }),
            [],
        );

        return <TableContext.Provider value={value}>{<Component />}</TableContext.Provider>;
    });

    return NextComponent;
};

// Hook
export const useTableContext = <T extends AnyObj>() => {
    return useContext<TableContextProps<T>>(TableContext as any);
};
