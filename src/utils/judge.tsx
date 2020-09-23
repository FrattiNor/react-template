// 4种判断方式
// typeof 基本判断方式
// instanceof 判断A是否为B的实例
// Object.prototype.toSting.call Object的原型方法
// constructor 判断实例B的构造函数是否为A

// 判断 布尔类型
const isBoolean = (item: any): boolean => typeof item === 'boolean'
// 判断 null
const isNull = (item: any): boolean => Object.prototype.toString.call(item) === '[object Null]'
// 判断 undefined
const isUndefined = (item: any): boolean => typeof item === 'undefined'
// 判断 数字
const isNumber = (item: any): boolean => typeof item === 'number'
// 判断 BigInt
// BigInt是一种数字类型的数据，它可以表示任意精度格式的整数。表现为数字后携带n，可以使用构造函数创建，可以安全使用比Number.MAX_SAFE_INTEGER大的数字
const isBigInt = (item: any): boolean => typeof item === 'bigint'
// 判断字符串
const isString = (item: any): boolean => typeof item === 'string'
// 判断 symbol
const isSymbol = (item: any): boolean => typeof item === 'symbol'

// 判断为对象
const isObject = (item: any): boolean => Object.prototype.toString.call(item) === '[object Object]'
// 判断数组
const isArray = (item: any): boolean => Array.isArray(item)
// 判断方法
const isFunction = (item: any): boolean => typeof item === 'function'
// 判断为Promise
const isPromise = (item: any): boolean => Object.prototype.toString.call(item) === '[object Promise]'

export { isBoolean, isNull, isUndefined, isNumber, isBigInt, isString, isSymbol, isObject, isArray, isFunction, isPromise }
