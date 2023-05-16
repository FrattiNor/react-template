import styles from './index.module.less';
import Iconfont from '@/iconfont';
import { FC } from 'react';

type Props = {
    type: 'enter' | 'leave' | 'fetching' | 'success' | '';
};

const FetchTips: FC<Props> = ({ type }) => {
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
                    <Iconfont icon="loading" className={styles['loading']} />
                </span>
            );
        case 'success':
            return <span>刷新成功</span>;
        default:
            return <span>占位</span>;
    }
};

export default FetchTips;
