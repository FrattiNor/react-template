/**
 * 二分查找方法
 * @param target 要查找的值
 * @param count 有序数组的数量
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

function binarySearch({ target, getSize, startIndex, endIndex }: BinarySearchProps): [number, number] {
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

export default binarySearch;
