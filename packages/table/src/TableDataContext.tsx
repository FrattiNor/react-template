/* eslint-disable react-refresh/only-export-components */
import { createContext, forwardRef, useContext } from 'react';
import useData from './useData';

type TableDataContextProps = ReturnType<typeof useData>;

const TableDataContext = createContext<TableDataContextProps>({} as TableDataContextProps);

// Hoc
export const TableDataContextHoc = <T,>(Component: T) => {
    const NextComponent = forwardRef((_props, ref) => {
        const value = useData();
        const _Component = Component as any;
        return <TableDataContext.Provider value={value}>{<_Component {..._props} ref={ref} />}</TableDataContext.Provider>;
    });

    return NextComponent as T;
};

// Hook
export const useTableDataContext = () => {
    return useContext(TableDataContext);
};
