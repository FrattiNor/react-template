export type PointHistoryParams = { fullPointTags: string[]; startTime: number; endTime: number };

export type PointItem = {
    datasourceName: string;
    pointTag: string;
    timestamp: string;
    value: string;
};

export type PointItem2 = {
    id: string;
    fullPointTag: string;
    pointTag: string;
    datasourceName: string;
};
