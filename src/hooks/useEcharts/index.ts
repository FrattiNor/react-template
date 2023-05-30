import { useEffect, useLayoutEffect, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { echarts } from '@/utils/echarts';

const useEcharts = (getElement: () => HTMLElement | undefined) => {
    const [instance, setInstance] = useState<echarts.ECharts>();

    useLayoutEffect(() => {
        const element = getElement();
        if (element) {
            const myChart = echarts.init(element);
            const ob = new ResizeObserver(() => myChart.resize());
            setInstance(myChart);
            ob.observe(element);

            return () => {
                myChart.dispose();
                ob.disconnect();
            };
        }
    }, []);

    return [instance];
};

const useEchartsOption = (instance: echarts.ECharts | undefined, option: any) => {
    useEffect(() => {
        if (instance) instance.setOption(option);
    }, [instance, option]);
};

export { useEchartsOption };
export default useEcharts;
