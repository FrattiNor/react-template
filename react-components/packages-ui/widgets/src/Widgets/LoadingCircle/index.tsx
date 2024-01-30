import { CSSProperties, FC } from 'react';

import classNames from 'classnames';

import styles from './index.module.less';
import LoadingSvg from '../LoadingSvg';

type Props = {
    className?: string;
    style?: CSSProperties;
};

const LoadingCircle: FC<Props> = ({ className, style }) => {
    return (
        <div className={classNames(styles['loading-circle'], className)} style={style}>
            <LoadingSvg />
        </div>
    );
};

export default LoadingCircle;
