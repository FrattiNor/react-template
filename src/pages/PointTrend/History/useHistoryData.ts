import { useLocalStorageRecord } from '@/hooks/useLocalStorage';
import getAddAndDelParams from '@/utils/addAndDelParams';
import { usePointHistory } from '@/services/pointTrend';
import { getEmpty, getRequestParams } from './utils';
import { useCallback, useMemo } from 'react';
import timeTool from '@/utils/timeTool';
import { Params } from './type';
import dayjs from 'dayjs';

const useHistoryData = () => {
    const [params, setParams] = useLocalStorageRecord<Params>('historyData', {
        startTime: timeTool.toDateByDay(dayjs().subtract(10, 'minute')),
        endTime: timeTool.toDateByDay(dayjs()),
    });
    const addAndDelParams = useCallback(getAddAndDelParams(setParams), []);
    const { data } = usePointHistory(getRequestParams(params));
    const { empty, emptyTip } = useMemo(() => getEmpty(data, params), [data, params]);
    return { data, params, addAndDelParams, empty, emptyTip };
};

export default useHistoryData;
