type requestOptions = {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' // 请求方式
    data?: anyObject // 在get时为url上的queryparams参数，其他请求方式为options的body
    headers?: object // headers
    credentials?: 'include' | 'same-origin' | 'omit' // cookie
  }
  
  type requestCustomOptions = {
    debounce?: number // 是否为防抖函数，同时也是防抖的时间
    throttle?: number // 是否为节流函数，同时也是节流的时间，（不能同时设置防抖和节流）
    // notCheckCodes?: string[] // 不进行校验的状态码
    needToken?: boolean // 是否携带token
    formData?: formData | boolean // body数据form-data格式，对get请求无效
    responseType?: 'file' | 'json' // 返回值是否是文件，默认为json
    timeOut?: number // 超时时间 默认10s 单位（毫秒）默认值 60 * 1000
    
    // 处理 和 格式化data时的一些参数
    arrayToStringKeys?: string[] // 需要将数组转为逗号分隔的字符串的key数组
    mustKeys?: string[] // 必须存在的key 当缺少对应值时，message提示缺少字段
    includeKeys?: string[] // 需要的key，不在列表中的key会被省略 和 excludeKeys只能存在一个 （优先级 高）
    excludeKeys?: string[] // 省略的key，当存在对应的key时省略掉
    jumpCheckKeys?: string[] // 跳过检查的key，不会校验各种省略空的判断
  }
  
  type formData = {
    // 如果填了这个，证明formdata的数据里有文件，会在文件记录里额外增加filename字段，同时去除filename本身这条记录
    file: string // 文件本身的key
    filename: string // 文件名的key
  }
  