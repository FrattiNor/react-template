/* eslint-disable react-refresh/only-export-components */
import type { FC } from 'react';
import { useEffect, useLayoutEffect, useState } from 'react';

const A1 = () => {
    console.log('A1');
    return <>A1</>;
};

const A2 = () => {
    console.log('A2');
    return <>A2</>;
};

const AAAA: FC = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('EA');
    }, []);

    useLayoutEffect(() => {
        setLoading(false);
        console.log('LA');
    }, []);

    console.log('AA');

    return loading ? <A1 /> : <A2 />;
};

export default AAAA;
