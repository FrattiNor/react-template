import useRealtimeData from './Realtime/useRealtimeData';
import SwitchContext, { Type } from './Switch/context';
import useHistoryData from './History/useHistoryData';
import BoxShadow from '@/components/Header/boxShadow';
import Realtime from './Realtime';
import { useState } from 'react';
import History from './History';

const Chart = () => {
    const [type, setType] = useState<Type>('history');
    const realtimeData = useRealtimeData();
    const historyData = useHistoryData();

    return (
        <BoxShadow>
            <SwitchContext.Provider value={{ type, setType }}>
                {type === 'history' && <History historyData={historyData} />}
                {type === 'realtime' && <Realtime realtimeData={realtimeData} />}
            </SwitchContext.Provider>
        </BoxShadow>
    );
};

export default Chart;
