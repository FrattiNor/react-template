import Iconfont from '@/components/Iconfont';
import { FilterProps } from '../../type';
import styles from './index.module.less';
import { FC } from 'react';

const Filter: FC<FilterProps> = ({ style, position }) => {
    return (
        <div className={styles['filter-btn']} style={{ position, ...(style || {}) }}>
            <Iconfont icon="search" />
        </div>
    );
};

export default Filter;
