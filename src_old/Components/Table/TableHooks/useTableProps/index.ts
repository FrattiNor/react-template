/* eslint-disable react-compiler/react-compiler */
import { useMemo } from 'react';

import { FixedTwo } from '../../TableUtils';

import type { TableDataItem } from '../../TableTypes/type';
import type { TableProps } from '../../TableTypes/typeProps';

type Props<T extends TableDataItem> = {
	props: TableProps<T>;
};

// table props处理
const useTableProps = <T extends TableDataItem>({ props }: Props<T>) => {
	const disabledRowSpan = props.draggable !== undefined || props.expandable !== undefined;

	const nextProps = {
		...props,
		// 内部生成的props
		disabledRowSpan,
		// 默认亮色主题
		theme: props.theme ?? 'light',
		// 默认最小cell高度
		rowHeight: props.rowHeight ? FixedTwo(props.rowHeight) : 46,
		// 避免组件内声明，触发重复渲染
		highlightKeywords: useMemo(() => props.highlightKeywords, [JSON.stringify(props?.highlightKeywords)]),
	};

	// 屏蔽掉data和columns
	return nextProps as unknown as Omit<typeof nextProps, 'data' | 'columns'>;
};

export default useTableProps;
