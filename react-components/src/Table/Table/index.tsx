/* eslint-disable react-refresh/only-export-components */
import type { FC } from 'react';

import classNames from 'classnames';

import Body from './Body';
import Head from './Head';
import styles from './index.module.less';
import Pagination from './Pagination';
import Summary from './Summary';
import LoadingDiv from '../../LoadingDiv';
import { TableContextHoc, useTableContext } from '../TableContext';

const Table: FC = () => {
    const tableContext = useTableContext();
    const { loading, className, style } = tableContext.handledProps;

    return (
        <LoadingDiv loadingMaxHeight={400} loading={loading} className={classNames(styles['table'], className)} style={style}>
            <Head />
            <Body />
            <Summary />
            <Pagination />
        </LoadingDiv>
    );
};

export default TableContextHoc(Table);
