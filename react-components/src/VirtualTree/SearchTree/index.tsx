import { forwardRef, useImperativeHandle } from 'react';

import { SearchOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import classNames from 'classnames';

import styles from './index.module.less';
import SvgExpand from './SvgExpand';
import SvgRetract from './SvgRetract';
import Loading from '../../Loading';
import TreeInner from '../TreeInner';
import type { VirtualSearchTreeComponent } from '../type';
import useTree from '../useTree';

const VirtualSearchTree: VirtualSearchTreeComponent = forwardRef((props, ref) => {
    const tree = useTree(props);
    useImperativeHandle(ref, () => tree);

    const { closeAll, openAll, atLeastOneOpen } = tree;
    const { title, searchClassName, searchStyle, loading, wrapperClassName, wrapperStyle, treeClassName } = props;

    return (
        <div className={classNames(styles['wrapper'], wrapperClassName)} style={wrapperStyle}>
            <Loading loading={loading} />

            {title && <div className={styles['title']}>{title}</div>}

            <div className={classNames(styles['search'], searchClassName)} style={searchStyle}>
                <Button
                    className={styles['expand-btn']}
                    onClick={atLeastOneOpen ? closeAll : openAll}
                    icon={atLeastOneOpen ? <SvgRetract /> : <SvgExpand />}
                />
                <Input
                    allowClear
                    style={{ backgroundColor: 'transparent' }}
                    onChange={(e) => tree.search(e.target.value)}
                    suffix={<SearchOutlined style={{ color: 'var(--theme-placeholder-foreground)' }} />}
                />
            </div>

            <TreeInner {...props} instance={tree} treeClassName={classNames(styles['tree'], treeClassName)} />
        </div>
    );
});

export default VirtualSearchTree;
