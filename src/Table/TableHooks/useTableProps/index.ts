/* eslint-disable react-compiler/react-compiler */
import { useMemo } from 'react';

import { FixedTwo } from '../../TableUtils';

import type { TableDataItem, TableProps } from '../../TableTypes/type';

type Props<T extends TableDataItem> = {
	props: TableProps<T>;
};

// table props处理
const useTableProps = <T extends TableDataItem>({ props }: Props<T>) => {
	const nextProps = {
		...props,
		theme: props.theme ?? 'light',
		virtualFlushSync: props.virtualFlushSync ?? true,
		rowHeight: props.rowHeight ? FixedTwo(props.rowHeight) : 46,
		// 避免组件内声明，触发重复渲染
		highlightKeywords: useMemo(() => props.highlightKeywords, [JSON.stringify(props?.highlightKeywords)]),
	};
	// 屏蔽掉data和columns
	return nextProps as unknown as Omit<typeof nextProps, 'data' | 'columns'>;
};

export default useTableProps;
