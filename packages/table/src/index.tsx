/* eslint-disable react-refresh/only-export-components */
import { Context2Hoc } from './Context2';
import styles from './index.module.less';
import Loading from './Loading';
import { FC } from 'react';
import Head from './Head';
import Body from './Body';

const Table: FC = () => {
    return (
        <div className={styles['table']}>
            <Head />
            <Body />
            <Loading />
        </div>
    );
};

export default Context2Hoc(Table);
