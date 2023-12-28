/* eslint-disable react-refresh/only-export-components */
import { FC, createContext, forwardRef, useContext } from 'react';
import useData from './useData';

type TableDataContextProps = ReturnType<typeof useData>;

const TableDataContext = createContext<TableDataContextProps>({} as TableDataContextProps);

// Hoc
export const TableDataContextHoc = (Component: FC) => {
    const NextComponent = forwardRef((_props) => {
        const value = useData();
        return <TableDataContext.Provider value={value}>{<Component {..._props} />}</TableDataContext.Provider>;
    });

    return NextComponent;
};

// Hook
export const useTableDataContext = () => {
    return useContext(TableDataContext);
};
