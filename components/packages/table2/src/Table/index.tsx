/* eslint-disable react-refresh/only-export-components */
import { TableContextHoc, useTableContext } from '../TableContext';
import styles from './index.module.less';
import { useTheme } from '@pkg/theme';
import classNames from 'classnames';
import Loading from '@pkg/loading';
import { FC } from 'react';
import Head from './Head';
import Body from './Body';

const Table: FC = () => {
    const { theme } = useTheme();
    const tableContext = useTableContext();
    const { loading, className, style } = tableContext.props;

    return (
        <div className={classNames(styles['table'], styles[theme], className)} style={style}>
            <Head />
            <Body />
            <Loading loading={loading} />
        </div>
    );
};

export default TableContextHoc(Table);
