import { RadioType, PeriodType, LoopType, PointType } from './type';
import { useEffect, useMemo, useState } from 'react';

export const getNumByStr = (v: string) => {
    const n = Number(v);
    return isNaN(n) ? 0 : n;
};

// cron 类型
export const cronType = ['second', 'minute', 'hour', 'day', 'month', 'week', 'year'] as const;

const useData = () => {
    const currentYear = useMemo(() => new Date().getFullYear(), []);

    const [expression, setExpression] = useState('* * * * * * *');

    const [dayType, setDayType] = useState<'day' | 'week'>('day');

    // 单选 选择执行类型
    const [radioValue, setRadioValue] = useState<RadioType>({
        second: 1,
        minute: 1,
        hour: 1,
        day: 1,
        month: 1,
        week: 1,
        year: 1,
    });

    //
    const [periodValue, setPeriodValue] = useState<PeriodType>({
        second: { start: 0, end: 1 },
        minute: { start: 0, end: 1 },
        hour: { start: 0, end: 1 },
        day: { start: 1, end: 2 },
        month: { start: 1, end: 2 },
        week: { start: 1, end: 2 },
        year: { start: currentYear, end: currentYear + 1 },
    });

    // 从 ... 开始
    const [loopValue, setLoopValue] = useState<LoopType>({
        second: { start: 0, loop: 1 },
        minute: { start: 0, loop: 1 },
        hour: { start: 0, loop: 1 },
        day: { start: 1, loop: 1 },
        month: { start: 1, loop: 1 },
        week: { start: 1, loop: 1 },
        year: { start: currentYear, loop: 1 },
    });

    // 指定
    const [pointValue, setPointValue] = useState<PointType>({
        second: '',
        minute: '',
        hour: '',
        day: '',
        month: '',
        week: '',
        year: '',
    });

    /**
     * cron 回显
     * @param cronText
     */
    const cronComeShow = (cronText: string) => {
        // 单选按钮
        const changeRadio = {} as RadioType;
        // 周期数组范围回显
        const initPeriodValue = {} as PeriodType;
        // 从...开始
        const initLoopValue = {} as LoopType;
        // 指定
        const initPointValue = {} as PointType;

        try {
            // 拆分表达式
            const cronList = cronText.split(' ');
            cronList.forEach((text, index) => {
                const type = cronType[index];
                const isDay = index === 3; //

                //
                if (isDay) {
                    setDayType(/^(\*|\d\/\d|\d-\d|\d(,\d)*)$/.test(text) ? 'day' : 'week');
                }

                if (/^\*$/.test(text)) {
                    changeRadio[type] = 1;
                } else if (/^\d\/\d$/.test(text)) {
                    changeRadio[type] = 2;
                    const vList = text.split('/');
                    initPeriodValue[type] = { start: getNumByStr(vList[0]), end: getNumByStr(vList[1]) };
                } else if (/^\d-\d$/.test(text)) {
                    changeRadio[type] = 3;
                    const vList = text.split('-');
                    initLoopValue[type] = { start: getNumByStr(vList[0]), loop: getNumByStr(vList[1]) };
                } else if (/^\d(,\d)*$/.test(text)) {
                    changeRadio[type] = 4;
                    initPointValue[type] = text;
                } else {
                    changeRadio[type] = 0;
                }
            });
        } catch (e) {
            console.log(e);
        }

        setPeriodValue({ ...periodValue, ...initPeriodValue });
        setLoopValue({ ...loopValue, ...initLoopValue });
        setPointValue({ ...pointValue, ...initPointValue });
        setRadioValue({ ...radioValue, ...changeRadio });
    };

    useEffect(() => {
        cronComeShow(expression);
    }, [expression]);

    return {
        expression,
        setExpression,
        radioValue,
        setRadioValue,
        periodValue,
        setPeriodValue,
        loopValue,
        setLoopValue,
        pointValue,
        setPointValue,
        currentYear,
        dayType,
        setDayType,
    };
};

export default useData;
