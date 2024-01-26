import { Dayjs } from 'dayjs';

export const isFormData = (value: unknown): value is FormData => value instanceof FormData;
export const isObject = (value: unknown): value is object => Object.prototype.toString.call(value) === '[object Object]';
export const isNumber = (value: unknown): value is number => typeof value === 'number';
export const isString = (value: unknown): value is string => typeof value === 'string';
export const isUndefined = (value: unknown): value is undefined => value === undefined;
export const isNull = (value: unknown): value is null => value === null;
export const isArr = (value: unknown): value is any[] => Array.isArray(value);
export const isDayjs = (v: any): v is Dayjs => typeof v?.isValid === 'function' && v.isValid() === true;
export const isDate = (v: unknown): v is Date => v instanceof Date;
