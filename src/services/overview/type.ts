export type FactoryModelListItem = {
    id: string;
    nodeName: string;
    hasChild: boolean;
    childList?: FactoryModelListItem[]; // need
};

export type FactoryModelHomePage = {
    factoryModelId: string;
};

export type BuildConfigListItem = {
    showName: string;
    enableDisplay: number;
    hierarchyIdList: string[];
    hierarchyName: null | string;
    id?: string;
    nodeDesc: string;
    nodeLevel: number;
    nodeName: string;
    parentId?: string;
    hasChild: boolean;
    childList?: BuildConfigListItem[]; // need
    pageConfigName: string;
    factoryModelId: string;
    pageCode?: string;
    forwardUrl?: string;
    isHomePage?: number;
    cabinetId?: string;
    type: string;

    cabinetForward?: CabinetInfo;
    pageForward?: PageInfo;
};

type CabinetInfo = {
    cabinetId: string;
    system: string;
};

type PageInfo = {
    pageCode: string;
    parentId: string;
    layoutId: string;
    appId: string;
};
