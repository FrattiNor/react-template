import { isEmpty } from '../empty';
import { isObject } from '../valueType';

/**
 * 将给定数组清除空数组，undefined，null，空字符串，空对象。
 * 支持嵌套对象、数组。
 * @param {Array<any>} arr - 要清除的数组。
 * @returns {Array<any>} - 返回的数组
 */
const cleanArr = <T extends Array<any>>(arr: T): T => {
	if (!Array.isArray(arr)) return arr;
	const nextArr: Array<any> = [];
	arr.forEach((item) => {
		if (isObject(item)) {
			nextArr.push(cleanRecord(item));
		} else if (Array.isArray(item)) {
			nextArr.push(cleanArr(item));
		} else if (!isEmpty(item)) {
			nextArr.push(item);
		}
	});
	return nextArr as T;
};

/**
 * 将给定对象清除空数组，undefined，null，空字符串，空对象。
 * 支持嵌套对象、数组。
 * @param {Record<string, any>} obj - 要清除的对象。
 * @returns {Record<string, any>} - 返回的对象
 */
const cleanRecord = <T extends Record<string, any>>(obj: T): T => {
	if (!isObject(obj)) return obj;
	const nextObj: Record<string, any> = {};
	Object.entries(obj).forEach(([key, value]) => {
		if (isObject(value)) {
			nextObj[key] = cleanRecord(value);
		} else if (Array.isArray(value)) {
			nextObj[key] = cleanArr(value);
		} else if (!isEmpty(value)) {
			nextObj[key] = value;
		}
	});
	return nextObj as T;
};

export default cleanRecord;
