export type PointHistoryParams = { fullPointTags: string[]; startTime: number; endTime: number };

export type PointItem = {
    datasourceName: string;
    pointTag: string;
    timestamp: string;
    value: string;
};
