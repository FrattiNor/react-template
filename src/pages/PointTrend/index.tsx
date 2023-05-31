import useRealtimeData from './Realtime/useRealtimeData';
import SwitchContext, { Type } from './Switch/context';
import useHistoryData from './History/useHistoryData';
import BoxShadow from '@/components/Header/boxShadow';
import Horizontal2 from '@/components/Horizontal2';
import Realtime from './Realtime';
import { useState } from 'react';
import History from './History';

const Chart = () => {
    const [type, setType] = useState<Type>('history');
    const realtimeData = useRealtimeData();
    const historyData = useHistoryData();

    return (
        <BoxShadow>
            <Horizontal2>
                <SwitchContext.Provider value={{ type, setType }}>
                    {type === 'history' && <History historyData={historyData} />}
                    {type === 'realtime' && <Realtime realtimeData={realtimeData} />}
                </SwitchContext.Provider>
            </Horizontal2>
        </BoxShadow>
    );
};

export default Chart;
