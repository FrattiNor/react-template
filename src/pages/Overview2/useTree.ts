import { FactoryModelListItem } from '@/services/overview';
import { useMemo } from 'react';

export type HandleTreeItem = {
    label: string;
    value: string;
    ids: string[];
    disabled?: boolean;
    children?: HandleTreeItem[];
};

const handleFactoryModelTree = (tree2: FactoryModelListItem[], beforeId?: string[]) => {
    const tree: HandleTreeItem[] = [];
    let idMap: Record<string, HandleTreeItem> = {};

    tree2.forEach((item) => {
        const ids = [...(beforeId || []), item.id];
        const haveChild = Array.isArray(item.childList) && item.childList.length > 0;
        const handleChildren = haveChild ? handleFactoryModelTree(item.childList as any, ids) : undefined;

        const handleItem = {
            ids,
            value: item.id,
            label: item.nodeName,
            disabled: !haveChild,
            children: handleChildren?.tree,
        };

        idMap[item.id] = handleItem;
        tree.push(handleItem);

        if (handleChildren?.idMap) {
            idMap = { ...idMap, ...handleChildren.idMap };
        }
    });

    return { tree, idMap };
};

const useTree = (data: FactoryModelListItem[] | null | undefined) => {
    const { idMap, tree } = useMemo(() => {
        if (data) {
            const { tree: _tree, idMap: _idMap } = handleFactoryModelTree(data);
            // 增加root节点
            const root = {
                value: 'root',
                label: '根节点',
                ids: ['root'],
                children: _tree,
            };

            const tree2: HandleTreeItem[] = [root];

            const idMap2: Record<string, HandleTreeItem> = {
                root,
                ..._idMap,
            };
            // 增加root节点
            return { tree: tree2, idMap: idMap2 };
        }

        return { tree: [], idMap: {} };
    }, [data]);

    return { idMap, tree };
};

export default useTree;
