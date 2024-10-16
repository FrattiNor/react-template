import { type CSSProperties, useMemo } from 'react';

import classNames from 'classnames';

import styles from './sticky.module.less';
import { type HandledColumn } from '../../type';
import { type VirtualCore, type ResizeWidth, type BodyObserver, type HandledColumnsObj } from '../type';

type Opt<T> = {
	virtual: VirtualCore<T>;
	resizeWidth: ResizeWidth;
	bodyObserver: BodyObserver;
	handledColumnsObj: HandledColumnsObj<T>;
};

const useColumnsGridSizeAndSticky = <T,>({ virtual, resizeWidth, bodyObserver, handledColumnsObj }: Opt<T>) => {
	const { horizontalItemSizeCache } = virtual;

	const { pingLeft, pingRight, vScrollBarWidth } = bodyObserver;

	const { resized, resizeActiveKey, resizeActiveWidth } = resizeWidth;

	const { handledColumnsKeyStr, handledColumns, originHorizontalTotalSize } = handledColumnsObj;

	// 通过handledColumn获取宽度
	const getHandledColumnWidth = (column: HandledColumn<T>) => {
		return resizeActiveKey === column.key ? (resizeActiveWidth as number) : (horizontalItemSizeCache.get(column.key) ?? column.width);
	};

	// 遍历handledColumns
	// 计算横向宽度
	// 计算横向sizeArr
	// 计算gridTemplateColumns
	const { gridTemplateColumns, headGridTemplateColumns, horizontalTotalSize, headHorizontalTotalSize, leftStickyObj, rightStickyObj } =
		useMemo(() => {
			let horizontalTotalSize = 0;
			const gridTemplateColumnsArr: string[] = [];

			let stickyLeftNum = 0;
			let stickyRightNum = 0;
			let stickyScrollNum = 0;
			const leftStickyObj: Record<string, { stickyNum: number; scrollNum: number; index: number }> = {};
			const rightStickyObj: Record<string, { stickyNum: number; scrollNum: number; index: number }> = {};

			for (let i = 0; i < handledColumns.length; i++) {
				const column = handledColumns[i];
				const width = getHandledColumnWidth(column);
				gridTemplateColumnsArr.push(`${width}px`);
				horizontalTotalSize += width;
				if (column.fixed === 'left') {
					leftStickyObj[column.key] = { stickyNum: stickyLeftNum, scrollNum: stickyScrollNum, index: i };
					stickyLeftNum += width;
				} else {
					stickyScrollNum += width;
				}
			}

			stickyScrollNum = 0;
			for (let i = 0; i < handledColumns.length; i++) {
				const column = handledColumns[handledColumns.length - 1 - i];
				const width = getHandledColumnWidth(column);
				if (column.fixed === 'right') {
					rightStickyObj[column.key] = { stickyNum: stickyRightNum, scrollNum: stickyScrollNum, index: i };
					stickyRightNum += width;
				} else {
					stickyScrollNum += width;
				}
			}

			const gridTemplateColumns = gridTemplateColumnsArr.join(' ');

			if (vScrollBarWidth > 0) gridTemplateColumnsArr.push(`${vScrollBarWidth}px`);

			const headGridTemplateColumns = gridTemplateColumnsArr.join(' ');

			const headHorizontalTotalSize = horizontalTotalSize + vScrollBarWidth;

			return { gridTemplateColumns, headGridTemplateColumns, horizontalTotalSize, headHorizontalTotalSize, leftStickyObj, rightStickyObj };
		}, [resizeActiveKey, resizeActiveWidth, horizontalItemSizeCache, handledColumnsKeyStr, vScrollBarWidth]);

	// 获取sticky相关样式
	// 获取sticky相关样式
	const getStickyStyleClass = (key: string, type: 'body' | 'head' | 'summary'): { class?: string; style?: CSSProperties } => {
		const leftObj = leftStickyObj[key];
		if (leftObj) {
			const { stickyNum, scrollNum, index } = leftObj;
			const pinged = pingLeft > scrollNum;
			return {
				style: { position: 'sticky', left: stickyNum, zIndex: pinged ? 3 + index : 2 },
				class: classNames(styles['sticky-left'], { [styles['pinged']]: pinged }),
			};
		}
		const rightObj = rightStickyObj[key];
		if (rightObj) {
			const { stickyNum, scrollNum, index } = rightObj;
			let right = stickyNum;
			if (type !== 'body') right += vScrollBarWidth;
			const pinged = pingRight > scrollNum;
			return {
				style: { position: 'sticky', right, zIndex: pinged ? 3 + index : 2 },
				class: classNames(styles['sticky-right'], { [styles['pinged']]: pinged }),
			};
		}
		return { style: undefined, class: classNames() };
	};

	// 避免纵向滚动条出现导致 body的横向区域变窄出现横向滚动条，然后触发重新计算宽度后恢复正常，横向滚动条又消失的闪烁问题
	// resized后宽度固定不存在滚动条闪烁
	// resized前，horizontalTotalSize > originHorizontalTotalSize 说明经过了flexGrow，可以判断没有横向滚动的情况
	const bodyOverflowX: CSSProperties['overflowX'] = resized ? 'auto' : horizontalTotalSize > originHorizontalTotalSize ? 'hidden' : 'auto';

	return {
		bodyOverflowX,
		getStickyStyleClass,
		gridTemplateColumns,
		headGridTemplateColumns,
		horizontalTotalSize,
		headHorizontalTotalSize,
	};
};

export default useColumnsGridSizeAndSticky;
