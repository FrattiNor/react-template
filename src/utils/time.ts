/**
 * @description 格式化时间的方法
 */

import dayjs from 'dayjs'

const time = {
    stringify: (t: string | number): string => {
        return t ? (String(t)?.length === 10 ? dayjs.unix(Number(t)) : dayjs(Number(t))).format('YYYY-MM-DD HH:mm:ss') : '-'
    },
    parse: (s: string): number => {
        return s ? dayjs(s, 'YYYY-MM-DD HH:mm:ss').unix() : 0
    }
}

export default time
