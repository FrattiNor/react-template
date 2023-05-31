import { useFactoryModelTree } from '@/services/overview';
import BoxShadow from '@/components/Header/boxShadow';
import Horizontal2 from '@/components/Horizontal2';
import { handleFactoryModelTree } from './utils';
import FactorySelect from './FactorySelect';
import { useMemo, useState } from 'react';
import styles from './index.module.less';

const Overview = () => {
    const treeQuery = useFactoryModelTree();
    const [factoryIds, setFactoryIds] = useState<string[]>([]);

    // 获取Cascader的option和idMap
    const { tree, idMap } = useMemo(() => {
        if (treeQuery.data) return handleFactoryModelTree(treeQuery.data);
        return { tree: [], idMap: {} };
    }, [treeQuery.data]);

    return (
        <BoxShadow>
            <Horizontal2>
                <div className={styles['wrapper']}>
                    <FactorySelect factoryIds={factoryIds} setFactoryIds={setFactoryIds} tree={tree} idMap={idMap} />
                </div>
            </Horizontal2>
        </BoxShadow>
    );
};

export default Overview;
