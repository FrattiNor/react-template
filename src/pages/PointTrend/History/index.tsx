import useEcharts, { useEchartsOption } from '@/hooks/useEcharts';
import option from './option';
import { useRef } from 'react';

const History = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [instance] = useEcharts(() => ref.current as HTMLDivElement);
    useEchartsOption(instance, option);

    return <div ref={ref} style={{ height: '100%', overflow: 'hidden' }} />;
};

export default History;
