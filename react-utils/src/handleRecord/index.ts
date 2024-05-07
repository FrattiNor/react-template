import { arrayToStr, arrayToStrOnly } from './formatArray';
import { handleFormatTime, handleFormatTimeOnly } from './formatTime';
import cleanRecord from '../cleanRecord';

import type { Opt } from './type';

// 总的处理参数的方法
export const handleRecord = (record: Record<string, any>, option?: Opt) => {
    const { clean = true, arrToStr, arrToStrOnly, formatTime, formatTimeOnly } = option || {};
    const handledRecord1 = { ...record };
    const handledRecord2 = arrToStr ? arrayToStr(handledRecord1) : handledRecord1;
    const handledRecord3 = arrToStrOnly ? arrayToStrOnly(handledRecord2, arrToStrOnly) : handledRecord2;
    const handledRecord4 = formatTime ? handleFormatTime(handledRecord3, formatTime) : handledRecord3;
    const handledRecord5 = formatTimeOnly ? handleFormatTimeOnly(handledRecord4, formatTimeOnly) : handledRecord4;
    const handledRecord6 = clean ? cleanRecord(handledRecord5) : handledRecord5;
    return handledRecord6;
};

export default handleRecord;
