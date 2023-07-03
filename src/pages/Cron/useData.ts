import { RadioType, PeriodType, LoopType, PointType, DayType } from './type';
import { useEffect, useMemo, useState } from 'react';
import { cronParse, cronStringify } from './utils';

type Props = {
    value?: string;
    onChange?: (v: string) => void;
};

const useData = ({ value, onChange }: Props) => {
    const [_expression, _setExpression] = useState('* * * * * ? *');

    const expression = typeof value === 'string' ? value : _expression;

    const setExpression = typeof onChange === 'function' ? onChange : _setExpression;

    const currentYear = useMemo(() => new Date().getFullYear(), []);

    const [error, setError] = useState('');

    const [dayType, setDayType] = useState<DayType>('day');

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
        second: [0],
        minute: [0],
        hour: [0],
        day: [1],
        month: [1],
        week: [1],
        year: [currentYear],
    });

    // expression 变更
    useEffect(() => {
        const result = cronParse(expression);
        // console.log('=== cronParse ===');
        // console.log(result);
        const { error, nextDayType, nextLoop, nextPeriod, nextPoint, nextRadio } = result;
        if (error) {
            setError(error);
        } else {
            setError('');
            if (nextDayType) setDayType(nextDayType);
            if (nextRadio) setRadioValue((b) => ({ ...b, ...nextRadio }));
            if (nextPeriod) setPeriodValue((b) => ({ ...b, ...nextPeriod }));
            if (nextLoop) setLoopValue((b) => ({ ...b, ...nextLoop }));
            if (nextPoint) setPointValue((b) => ({ ...b, ...nextPoint }));
        }
    }, [expression]);

    useEffect(() => {
        const result = cronStringify({ radioValue, periodValue, loopValue, pointValue, dayType });
        // console.log('=== cronStringify ===');
        // console.log(result);
        const { error, nextCron } = result;
        if (error) {
            setError(error);
        } else {
            setError('');
            if (nextCron) setExpression(nextCron);
        }
    }, [radioValue, periodValue, loopValue, pointValue, dayType]);

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
        error,
    };
};

export default useData;
