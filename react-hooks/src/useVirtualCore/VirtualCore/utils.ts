import type { IndexOffsetItem } from './type';

// 二分查找最接近的Index
// lowIndex 最小Index
// highIndex 最大Index
// indexOffsets 通过Index查询对应Index的offset
// offset 当前offset
// calcType计算使用的key

export const findIndexByBinarySearchStart = (lowIndex: number, highIndex: number, indexOffsets: IndexOffsetItem[], offset: number) => {
    const firstLowIndex = lowIndex;
    while (lowIndex <= highIndex) {
        const middleIndex = ((lowIndex + highIndex) / 2) | 0;
        const middleIndexOffset = indexOffsets[middleIndex]['start'] ?? 0;

        if (middleIndexOffset < offset) {
            lowIndex = middleIndex + 1;
        } else if (middleIndexOffset > offset) {
            highIndex = middleIndex - 1;
        } else {
            return middleIndex;
        }
    }

    if (lowIndex > firstLowIndex) {
        return lowIndex - 1;
    } else {
        return firstLowIndex;
    }
};

export const findIndexByBinarySearchEnd = (lowIndex: number, highIndex: number, indexOffsets: IndexOffsetItem[], offset: number) => {
    const firstHighIndex = highIndex;
    while (lowIndex <= highIndex) {
        const middleIndex = ((lowIndex + highIndex) / 2) | 0;
        const middleIndexOffset = indexOffsets[middleIndex]['end'] ?? 0;

        if (middleIndexOffset < offset) {
            lowIndex = middleIndex + 1;
        } else if (middleIndexOffset > offset) {
            highIndex = middleIndex - 1;
        } else {
            return middleIndex;
        }
    }

    if (highIndex < firstHighIndex) {
        return highIndex + 1;
    } else {
        return firstHighIndex;
    }
};
