import { Params } from './type';

export const getEmpty = (data: Record<string, any> | undefined | null, params: Params) => {
    const point = params.fullPointTags;
    const havePoint = Array.isArray(point) && point.length > 0;
    if (!havePoint) return { empty: true, emptyTip: '请输入位号' };
    const haveRequest = data === undefined;
    const haveData = data && Object.keys(data).length > 0;
    if (!(haveData || haveRequest)) return { empty: true, emptyTip: '请输入正确的位号' };
    return { empty: false, emptyTip: '' };
};
