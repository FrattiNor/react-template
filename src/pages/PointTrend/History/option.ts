import { tooltipConfig, echartsUse } from '@/utils/echarts';
import timeTool from '@/utils/timeTool';

echartsUse(['grid', 'tooltip', 'line']);

const option = {
    grid: {
        top: 24,
        left: 12,
        right: 12,
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
        splitNumber: 6,
        minInterval: 1000,
        axisLabel: {
            hideOverlap: true,
            formatter: {
                year: '{yyyy}',
                month: '{yyyy}-{MM}',
                day: '{MM}-{dd}',
                hour: '{HH}:{mm}',
                minute: '{HH}:{mm}',
                second: '{HH}:{mm}:{ss}',
                millisecond: '{HH}:{mm}:{ss}',
                none: '{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}',
            },
        },
    },
    yAxis: {
        type: 'value',
        scale: true,
        minInterval: 1,
        axisLabel: {
            formatter: (value: any) => {
                if (String(value).includes('.')) return '';
                return value;
            },
        },
    },
    series: [],
};

export default option;
