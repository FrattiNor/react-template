import { forwardRef, useImperativeHandle } from 'react';

import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import classNames from 'classnames';

import styles from './index.module.less';
import LoadingDiv from '../../LoadingDiv';
import ListInner from '../ListInner';
import useList from '../useList';

import type { VirtualSearchListComponent } from '../type';

const VirtualSearchList: VirtualSearchListComponent = forwardRef((props, ref) => {
    const list = useList(props);
    useImperativeHandle(ref, () => list);

    const { title, searchClassName, searchStyle, loading, wrapperClassName, wrapperStyle, listClassName } = props;

    return (
        <LoadingDiv loading={loading} className={classNames(styles['wrapper'], wrapperClassName)} style={wrapperStyle}>
            {title && <div className={styles['title']}>{title}</div>}

            <div className={classNames(styles['search'], searchClassName)} style={searchStyle}>
                <Input
                    allowClear
                    style={{ backgroundColor: 'transparent' }}
                    onChange={(e) => list.search(e.target.value)}
                    suffix={<SearchOutlined style={{ color: 'var(--theme-placeholder-foreground)' }} />}
                />
            </div>

            <ListInner {...props} listClassName={classNames(styles['list'], listClassName)} instance={list} />
        </LoadingDiv>
    );
});

export default VirtualSearchList;
