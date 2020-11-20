import { isObject, isString, isArray } from '@/utils/judge'
// import { message } from 'antd'

const formatData = (url: string, customOptions: requestCustomOptions = {}, data?: anyObject): anyObject => {
    const { arrayToStringKeys, mustKeys, includeKeys, excludeKeys, jumpCheckKeys } = customOptions

    const newData: anyObject = {}

    // 获取是否执行下一步（将对应的key值存入返回值中）
    const nextToGo = (key: string): boolean => {
        let result = true
        // 不能包含的key
        if (excludeKeys) {
            result = !excludeKeys.includes(key)
        }
        // 需要包含的key
        if (includeKeys) {
            result = includeKeys.includes(key)
        }
        return result
    }

    // 增加typeof避免ts报错
    if (typeof data === 'object' && isObject(data)) {
        Object.keys(data).forEach((key) => {
            // 判断字段 字符为 省略字段 是否要下一步
            if (nextToGo(key)) {
                if (jumpCheckKeys?.includes(key)) {
                    newData[key] = data[key]
                } else {
                    // 进行省略空的判断，把各种空值剔除掉
                    // 判断类型
                    let type = 'default'
                    if (isString(data[key])) {
                        type = 'string'
                    }
                    if (isArray(data[key])) {
                        type = 'array'
                    }
                    if (isObject(data[key])) {
                        type = 'object'
                    }
                    // 根据类型处理
                    switch (type) {
                        case 'string': // 排除空字符串
                            if (data[key] !== '') {
                                newData[key] = data[key]
                            }
                            break
                        case 'array': // 排除空数组
                            if (data[key].length !== 0) {
                                // 判断是否需要转化为字符串
                                if (arrayToStringKeys && arrayToStringKeys.includes(key)) {
                                    newData[key] = data[key].join(',')
                                } else {
                                    newData[key] = data[key]
                                }
                            }
                            break
                        case 'object': // 排除空对象
                            if (Object.keys(data[key]).length !== 0) {
                                newData[key] = data[key]
                            }
                            break
                        default:
                            // 排除null undefined
                            if ([null, undefined].every((item) => item !== data[key])) {
                                newData[key] = data[key]
                            }
                            break
                    }
                }
            }
        })
    }

    // 必须包含的
    if (mustKeys) {
        const lackKeys = mustKeys.filter((key) => !Object.keys(newData).includes(key))
        if (lackKeys.length > 0) {
            const text = `${url}请求 缺少字段 [${lackKeys.join('，')}]`
            // message.error(text)
        }
    }

    return newData
}

export default formatData
