import SwitchContext, { Type } from './Switch/context';
import BoxShadow from '@/components/Header/boxShadow';
import Realtime from './Realtime';
import { useState } from 'react';
import History from './History';

const Chart = () => {
    const [type, setType] = useState<Type>('history');

    return (
        <BoxShadow>
            <SwitchContext.Provider value={{ type, setType }}>
                {type === 'history' && <History />}
                {type === 'realtime' && <Realtime />}
            </SwitchContext.Provider>
        </BoxShadow>
    );
};

export default Chart;
