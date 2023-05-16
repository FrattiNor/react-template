import { PullDownType } from '../useScroll';
import styles from './index.module.less';
import Iconfont from '@/components/Iconfont';
import { FC } from 'react';

type Props = {
    type: PullDownType;
};

const FetchTip: FC<Props> = ({ type }) => {
    switch (type) {
        case 'enter':
            return (
                <span>
                    <Iconfont icon="arrow-down" />
                    <span> 下拉刷新</span>
                </span>
            );
        case 'leave':
            return (
                <span>
                    <Iconfont icon="arrow-up" />
                    <span> 释放刷新</span>
                </span>
            );
        case 'fetching':
            return (
                <span>
                    <span>加载中 </span>
                    <Iconfont icon="loading" className={styles['tip-loading']} />
                </span>
            );
        case 'success':
            return <span>刷新成功</span>;
        default:
            return <span>占位</span>;
    }
};

export default FetchTip;
