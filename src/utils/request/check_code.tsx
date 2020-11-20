// import { message } from 'antd'
// import { dispatch } from '@/index'

// 检查状态
const checkCode = (response: Response, customOptions: requestCustomOptions = {}, resolve: Function, reject: Function): void => {
    const { responseType = 'json' } = customOptions

    const { status } = response

    // 获取reponse的克隆
    const getCloneResponse = (): Response => response.clone()

    // 获取错误
    const getError = async (): Promise<any> => {
        const cloneResponse = getCloneResponse()
        const { error } = await cloneResponse.json()
        reject({ error })
    }

    // 获取成功, 如果有消息就弹出
    const getSuccess = async (): Promise<any> => {
        const cloneResponse = getCloneResponse()
        const { success, data } = await cloneResponse.json()
        // if (success) {
        //     message.success(success)
        // }
        resolve(data)
    }

    // 获取文件
    const getFile = async (): Promise<any> => {
        const cloneResponse = getCloneResponse()
        const reg = /filename="(.*)"/ // 文件名匹配正则
        const name = reg.exec(cloneResponse.headers.get('content-disposition') || '')?.[1] // headers.content-disposition 中 匹配 filename，headers获取内容必须使用get，否则获取不到
        const filename = name ? decodeURI(name) : '后端未返回文件名'
        const file = await cloneResponse.blob()
        resolve({ file, filename })
    }

    // 获取JSON数据
    const getJSON = async (): Promise<any> => {
        const cloneResponse = getCloneResponse()
        const { code } = await cloneResponse.json()
        // 判断返回的code码
        switch (code) {
            case '00000':
                getSuccess()
                break
            // 00000 以外一律返回error
            default:
                getError()
                break
        }
    }

    // ============================================================ //
    // 判断status
    switch (Math.floor(status / 100)) {
        case 5:
            reject({ error: '服务器错误' })
            // reject 和 resolve 不会阻止后续代码执行 所以 return
            return
        case 3:
            break
        case 2:
            break
        default:
            getError()
            // reject 和 resolve 不会阻止后续代码执行 所以 return
            return
    }

    // 判断responseType
    switch (responseType) {
        case 'json':
            getJSON()
            break
        case 'file': {
            getFile()
            break
        }
        default:
            break
    }
    // ============================================================ //
}

export default checkCode
