import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { echarts } from '@/utils/echarts';

// 加载echarts实例
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

// 加载首次option
const useFirstOption = (instance: echarts.ECharts | undefined, option: any) => {
    const rendered = useRef(false);

    useEffect(() => {
        if (!rendered.current && instance && option) {
            instance.setOption(option);
            rendered.current = true;
        }
    }, [instance, option]);
};

export { useFirstOption };
export default useEcharts;
