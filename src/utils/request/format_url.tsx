import qs from 'qs'
import { isObject } from '@/utils/judge'
import formatData from './format_data'

// 格式化url，主要针对GET请求同时存在参数的情况
const formatUrl = (url: string, options: requestOptions = {}, customOptions: requestCustomOptions = {}): string => {
    const { method = 'GET', data } = options

    if (method === 'GET' && isObject(data)) {
        return `${url}?${qs.stringify(formatData(url, customOptions, data))}`
    }

    return url
}

export default formatUrl
