import type { Dayjs } from 'dayjs';

// 禁用limit之后的date
export const disabledDateAfterLimit = (current: Dayjs, limit: Dayjs | null | undefined) => {
    if (limit) return current > limit.endOf('day');
    return false;
};

// 禁用limit之前的date
export const disabledDateBeforeLimit = (current: Dayjs, limit: Dayjs | null | undefined) => {
    if (limit) return current < limit.startOf('day');
    return false;
};

// 禁用limit之后的date和limit一年以前的date【一年由disabledType控制】
export const disabledDateAfterLimitAndBeforeType = (current: Dayjs, limit: Dayjs | null | undefined, disabledType?: 'year' | 'month' | 'day') => {
    if (limit) {
        // 存在限制类型【year,month】
        if (disabledType) {
            // 早于结束时间，至少1【年，月】【同年同天，或者同月同天】
            const tooEarly = limit.startOf('day').diff(current.startOf('day').add(1, 'day'), disabledType) >= 1;
            // 开始时间太早了【禁用】
            if (tooEarly === true) return true;
        }
        // 结束时间是一天的开始
        const endIsStartOfDay = limit.startOf('day').diff(limit, 'second') === 0;
        // 小于等于结束同一天【如果 结束时间是一天的开始，那么不能等于结束同一天】
        const notBeforeEnd = !(limit.startOf('day').diff(current.startOf('day'), 'day') >= (endIsStartOfDay ? 1 : 0));
        // 没有早于结束时间【禁用】
        if (notBeforeEnd === true) return true;
    }
    return false;
};

// 禁用limit之前的date和limit一年以后的date【一年由disabledType控制】
export const disabledDateBeforeLimitAndAfterType = (current: Dayjs, limit: Dayjs | null | undefined, disabledType?: 'year' | 'month' | 'day') => {
    if (limit) {
        // 存在限制类型【year,month】
        if (disabledType) {
            // 晚于开始时间，至少1【年，月】【同年同天，或者同月同天】
            const tooLate = current.startOf('day').diff(limit.startOf('day').add(1, 'day'), disabledType) >= 1;
            // 结束时间太晚了【禁用】
            if (tooLate === true) return true;
        }
        // 开始时间是一天的结束
        const startIsEndOfDay = limit.endOf('day').diff(limit, 'second') === 0;
        // 大于等于开始同一天【如果 开始时间是一天的结束，那么不能等于开始同一天】
        const notAfterStart = !(current.startOf('day').diff(limit.startOf('day'), 'day') >= (startIsEndOfDay ? 1 : 0));
        // 没有晚于开始时间【禁用】
        if (notAfterStart === true) return true;
    }
    return false;
};

// 禁用limit之后的time
export const disabledTimeAfterLimit = (current: Dayjs, limit: Dayjs | null | undefined) => {
    if (limit) {
        // 是同一天
        const isSameDay = limit.startOf('day').diff(current.startOf('day'), 'day') === 0;

        const endHour = limit.get('hour');
        const endMinute = limit.get('minute');
        const endSecond = limit.get('second');

        if (isSameDay) {
            return {
                disabledHours: () => {
                    return range('[', endMinute === 0 && endSecond === 0 ? endHour : endHour + 1, 24, ')');
                },
                disabledMinutes: (hour: number) => {
                    return hour === endHour ? range('[', endSecond === 0 ? endMinute : endMinute + 1, 60, ')') : [];
                },
                disabledSeconds: (hour: number, minute: number) => {
                    return hour === endHour && minute === endMinute ? range('[', endSecond, 60, ')') : [];
                },
            };
        }
    }

    return {
        disabledHours: () => [],
        disabledMinutes: () => [],
        disabledSeconds: () => [],
    };
};

// 禁用limit之前的time
export const disabledTimeBeforeLimit = (current: Dayjs, limit: Dayjs | null | undefined) => {
    if (limit) {
        // 是同一天
        const isSameDay = current.startOf('day').diff(limit.startOf('day'), 'day') === 0;

        const startHour = limit.get('hour');
        const startMinute = limit.get('minute');
        const startSecond = limit.get('second');

        if (isSameDay) {
            return {
                disabledHours: () => {
                    return range('(', -1, startMinute === 59 && startSecond === 59 ? startHour : startHour - 1, ']');
                },
                disabledMinutes: (hour: number) => {
                    return hour === startHour ? range('(', -1, startSecond === 59 ? startMinute : startMinute - 1, ']') : [];
                },
                disabledSeconds: (hour: number, minute: number) => {
                    return hour === startHour && minute === startMinute ? range('(', -1, startSecond, ']') : [];
                },
            };
        }
    }

    return {
        disabledHours: () => [],
        disabledMinutes: () => [],
        disabledSeconds: () => [],
    };
};

const range = (startFlag: '[' | '(', start: number, end: number, endFlag: ']' | ')') => {
    const res: number[] = [];
    const includeEnd = endFlag === ']';
    const includeStart = startFlag === '[';
    for (let i = includeStart ? start : start + 1; i <= (includeEnd ? end : end - 1); i++) {
        res.push(i);
    }
    return res;
};
