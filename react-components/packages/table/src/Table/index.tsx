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
    const tableContext = useTableContext();
    const { loading, className, style } = tableContext.props;
    const { theme, themeClassName, applyClassName } = useTheme();

    return (
        <div className={classNames(styles['table'], styles[theme], themeClassName, applyClassName, className)} style={style}>
            <Head />
            <Body />
            <Pagination />
            <Loading loading={loading} />
        </div>
    );
};

export default TableContextHoc(Table);
