import { useTableContext } from '../TableContext';
import styles from './index.module.less';
import Pagination from './Pagination';
import classNames from 'classnames';
import Loading from './Loading';
import { FC } from 'react';
import Head from './Head';
import Body from './Body';

const Table2: FC = () => {
    const { outerProps } = useTableContext();
    const { theme = 'light' } = outerProps;

    return (
        <div className={classNames(styles['table'], styles[theme])}>
            <Head />
            <Body />
            <Pagination />
            <Loading />
        </div>
    );
};

export default Table2;
