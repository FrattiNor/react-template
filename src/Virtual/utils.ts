import type { Props, SizeList } from './type';

export const getSizeList = <T>(data: T[], getItemKey: Props<T>['getItemKey'], getItemSize: Props<T>['getItemSize']) => {
	const sizeList: SizeList = [];
	data.forEach((item, index) => {
		const key = getItemKey(item, index);
		const size = getItemSize(item, index);
		const beforeEnd = sizeList[index - 1]?.end ?? 0;
		sizeList.push({
			key,
			index,
			start: beforeEnd,
			end: beforeEnd + size,
		});
	});
	return sizeList;
};

/**
 * 二分查找方法
 * @param target 要查找的值
 * @param getSize 获取数组中的值
 * @param startIndex 开始索引
 * @param endIndex 结束索引
 * @returns 最接近的左右索引
 */

type BinarySearchProps = {
	target: number;
	getSize: (index: number) => number;
	startIndex: number;
	endIndex: number;
};

export function binarySearch({ target, getSize, startIndex, endIndex }: BinarySearchProps): [number, number] {
	let left = startIndex;
	let right = endIndex;

	while (left <= right) {
		const mid = Math.floor((left + right) / 2);
		if (getSize(mid) === target) {
			return [mid, mid];
		} else if (getSize(mid) < target) {
			left = mid + 1;
		} else {
			right = mid - 1;
		}
	}

	// 没有找到
	return left < right ? [left, right] : [right, left];
}
