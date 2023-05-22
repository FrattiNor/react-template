import Iconfont from '@/components/Iconfont';
import styles from './index.module.less';
import classNames from 'classnames';
import { Props } from './type';
import { FC } from 'react';

const LoadingIcon: FC<Props> = ({ className, style }) => {
    return <Iconfont icon="loading" className={classNames(styles['loading-icon'], className)} style={style} />;
};

export default LoadingIcon;
