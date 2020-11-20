import formatUrl from './format_url'
import formatOptions from './format_options'
import checkCode from './check_code'

// 防抖定时器
const debounceList: anyObject = {}
// 节流标记
const throttleList: anyObject = {}

const request = (url: string, options: requestOptions = {}, customOptions: requestCustomOptions = {}): Promise<unknown> => {
    const { debounce, throttle, timeOut = 60 * 1000 } = customOptions

    return new Promise((resolve, reject) => {
        // 请求函数
        const sendHttp = (): void => {
            // 超时定时器
            const requestTimeOut = setTimeout(() => {
                reject({ message: '服务器超时' })
            }, timeOut)

            const tureUrl = formatUrl(url, options, customOptions)
            const trueOptions = formatOptions(url, options, customOptions)

            // 请求
            fetch(tureUrl, trueOptions).then((response) => {
                clearTimeout(requestTimeOut) // 请求完成则clear掉超时定时器
                checkCode(response, customOptions, resolve, reject)
            })
        }

        // 发请求
        let requestType = 'normal'
        if (debounce) {
            requestType = 'debounce'
        }
        if (throttle) {
            requestType = 'throttle'
        }
        switch (requestType) {
            case 'debounce':
                // 防抖函数
                clearTimeout(debounceList[`${url}+${options.method}`])
                debounceList[`${url}+${options.method}`] = setTimeout(() => {
                    sendHttp()
                }, debounce)

                break
            case 'throttle':
                // 节流函数
                if (!throttleList[`${url}+${options.method}`]) {
                    throttleList[`${url}+${options.method}`] = true
                    sendHttp()
                    setTimeout(() => {
                        throttleList[`${url}+${options.method}`] = false
                    }, throttle)
                }

                break
            case 'normal':
                sendHttp()

                break
            default:
                break
        }
    })
}

export default request
