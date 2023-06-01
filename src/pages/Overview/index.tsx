import { useFactoryModelInfo, useFactoryModelTree } from '@/services/overview';
import { handleFactoryModelTree, useUrl } from './utils';
import { useCallback, useMemo, useState } from 'react';
import BoxShadow from '@/components/Header/boxShadow';
import FactorySelect from './FactorySelect';
import styles from './index.module.less';
import TianFang from './TianFang';
import Cabinet from './Cabinet';
import Url from './Url';

const Overview = () => {
    const treeQuery = useFactoryModelTree();

    // 获取Cascader的option和idMap
    const { tree, idMap } = useMemo(() => {
        if (treeQuery.data) return handleFactoryModelTree(treeQuery.data);
        return { tree: [], idMap: {} };
    }, [treeQuery.data]);

    const [factoryIds, setFactoryIds] = useState<string[]>([]);

    const factoryId = useMemo(() => {
        if (Array.isArray(factoryIds) && factoryIds.length > 0) return factoryIds[factoryIds.length - 1];
        return '';
    }, [factoryIds]);

    const infoQuery = useFactoryModelInfo(factoryId);

    const { url, type, cabinet } = useUrl(infoQuery.data);

    const getContent = useCallback(() => {
        switch (type) {
            case 'cabinet':
                return <Cabinet id={cabinet.id} system={cabinet.system} />;
            case 'page':
                return <TianFang url={url} />;
            case 'url':
                return <Url url={url} />;
            default:
                return null;
        }
    }, [type, url, cabinet.id, cabinet.system]);

    return (
        <BoxShadow>
            <div className={styles['wrapper']}>
                {getContent()}
                <FactorySelect factoryIds={factoryIds} setFactoryIds={setFactoryIds} tree={tree} idMap={idMap} />
            </div>
        </BoxShadow>
    );
};

export default Overview;
