export type FactoryModelListItem = {
    id: string;
    nodeName: string;
    hasChild: boolean;
    childList?: FactoryModelListItem[]; // need
};

export type FactoryModelHomePage = {
    factoryModelId: string;
};
