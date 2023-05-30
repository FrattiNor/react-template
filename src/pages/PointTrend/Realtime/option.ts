import { echartsUse, tooltipConfig } from '@/utils/echarts';
import timeTool from '@/utils/timeTool';

echartsUse(['line', 'tooltip', 'grid']);

const option = {
    grid: {
        top: 24,
        left: 12,
        right: 30,
        bottom: 12,
        containLabel: true,
    },
    tooltip: {
        ...tooltipConfig,
        trigger: 'axis',
        formatter: function (_params: any) {
            const zero = _params[0];
            const timestamp = zero.data.value[0];
            if (typeof timestamp === 'number') {
                return `
                <div>${timeTool.toStrByNum(timestamp)}<div>
                ${_params
                    .map((item: any) => {
                        const name = item.name;
                        const marker = item.marker;
                        const value = item.data.value[1];
                        return `<div>${marker}<span style="margin-left:5px;">${name}</span><span style="margin-left:20px;">${value}</span></div>`;
                    })
                    .join('')}
                `;
            }
            return '';
        },
        axisPointer: {
            animation: false,
        },
    },
    xAxis: {
        type: 'time',
        splitLine: {
            show: false,
        },
        interval: 1000,
        minInterval: 1000,
        maxInterval: 1000,
        min: 'dataMin',
        max: (value: any) => {
            return value.min + 30001;
        },
        axisLabel: {
            formatter: (p: any, i: any) => {
                if (i % 6 === 1) {
                    return timeTool.toStrByNum(p, 'HH:mm:ss');
                }
                return '';
            },
        },
    },
    yAxis: {
        type: 'value',
        scale: true,
        minInterval: 1,
    },
    series: [],
    animation: false,
};

export default option;
