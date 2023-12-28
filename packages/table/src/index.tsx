/* eslint-disable react-refresh/only-export-components */
import { TableContextHoc } from './TableContext';
import { FC } from 'react';
import Dom from './Dom';

const Table: FC = () => {
    return <Dom />;
};

export default TableContextHoc(Table);
export * from './type';
