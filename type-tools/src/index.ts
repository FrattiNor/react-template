// === ↓官方工具类型↓ ===
// https://juejin.cn/post/7012897528500731912#heading-19
// https://ts.nodejs.cn/docs/handbook/utility-types.html#partialtype

// 操作接口类型【操作接口】
// Partial 将一个类型的所有属性变为可选的
// Required 将一个类型的所有属性变为必填的
// Readonly 将一个类型的所有属性设为只读
// Pick 从一个类型中选取出指定的键值
// Omit 从一个类型中排除指定的键值

// 联合类型【操作联合】
// Exclude 从联合类型中去除指定的类型
// Extract 从联合类型中提取指定的类型
// NonNullable 从联合类型中去除 null 或者 undefined 的类型
// Record 生成接口类型

// 函数类型
// ConstructorParameters 获取构造函数的构造参数
// Parameters 获取函数的参数
// ReturnType 获取函数的返回类型
// ThisParameterType 获取函数的 this 参数类型
// ThisType 在对象字面量中指定 this 的类型
// OmitThisParameter 去除函数类型中的 this 类型

// 字符串类型
// Uppercase 转换字符串字面量到大写字母
// Lowercase 转换字符串字面量到小写字母
// Capitalize 转换字符串字面量的第一个字母为大写字母
// Uncapitalize 转换字符串字面量的第一个字母为小写字母

// === ↓自定义工具类型↓ ===

// 获取T中value为Type的key的集合
export type ValueTypeKeys<T, Type> = { [K in keyof T]: T[K] extends Type ? K : never }[keyof T];
// 将T中的K属性变为可选
export type PartialKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
