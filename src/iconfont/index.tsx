import styles from './index.module.less';
import { FC } from 'react';
import './iconfont.js';

type Props = {
    icon: string;
};

const Iconfont: FC<Props> = ({ icon }) => {
    return (
        <svg className={styles['iconfont']} aria-hidden="true">
            <use xlinkHref={`#icon-${icon}`}></use>
        </svg>
    );
};

export default Iconfont;
