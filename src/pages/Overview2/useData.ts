import { useFactoryModelTree } from '@/services/overview';
import { useMemo, useState } from 'react';
import useTree from './useTree';

const useData = () => {
    // 树数据
    const treeQuery = useFactoryModelTree();
    // 当前节点列表，用于回退
    const [currentNodes, setCurrentNodes] = useState<string[]>(['root']);
    // 当前节点
    const currentNode = useMemo(() => currentNodes[currentNodes.length - 1], [currentNodes]);
    // 根据树数据获取idMap
    const { idMap, tree } = useTree(treeQuery.data);
    // 根据当前节点获取展示节点
    const currentShows = idMap[currentNode]?.children;
    // 判断是否有展示节点
    const haveShow = Array.isArray(currentShows) && currentShows.length > 0;
    // 判断节点大小
    const size = haveShow ? Math.ceil(Math.sqrt(currentShows.length)) : 0;
    // 能否返回
    const canBack = currentNodes.length > 1;
    // 前进
    const next = (id: string) => {
        if (idMap[id]?.children) {
            setCurrentNodes((n) => [...n, id]);
        }
    };
    // 后退
    const prev = () => {
        setCurrentNodes((n) => {
            if (n.length > 1) {
                n.pop();
                return [...n];
            }
            return n;
        });
    };

    return { currentShows: currentShows || [], haveShow, size, canBack, next, prev, currentNodes, setCurrentNodes, idMap, tree };
};

export default useData;
