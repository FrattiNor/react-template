/* eslint-disable react-refresh/only-export-components */
import { TableContextHoc, useTableContext } from '../TableContext';
import styles from './index.module.less';
import Pagination from './Pagination';
import { useTheme } from '@pkg/theme';
import classNames from 'classnames';
import Loading from '@pkg/loading';
import { FC } from 'react';
import Head from './Head';
import Body from './Body';

const Table: FC = () => {
    const { theme } = useTheme();
    const tableContext = useTableContext();
    const { loading } = tableContext.props;

    return (
        <div className={classNames(styles['table'], styles[theme])}>
            <Head />
            <Body />
            <Pagination />
            <Loading loading={loading} />
        </div>
    );
};

export default TableContextHoc(Table);
