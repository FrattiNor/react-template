import { useLocalStorageRecord } from '@/hooks/useLocalStorage';
import getAddAndDelParams from '@/utils/addAndDelParams';
import { useCallback, useMemo, useState } from 'react';
import { getEmpty } from './utils';
import { Params } from './type';
import useData from './useData';

const useRealtimeData = () => {
    const [play, setPlay] = useState(false);
    const [params, setParams] = useLocalStorageRecord<Params>('realtimeData', {});
    const addAndDelParams = useCallback(getAddAndDelParams(setParams), []);
    const data = useData(params, play);
    const { empty, emptyTip } = useMemo(() => getEmpty(data, params), [data, params]);

    return { data, play, setPlay, params, addAndDelParams, empty, emptyTip };
};

export default useRealtimeData;
