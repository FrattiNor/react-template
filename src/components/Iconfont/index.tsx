import styles from './index.module.less';
import classNames from 'classnames';
import { Props } from './type';
import { FC } from 'react';
import './iconfont.js';

const Iconfont: FC<Props> = ({ icon, style, className = '', onClick }) => {
    return (
        <svg className={classNames(styles['iconfont'], className)} style={style} onClick={onClick} aria-hidden="true">
            <use xlinkHref={`#icon-${icon}`}></use>
        </svg>
    );
};

export default Iconfont;
