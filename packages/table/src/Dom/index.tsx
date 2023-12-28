import { useContext2 } from '../Context2';
import styles from './index.module.less';
import classNames from 'classnames';
import Loading from './Loading';
import { FC } from 'react';
import Head from './Head';
import Body from './Body';

const Table2: FC = () => {
    const { outerProps } = useContext2();
    const { theme = 'light' } = outerProps;

    return (
        <div className={classNames(styles['table'], styles[theme])}>
            <Head />
            <Body />
            <Loading />
        </div>
    );
};

export default Table2;
