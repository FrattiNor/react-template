/* eslint-disable react-refresh/only-export-components */
import { FC } from 'react';

import Loading from '@pkg/loading';
import { useTheme } from '@pkg/theme';
import classNames from 'classnames';

import Body from './Body';
import Head from './Head';
import styles from './index.module.less';
import Pagination from './Pagination';
import { TableContextHoc, useTableContext } from '../TableContext';

const Table: FC = () => {
    const tableContext = useTableContext();
    const { loading, className, style } = tableContext.props;
    const { theme, themeClassName, applyTheme } = useTheme();

    return (
        <div className={classNames(styles['table'], styles[theme], themeClassName, applyTheme, className)} style={style}>
            <Head />
            <Body />
            <Pagination />
            <Loading loading={loading} />
        </div>
    );
};

export default TableContextHoc(Table);
