import iconfontJSON from './iconfontJson';
import styles from './index.module.less';
import { CSSProperties, FC } from 'react';
import classNames from 'classnames';
import './iconfont.js';

type FontClass = (typeof iconfontJSON.glyphs)[number]['font_class'];

type Props = {
    icon: FontClass;
    className?: string;
    style?: CSSProperties;
};

const Iconfont: FC<Props> = ({ icon, style, className = '' }) => {
    return (
        <svg className={classNames(styles['iconfont'], className)} style={style} aria-hidden="true">
            <use xlinkHref={`#icon-${icon}`}></use>
        </svg>
    );
};

export default Iconfont;
