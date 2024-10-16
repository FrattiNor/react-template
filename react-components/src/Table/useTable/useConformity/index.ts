import { type CSSProperties } from 'react';

import { type HandledColumn } from '../../type';
import {
	type HandledProps,
	type BodyObserver,
	type Pagination,
	type Expandable,
	type DataSource,
	type RowSelection,
	type EditStore,
	type ResizeWidth,
	type HandledColumnsObj,
	type VirtualCore,
	type RowClickStore,
	type ColumnsGridSizeAndSticky,
} from '../type';

type Props<T> = {
	bodyRef: React.RefObject<HTMLDivElement>;
	headRef: React.RefObject<HTMLDivElement>;
	summaryRef: React.RefObject<HTMLDivElement>;
	handledProps: HandledProps<T>;
	bodyObserver: BodyObserver;
	pagination: Pagination;
	expandable: Expandable<T>;
	dataSource: DataSource<T>;
	rowSelection: RowSelection<T>;
	editStore: EditStore<T>;
	resizeWidth: ResizeWidth;
	handledColumnsObj: HandledColumnsObj<T>;
	virtual: VirtualCore<T>;
	rowClickStore: RowClickStore;
	columnsGridSizeAndSticky: ColumnsGridSizeAndSticky<T>;
};

const useConformity = <T>(props: Props<T>) => {
	const {
		bodyRef,
		headRef,
		summaryRef,
		handledProps,
		pagination,
		dataSource,
		rowSelection,
		editStore,
		resizeWidth,
		rowClickStore,
		virtual,
		handledColumnsObj,
		columnsGridSizeAndSticky,
	} = props;

	const { horizontalItemSizeCache } = virtual;

	const { resized, resizeActiveKey, resizeActiveWidth } = resizeWidth;

	// 判断 dataSource 为空
	const isEmpty = !(Array.isArray(handledProps.dataSource) && handledProps.dataSource.length > 0);

	// 通过handledColumn获取测量Style
	const getMeasureStyle = (column: HandledColumn<T>): CSSProperties => {
		if (resized) {
			return {
				width: resizeActiveKey === column.key ? (resizeActiveWidth as number) : (horizontalItemSizeCache.get(column.key) ?? column.width),
			};
		}
		return { width: resizeActiveKey === column.key ? (resizeActiveWidth as number) : column.width, flexGrow: column.flexGrow };
	};

	return {
		bodyRef,
		headRef,
		summaryRef,
		editStore,
		handledProps,
		virtual,
		resizeWidth,
		pagination,
		dataSource,
		rowSelection,
		rowClickStore,
		handledColumnsObj,
		columnsGridSizeAndSticky,
		// 额外增加
		isEmpty,
		getMeasureStyle,
	};
};

export default useConformity;
