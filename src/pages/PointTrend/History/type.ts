import useHistoryData from './useHistoryData';

export type Params = {
    startTime?: Date;
    endTime?: Date;
    fullPointTags?: string[];
};

export type EchartsValueItem = {
    name: string;
    value: [number, number | null];
};

export type Props = {
    historyData: ReturnType<typeof useHistoryData>;
};
