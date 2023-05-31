export type CardDetail = {
    address: string;
    cabinetId: string;
    cardAddr: number;
    cardId: string;
    cardType: number;
    model: string;
    name: string;
    pos: number;
    rackAddr: number;
    redun: number;
    status: number;
};

export type ECS700Detail = {
    controlCards: CardDetail[];
    ioCards: (CardDetail | null)[];
    ioConnectCards: CardDetail[];
    name: string;
    powerCards: CardDetail[];
    racks: number[];
};

export type CardInfo = {
    layoutId: string;
    children: CardInfo[] | null;
    itemValue: string;
    itemName: string;
    itemType: string;
    diagLevel: number;
    diagStatus: number;
    lastUpdateTime: string;
};
