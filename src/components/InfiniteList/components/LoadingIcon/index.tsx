import Iconfont from '@/components/Iconfont';
import styles from './index.module.less';
import { CSSProperties, FC } from 'react';
import classNames from 'classnames';

type Props = {
    className?: string;
    style?: CSSProperties;
};

const LoadingIcon: FC<Props> = ({ className, style }) => {
    return <Iconfont icon="loading" className={classNames(styles['loading-icon'], className)} style={style} />;
};

export default LoadingIcon;
