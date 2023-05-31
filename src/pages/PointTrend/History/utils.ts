import { PointItem } from '@/services/pointTrend';
import { EchartsValueItem, Params } from './type';
import timeTool from '@/utils/timeTool';

const pointItemToValueItem = (v: PointItem[]): EchartsValueItem[] => {
    const res: EchartsValueItem[] = [];
    v.forEach(({ pointTag, timestamp, value }) => {
        const count = value === null ? null : Number(value);
        res.push({
            name: pointTag,
            value: [Number(timestamp), count],
        });
    });
    return res;
};

export const getRequestParams = (params: Params) => ({
    fullPointTags: params.fullPointTags?.map((item) => item),
    startTime: params.startTime ? timeTool.toNumByDate(params.startTime) : undefined,
    endTime: params.endTime ? timeTool.toNumByDate(params.endTime) : undefined,
});

export const getSeries = (data: Record<string, PointItem[]>) => {
    return Object.entries(data)
        .map(([k, v]) => {
            if (Array.isArray(v) && v.length > 1) {
                return {
                    data: pointItemToValueItem(v),
                    name: k,
                    type: 'line',
                    symbol: 'none',
                };
            } else {
                return null;
            }
        })
        .filter((item) => item !== null);
};

export const getEmpty = (data: Record<string, PointItem[]> | undefined | null, params: Params) => {
    const start = params.startTime;
    const end = params.endTime;
    const haveTime = start && end;
    if (!haveTime) return { empty: true, emptyTip: '请选择时间!' };
    const point = params.fullPointTags;
    const havePoint = Array.isArray(point) && point.length > 0;
    if (!havePoint) return { empty: true, emptyTip: '请输入位号!' };
    const haveRequest = data === undefined;
    const haveData = data && Object.keys(data).length > 0;
    if (!(haveData || haveRequest)) return { empty: true, emptyTip: '请输入正确的位号!' };
    return { empty: false, emptyTip: '' };
};
