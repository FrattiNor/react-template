import { FC, Fragment, useState } from 'react';
import Iconfont from '@/components/Iconfont';
import styles from './index.module.less';
import { FilterProps } from './type';
import { Popup } from 'antd-mobile';
import Content from './content';

const Filter: FC<FilterProps> = ({ style, position, filterList, params, setParams }) => {
    const [visible, setVisible] = useState(false);

    const open = () => {
        setVisible(true);
    };
    const close = () => {
        setVisible(false);
    };

    return (
        <Fragment>
            <div className={styles['filter-btn']} style={{ position, ...(style || {}) }} onClick={open}>
                <Iconfont icon="search" />
            </div>

            <Popup visible={visible} onMaskClick={close} bodyClassName={styles['popup-body']} destroyOnClose>
                <Content {...{ filterList, params, setParams }} />
            </Popup>
        </Fragment>
    );
};

export default Filter;
