import formatData from './format_data'

// 获取默认options
const getDefaultOptions = (customOptions: requestCustomOptions = {}): anyObject => {
    //是否携带token and 设置 默认headers和默认options
    const { needToken = true, formData } = customOptions

    // 默认header
    let defaultHeaders: anyObject = {
        Pragma: 'no-cache',
        'Cache-Control': 'no-cache'
    }

    // 如果不是formdata格式默认设置Content-Type为application/json;charset=UTF-8
    if (!formData) {
        defaultHeaders['Content-Type'] = 'application/json;charset=UTF-8'
    }

    // 需要token (暂时使用token字符串)
    if (needToken) {
        defaultHeaders = { ...defaultHeaders, Token: 'token' }
    }

    // 默认option
    const defaultOptions = {
        method: 'GET', // 不设置默认为GET请求
        credentials: 'include',
        headers: { ...defaultHeaders }
    }

    return defaultOptions
}

// 格式化options，增加token以及格式化body
const formatOptions = (url: string, options: requestOptions, customOptions: requestCustomOptions): anyObject => {
    const { formData } = customOptions

    let newOptions: anyObject = { ...options }

    // 默认options
    const defaultOptions = getDefaultOptions(customOptions)

    // 设置完默认值的options
    newOptions = {
        ...defaultOptions,
        ...newOptions,
        headers: { ...defaultOptions.headers, ...newOptions.headers }
    }

    // 非GET请求，字符串格式化body
    const { data, method } = newOptions

    // 不是get请求
    if (method !== 'GET') {
        let body: string | FormData

        // FormData格式
        if (formData) {
            const beforeDody = formatData(url, customOptions, data)
            const newFormdata = new FormData()
            Object.entries(beforeDody).map(([key, value]) => {
                if (typeof formData !== 'boolean' && formData?.file && formData?.filename) {
                    switch (key) {
                        case formData.file:
                            newFormdata.append(key, value, beforeDody[formData.filename])
                            break
                        case formData.filename:
                            break
                        default:
                            newFormdata.append(key, value)
                            break
                    }
                } else {
                    newFormdata.append(key, value)
                }
            })
            body = newFormdata
        } else {
            // JSON格式
            body = JSON.stringify(formatData(url, customOptions, data))
        }

        newOptions = {
            ...newOptions,
            body
        }
    }

    return newOptions
}

export default formatOptions
