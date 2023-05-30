import { echartsUse } from '@/utils/echarts';
import historyOption from '../History/option';
import timeTool from '@/utils/timeTool';

echartsUse(['line', 'tooltip', 'grid']);

const option = {
    ...historyOption,
    grid: {
        top: 24,
        left: 12,
        right: 30,
        bottom: 12,
        containLabel: true,
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
            // 避免出现小数坐标
            formatter: (p: any, i: any) => {
                if (i % 6 === 1) {
                    return timeTool.toStrByNum(p, 'HH:mm:ss');
                }
                return '';
            },
        },
    },
    animation: false,
};

export default option;
