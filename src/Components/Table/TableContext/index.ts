import { createContext, useContext } from 'react';
import useTableInstance from './useTableInstance';

const TableContext = createContext({} as ReturnType<typeof useTableInstance>);

const useTableContext = () => useContext(TableContext);

export { TableContext, useTableContext, useTableInstance };
