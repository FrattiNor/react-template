import React, { useEffect } from 'react';
import { useSelector, useDispatch } from '@/store';
import { incrementByAmount } from '@/store/reducer/counter';

const App = () => {
    const { value } = useSelector((s) => ({ value: s.counter.value }));
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('value', value);
    }, [value]);

    const add = () => {
        dispatch(incrementByAmount(2));
    };

    return <div onClick={add}>App</div>;
};

export default App;
