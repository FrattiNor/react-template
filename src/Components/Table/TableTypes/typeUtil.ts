// export type Undefined2Null<T> = {
// 	[P in keyof T]-?: T[P] extends Required<T>[P] ? T[P] : T[P] | null;
// };

// 取对象对应value的key
export type ValueTypeKeys<T, Type> = { [K in keyof T]: T[K] extends Type ? K : never }[keyof T];
