import styles from './index.module.less';
import Loading from './Loading';
import { FC } from 'react';
import Head from './Head';
import Body from './Body';

const Table2: FC = () => {
    return (
        <div className={styles['table']}>
            <Head />
            <Body />
            <Loading />
        </div>
    );
};

export default Table2;
