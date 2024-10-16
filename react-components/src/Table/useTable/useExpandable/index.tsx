import { Fragment, useMemo } from 'react';

import { useMergeState } from '@react/hooks';

import ExpandableFC from './Expandable';
import { type TableColumn } from '../../type';
import { type HandledProps } from '../type';

export const tableExpandableKey = 'table-row-expandable';

const useExpandable = <T,>(handledProps: HandledProps<T>) => {
	const { rowKey, expandable } = handledProps;

	const [expandedRowKeys, setExpandedRowKeys] = useMergeState({
		defaultValue: [],
		state: expandable?.expandedRowKeys,
		setState: expandable?.onExpandedRowKeysChange,
	});

	// 将str转换为obj，方便使用
	const expandedRowKeysObj = useMemo(() => {
		const obj: Record<string, boolean> = {};
		if (expandable) {
			expandedRowKeys.forEach((key) => {
				obj[key] = true;
			});
		}
		return obj;
	}, [expandedRowKeys]);

	const expandableColumn = (() => {
		if (expandable) {
			const width = expandable?.width ?? 42;
			const childrenColumnName = expandable?.childrenColumnName ?? 'children';

			const renderItem = (item: T) => {
				const key = (typeof rowKey === 'function' ? rowKey(item) : item[rowKey]) as string;
				const children = (item as any)[childrenColumnName];
				const haveChild = Array.isArray(children) && children.length > 0;

				if (haveChild) {
					const onChange = (c: boolean) => {
						const nextRowKeysObj = { ...expandedRowKeysObj };
						if (c) {
							nextRowKeysObj[key] = true;
						} else {
							delete nextRowKeysObj[key];
						}
						setExpandedRowKeys(Object.keys(nextRowKeysObj));
					};

					return <ExpandableFC expanded={expandedRowKeysObj[key]} onChange={onChange} />;
				}

				return <Fragment />;
			};

			const column: TableColumn<T> = {
				width,
				flexGrow: 0,
				fixed: 'left',
				resize: false,
				align: 'center',
				render: renderItem,
				title: <Fragment />,
				key: tableExpandableKey,
			};

			return column;
		}

		return undefined;
	})();

	return { expandableColumn, expandedRowKeysObj, expandedRowKeys, setExpandedRowKeys };
};

export default useExpandable;
