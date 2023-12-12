import { useContext2 } from '../Context2';
import styles from './index.module.less';
import Loading from './Loading';
import Bottom from './Bottom';
import Middle from './Middle';
import { FC } from 'react';
import Top from './Top';

const Table2: FC = () => {
    const { calcScrollBar } = useContext2();

    return (
        <div className={styles['table']}>
            <Top />
            <Middle />
            <Bottom />
            <Loading />
            {calcScrollBar.calcScrollBarDom}
        </div>
    );
};

export default Table2;
