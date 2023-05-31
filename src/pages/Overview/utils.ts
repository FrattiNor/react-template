import useIp from '@/hooks/useIp';
import { BuildConfigListItem, FactoryModelListItem } from '@/services/overview';

export type HandleTreeItem = {
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

export const useUrl = (data: BuildConfigListItem | null | undefined) => {
    let url = '';

    const constValue = useIp();

    const cabinet = { id: '', system: '' };

    const { type, forwardUrl, pageForward, cabinetForward } = data || {};

    switch (type) {
        case 'cabinet': {
            if (cabinetForward) {
                const { system, cabinetId } = cabinetForward;
                url = `/systemDiagnosis/${system}/${cabinetId}`;
                cabinet.id = cabinetId;
                cabinet.system = system;
            }
            break;
        }
        case 'page': {
            if (pageForward) {
                const { pageCode } = pageForward;
                const { suposIp, suposPort, suposProtocol } = constValue;
                url = `${suposProtocol}://${suposIp}:${suposPort}/main/#/runtime-fullscreen/runtime-fullscreen/${pageCode}`;
            }
            break;
        }
        case 'url': {
            url = forwardUrl || '';
            break;
        }
        default:
            break;
    }

    return { url, type, cabinet };
};
