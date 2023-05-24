export type KnowledgeItem = {
    id: string;
    fileName: string;
    classificationName: string;
    classificationId: string;
    factoryModelId?: string[];
    mfrAndDevice?: string[];
    deviceId?: string[];
    contentIndex: string;
    md5: string;
    createTime: number;
    supportView: boolean;
    isdmTag?: string[];
    deviceModelView?: string[];
    factoryModelName?: string[];
};

export type KnowledgeTagItem = {
    id: string;
    name: string;
};

export type DeviceModelItem = {
    mfrAndDevice: string;
    deviceModelView: string;
};

export type FactoryModelItem = {
    id: string;
    nodeName: string;
    hasChild: boolean;
    childList: FactoryModelItem[];
};
