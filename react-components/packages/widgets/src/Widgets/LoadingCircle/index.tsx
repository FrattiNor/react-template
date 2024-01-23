import { CSSProperties, FC } from 'react';
import LoadingSvg from '../LoadingSvg';
import styles from './index.module.less';
import classNames from 'classnames';

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
