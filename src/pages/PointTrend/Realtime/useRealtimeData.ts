import { useCallback, useMemo, useState } from 'react';
import getAddAndDelParams from '@/utils/addAndDelParams';
import { getEmpty } from './utils';
import { Params } from './type';
import useData from './useData';

const useRealtimeData = () => {
    const [play, setPlay] = useState(true);
    const [params, setParams] = useState<Params>({});
    const addAndDelParams = useCallback(getAddAndDelParams(setParams), []);
    const data = useData(params, play);
    const { empty, emptyTip } = useMemo(() => getEmpty(data, params), [data, params]);

    return { data, play, setPlay, params, addAndDelParams, empty, emptyTip };
};

export default useRealtimeData;
