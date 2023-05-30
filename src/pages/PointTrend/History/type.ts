export type Params = {
    startTime?: Date;
    endTime?: Date;
    fullPointTags?: string[];
};

export type EchartsValueItem = {
    name: string;
    value: [number, number | null];
};
