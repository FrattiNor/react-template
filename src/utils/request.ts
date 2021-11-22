/**
 * @description 请求方法
 */

import qs from 'qs'
import { message } from 'antd'
import { isArray, isBoolean, isFunction, isNumber, isObject, isString } from './judge-type'
import H from 'history'

interface Options extends RequestInit {
    token?: boolean // 是否需要token
    body?: any // 重写body格式
    file?: boolean // 文件
    debounce?: number // 防抖
    throttle?: number // 节流
}

const timeout: anyObject = {}

type successParams = string | (() => string)

// 格式化 get 请求的body
const formatGetBody = (body: anyObject): anyObject => {
    const newBody: anyObject = {}
    Object.entries(body).forEach(([k, v]) => {
        if (isArray(v)) {
            newBody[k] = v.join(',')
        } else if (isObject(v)) {
            newBody[k] = formatGetBody(v)
        } else if (isString(v) || isNumber(v)) {
            newBody[k] = v
        } else {
            message.error('get 请求 body 解析错误！')
        }
    })
    return newBody
}

const request = (method: RequestInit['method']) => {
    return (url: RequestInfo, options?: Options, successText?: successParams): Promise<any> => {
        const { body, file, debounce, throttle, ...otherOptions } = options || {}

        return new Promise((resolve, reject) => {
            let routeControl: any

            const rejectError = (e: Error): void => {
                reject({ errorMessage: e.message, routeControl })
            }

            const throwError = (e: string): void => {
                throw new Error(e)
            }

            // 验证http的status
            const checkResponseStatus = (response: Response): Response => {
                const { status } = response
                const statusNumber = Math.floor(status / 100)
                switch (statusNumber) {
                    case 5: {
                        throwError('服务器错误')
                        break
                    }
                    case 4: {
                        throwError('接口调用错误')
                        break
                    }
                    case 3: {
                        break
                    }
                    case 2: {
                        return response
                    }
                    case 1: {
                        break
                    }
                    default: {
                        throwError('未知错误')
                        break
                    }
                }
                return response
            }

            // 返回结果
            const handleResult = (response: Response): any => {
                if (file) {
                    // 必须确保response headers下content-disposition字段的filename格式正确（filename="文件名.扩展名"），否则导出文件会有问题
                    const match = /filename="(.*)"/gi.exec(response.headers.get('content-disposition') || '')
                    return { status: 200, data: { content: response.blob(), filename: match !== null ? decodeURI(match[1]) : null } }
                } else {
                    return response.json()
                }
            }

            // 验证返回值status
            const checkDataStatus = (result: any): void => {
                const res = isObject(result) ? result : {}
                const { status, data, error } = res
                switch (status) {
                    case 200: {
                        const res = data || {}
                        // 成功的使用前端定义，错误走后端定义
                        if (successText) {
                            if (isFunction(successText)) {
                                message.success((successText as Function)(res))
                            } else {
                                message.success(successText)
                            }
                        }
                        resolve(res)
                        break
                    }
                    case 401: {
                        routeControl = (h: H.History): void => h.push('/login')
                        throwError(error || '未授权')
                        break
                    }
                    case 403: {
                        throwError(error || '访问被禁止')
                        break
                    }
                    case 500: {
                        throwError(error || '系统内部错误')
                        break
                    }
                    case 1000: {
                        throwError(error || '验证码错误')
                        break
                    }
                    case 1001: {
                        throwError(error || '账号或密码错误')
                        break
                    }
                    case 1002: {
                        throwError(error || '资源已存在')
                        break
                    }
                    case 1003: {
                        throwError(error || '缺少必要资源')
                        break
                    }
                    case 1004: {
                        throwError(error || '无法操作被保护的资源')
                        break
                    }
                    default: {
                        throwError(error || '未知错误')
                        break
                    }
                }
            }

            // 发送http请求
            const sendHttpRequest = (): void => {
                // format get 请求的 url
                const trueUrl =
                    method === 'GET' && isObject(body) && Object.keys(body).length > 0 ? `${url}?${qs.stringify(formatGetBody(body))}` : url
                // format body
                const trueBody = method !== 'GET' && isObject(body) && Object.keys(body).length > 0 ? JSON.stringify(body) : null
                // 是否是 formData
                const isFormData = body instanceof FormData

                fetch(trueUrl, {
                    method,
                    body: trueBody,
                    credentials: 'include',
                    headers: {
                        'Cache-Control': 'no-store',
                        Pragma: 'no-cache',
                        Accept: 'application/json',
                        ...(isFormData ? {} : { 'Content-Type': 'application/json; charset=utf-8' }),
                        ...(otherOptions?.headers || {})
                        // ...(token && getToken() ? { Authorization: `Bearer ${getToken()}` } : {})
                    },
                    ...otherOptions
                })
                    .then(checkResponseStatus)
                    .then(handleResult)
                    .then(checkDataStatus)
                    .catch(rejectError)
            }

            if (isNumber(debounce)) {
                // 防抖
                const key = `${url}+${method}`
                clearTimeout(timeout[key])
                timeout[key] = setTimeout(() => {
                    sendHttpRequest()
                }, debounce)
            } else if (isNumber(throttle)) {
                // 节流
                const key = `${url}+${method}`
                if (!isBoolean(timeout[key]) || timeout[key] === true) {
                    timeout[key] = false
                    sendHttpRequest()
                    setTimeout(() => {
                        timeout[key] = true
                    }, throttle)
                }
            } else {
                sendHttpRequest()
            }
        })
    }
}

request.get = request('GET')
request.post = request('POST')
request.delete = request('DELETE')
request.put = request('PUT')

export default request
