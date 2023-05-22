import { CSSProperties, FC, SVGProps } from 'react';
import iconfontJSON from './iconfontJson.js';
import styles from './index.module.less';
import classNames from 'classnames';
import './iconfont.js';

type FontClass = (typeof iconfontJSON.glyphs)[number]['font_class'];

type Props = {
    icon: FontClass;
    className?: string;
    style?: CSSProperties;
    onClick?: SVGProps<SVGSVGElement>['onClick'];
};

const Iconfont: FC<Props> = ({ icon, style, className = '', onClick }) => {
    return (
        <svg className={classNames(styles['iconfont'], className)} style={style} onClick={onClick} aria-hidden="true">
            <use xlinkHref={`#icon-${icon}`}></use>
        </svg>
    );
};

export default Iconfont;
