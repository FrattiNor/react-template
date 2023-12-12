/* eslint-disable react-refresh/only-export-components */
import { Context2Hoc, useContext2 } from './Context2';
import styles from './index.module.less';
import ScrollBarV from './ScrollBarV';
import ScrollBarH from './ScrollBarH';
import Loading from './Loading';
import { FC } from 'react';
import Head from './Head';
import Body from './Body';

const Table: FC = () => {
    const { scrollBar } = useContext2();

    return (
        <div className={styles['table']}>
            <Head />
            <div className={styles['body']}>
                <Body />
                <ScrollBarV />
            </div>
            <ScrollBarH />

            <Loading />
            {scrollBar.calcScrollBarDom}
        </div>
    );
};

export default Context2Hoc(Table);
