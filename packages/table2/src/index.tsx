/* eslint-disable react-refresh/only-export-components */
import { Context2Hoc } from './Context2';
import styles from './index.module.less';
import { FC } from 'react';

const Table2: FC = () => {
    return <div className={styles['table']}></div>;
};

export default Context2Hoc(Table2);
