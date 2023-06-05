import { DatePickerProps } from 'antd-mobile';
import { useCallback, useMemo } from 'react';
import dayjs from 'dayjs';

export const useDateUtils = (precision: DatePickerProps['precision']) => {
    const weekdayToZh = useCallback((weekday: number) => {
        switch (weekday) {
            case 1:
                return '周一';
            case 2:
                return '周二';
            case 3:
                return '周三';
            case 4:
                return '周四';
            case 5:
                return '周五';
            case 6:
                return '周六';
            case 7:
                return '周日';
            default:
                return weekday;
        }
    }, []);

    const renderLabel = useCallback((type: string, data: number) => {
        switch (type) {
            case 'year':
                return data + '年';
            case 'month':
                return data + '月';
            case 'day':
                return data + '日';
            case 'hour':
                return data + '时';
            case 'minute':
                return data + '分';
            case 'second':
                return data + '秒';
            case 'week':
                return data + '周';
            case 'week-day':
                return weekdayToZh(data);
            default:
                return data;
        }
    }, []);

    const defaultFormat = useMemo(() => {
        switch (precision) {
            case 'year':
                return 'YYYY';
            case 'month':
                return 'YYYY-MM';
            case 'day':
                return 'YYYY-MM-DD';
            case 'hour':
                return 'YYYY-MM-DD HH';
            case 'minute':
                return 'YYYY-MM-DD HH:mm';
            case 'second':
                return 'YYYY-MM-DD HH:mm:ss';
            case 'week':
                return 'YYYY-ww周';
            case 'week-day':
                return 'YYYY-ww周-ddd';
            default:
                return 'YYYY-MM-DD HH:mm:ss';
        }
    }, [precision]);

    const distance = useCallback(
        (d: Date, handle: 'add' | 'subtract', count = 1): Date => {
            switch (precision) {
                case 'year':
                    return new Date(dayjs(d)[handle](count, 'year').valueOf());
                case 'month':
                    return new Date(dayjs(d)[handle](count, 'month').valueOf());
                case 'day':
                    return new Date(dayjs(d)[handle](count, 'day').valueOf());
                case 'hour':
                    return new Date(dayjs(d)[handle](count, 'hour').valueOf());
                case 'minute':
                    return new Date(dayjs(d)[handle](count, 'minute').valueOf());
                case 'second':
                    return new Date(dayjs(d)[handle](count, 'second').valueOf());
                case 'week':
                    return new Date(dayjs(d)[handle](count, 'week').valueOf());
                case 'week-day':
                    return new Date(dayjs(d)[handle](count, 'day').valueOf());
                default:
                    return d;
            }
        },
        [precision],
    );

    // 按秒计算
    const distanceSecond = useCallback(
        (d: Date, handle: 'add' | 'subtract', count = 0): Date => {
            return new Date(dayjs(d)[handle](count, 'second').valueOf());
        },
        [precision],
    );

    return { renderLabel, defaultFormat, distance, distanceSecond };
};
