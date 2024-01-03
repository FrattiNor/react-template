/* eslint-disable react-refresh/only-export-components */
import { FC, createContext, forwardRef, useContext, useImperativeHandle, ReactNode } from 'react';
import { useTableDataContext } from './TableDataContext';
import { AnyObj, TableProps, TableRef } from './type';
import useTable from './useTable';

type TableContextProps<T extends AnyObj> = ReturnType<typeof useTable<T>>;

type NextComponentType = <T extends AnyObj>(props: TableProps<T> & React.RefAttributes<TableRef>) => ReactNode | null;

const TableContext = createContext<TableContextProps<any>>({} as TableContextProps<any>);

// Hoc
export const TableContextHoc = (Component: FC) => {
    const NextComponent: NextComponentType = forwardRef((props, ref) => {
        const value = useTable(props);
        const dataContext = useTableDataContext();
        const tableRef = ref ?? dataContext.tableRef;

        useImperativeHandle(
            tableRef,
            () => ({
                headElement: value.headRef,
                bodyElement: value.bodyRef,
                scrollTo: (conf: ScrollToOptions) => value.bodyRef.current?.scrollTo(conf),
            }),
            [],
        );

        return <TableContext.Provider value={value}>{<Component />}</TableContext.Provider>;
    });

    return NextComponent;
};

// Hook
export const useTableContext = () => {
    return useContext(TableContext);
};
