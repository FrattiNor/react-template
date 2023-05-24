export type KnowledgeItem = {
    id: string;
    fileName?: string;
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
