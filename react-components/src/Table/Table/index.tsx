/* eslint-disable react-refresh/only-export-components */
import type { FC } from 'react';

import classNames from 'classnames';

import Body from './Body';
import Head from './Head';
import styles from './index.module.less';
import Pagination from './Pagination';
import Loading from '../../Loading';
import { TableContextHoc, useTableContext } from '../TableContext';

const Table: FC = () => {
    const tableContext = useTableContext();
    const { loading, className, style } = tableContext.handledProps;

    return (
        <div className={classNames(styles['table'], className)} style={style}>
            <Head />
            <Body />
            <Pagination />
            <Loading loading={loading} />
        </div>
    );
};

export default TableContextHoc(Table);
