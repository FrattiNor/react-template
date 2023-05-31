import { FactoryModelListItem } from '@/services/overview';

type HandleTreeItem = {
    label: string;
    value: string;
    ids: string[];
    children?: HandleTreeItem[];
};

export const handleFactoryModelTree = (tree2: FactoryModelListItem[], beforeId?: string[]) => {
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
