import { RadioType, PeriodType, LoopType, PointType, DayType } from './type';
import { useEffect, useMemo, useState } from 'react';
import { cronParser, cronStringify } from './utils';

type Props = {
    value?: string;
    onChange?: (v: string) => void;
};

const useData = ({ value, onChange }: Props) => {
    // 内部表达式
    const [_expression, _setExpression] = useState('* * * * * ? *');
    // 使用的表达式
    const expression = typeof value === 'string' ? value : _expression;
    // 修改表达式
    const setExpression = typeof onChange === 'function' ? onChange : _setExpression;
    // 当前年份
    const currentYear = useMemo(() => new Date().getFullYear(), []);
    // 解析或者序列化错误
    const [error, setError] = useState('');
    // 日的类型【dayOfMonth | dayOfWeek】
    const [dayType, setDayType] = useState<DayType>('dayOfMonth');
    // 内部序列化验证过的值【避免再验证一次表达式】
    const [verifiedStringifyCron, setVerifiedStringifyCron] = useState('* * * * * ? *');
    // 单选 选择执行类型
    const [radioValue, setRadioValue] = useState<RadioType>({
        second: 1,
        minute: 1,
        hour: 1,
        dayOfMonth: 1,
        month: 1,
        dayOfWeek: 1,
        year: 1,
    });
    // 周期 从start-end
    const [periodValue, setPeriodValue] = useState<PeriodType>({
        second: { start: 0, end: 1 },
        minute: { start: 0, end: 1 },
        hour: { start: 0, end: 1 },
        dayOfMonth: { start: 1, end: 2 },
        month: { start: 1, end: 2 },
        dayOfWeek: { start: 1, end: 2 },
        year: { start: currentYear, end: currentYear + 1 },
    });
    // 周期 从start/loop
    const [loopValue, setLoopValue] = useState<LoopType>({
        second: { start: 0, loop: 1 },
        minute: { start: 0, loop: 1 },
        hour: { start: 0, loop: 1 },
        dayOfMonth: { start: 1, loop: 1 },
        month: { start: 1, loop: 1 },
        dayOfWeek: { start: 1, loop: 1 },
        year: { start: currentYear, loop: 1 },
    });
    // 指定
    const [pointValue, setPointValue] = useState<PointType>({
        second: [0],
        minute: [0],
        hour: [0],
        dayOfMonth: [1],
        month: [1],
        dayOfWeek: [1],
        year: [currentYear],
    });
    // expression 变更
    useEffect(() => {
        // 内部验证过的就不需要再设置值了【针对外部值变更的情况】
        if (expression !== verifiedStringifyCron) {
            const result = cronParser(expression);
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
        }
    }, [expression]);
    // obj变更
    useEffect(() => {
        const result = cronStringify({ radioValue, periodValue, loopValue, pointValue, dayType });
        const { error, nextCron } = result;
        if (error) {
            setError(error);
        } else {
            setError('');

            if (nextCron) {
                setExpression(nextCron);
                setVerifiedStringifyCron(nextCron);
            }
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
