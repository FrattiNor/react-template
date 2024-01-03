import styles from './index.module.less';
import Pagination from './Pagination';
import { useTheme } from '@pkg/theme';
import classNames from 'classnames';
import Loading from './Loading';
import { FC } from 'react';
import Head from './Head';
import Body from './Body';

const Table: FC = () => {
    const { theme } = useTheme();

    return (
        <div className={classNames(styles['table'], styles[theme])}>
            <Head />
            <Body />
            <Pagination />
            <Loading />
        </div>
    );
};

export default Table;
