import { useMemo, useState } from 'react';

import Checkbox from 'antd/es/checkbox';

import type { TableDataItem } from '../../TableTypes/type';
import type { TableColumn } from '../../TableTypes/typeColumn';
import type useTableData from '../useTableData';
import type useTableProps from '../useTableProps';
import type { useTableTools_1 } from '../useTableTools';

type Props<T extends TableDataItem> = {
	tableData: ReturnType<typeof useTableData<T>>;
	tableProps: ReturnType<typeof useTableProps<T>>;
	tableTools_1: ReturnType<typeof useTableTools_1<T>>;
};

// 行选择
const useTableRowSelection = <T extends TableDataItem>({ tableProps, tableData, tableTools_1 }: Props<T>) => {
	const { getRowKey } = tableTools_1;
	const haveRowSelection = !!tableProps?.rowSelection;
	const { datasource, dataKeys, dataKeysObj } = tableData;
	const getCheckboxProps = tableProps?.rowSelection?.getCheckboxProps;
	const _selectedRowKeys = tableProps?.rowSelection?.selectedRowKeys;
	const _setSelectedRowKeys = tableProps?.rowSelection?.onSelectedRowKeysChange;

	const [__selectedRowKeys, __setSelectedRowKeys] = useState<string[]>([]);
	const selectedRowKeys = _selectedRowKeys ?? __selectedRowKeys;
	const setSelectedRowKeys = _setSelectedRowKeys ?? __setSelectedRowKeys;

	// 将list转换为obj
	const selectRowKeysObj = useMemo(() => {
		const selectRowKeysObj: Record<string, boolean> = {};
		selectedRowKeys?.forEach((key) => {
			selectRowKeysObj[key] = true;
		});
		return selectRowKeysObj;
	}, [selectedRowKeys]);

	// 行选中的列配置
	const rowSelectionColumn = useMemo(() => {
		if (!haveRowSelection) return undefined;
		// 选中行个数
		let selectedCount = 0;
		// 禁用行个数
		let disabledCount = 0;
		// 行参数【目前只有disabled】
		const rowPropsObjs: Record<string, { disabled: boolean }> = {};
		// 遍历数据源
		datasource.forEach((item, index) => {
			// 获取行key
			const rowKey = getRowKey(item, index);
			// 获取行选中状态
			const selected = selectRowKeysObj[rowKey];
			// 获取行禁用状态
			const disabled = getCheckboxProps ? (getCheckboxProps(item).disabled ?? false) : false;
			// 赋值行参数
			rowPropsObjs[rowKey] = { disabled };
			// 修改选中行个数
			if (selected) selectedCount++;
			// 修改禁用行个数
			if (disabled) disabledCount++;
		});
		// 全部选中
		const totalSelected = selectedCount !== 0 && selectedCount === datasource.length;
		// 一半选中
		const halfSelected = !totalSelected && selectedCount > 0;
		// 全部禁用
		const totalDisabled = disabledCount === datasource.length;
		// 列标题
		const columnTitle = (
			<Checkbox
				checked={totalSelected}
				disabled={totalDisabled}
				indeterminate={halfSelected}
				onClick={(e) => e.stopPropagation()}
				onChange={(e) => setSelectedRowKeys(e.target.checked ? dataKeys : [])}
			/>
		);
		// 列选中状态变更
		const rowChange = (rowKey: string, checked: boolean) => {
			setSelectedRowKeys((oldKeys) => {
				const keys: string[] = [];
				oldKeys.forEach((key) => dataKeysObj[key] === true && !(!checked && rowKey === key) && keys.push(key));
				if (checked) keys.push(rowKey);
				return keys;
			});
		};
		// 列render
		const columnRender: TableColumn<T>['render'] = (item, { index }) => {
			const rowKey = getRowKey(item, index);
			return (
				<Checkbox
					onClick={(e) => e.stopPropagation()}
					checked={selectRowKeysObj[rowKey] ?? false}
					disabled={rowPropsObjs[rowKey]?.disabled ?? false}
					onChange={(e) => rowChange(rowKey, e.target.checked)}
				/>
			);
		};
		// 列配置
		const column: TableColumn<T> = {
			width: 50,
			flexGrow: 0,
			fixed: 'left',
			resize: false,
			align: 'center',
			key: 'rowSelection',
			title: columnTitle,
			render: columnRender,
		};

		return column;
	}, [haveRowSelection, datasource, selectRowKeysObj, getRowKey]);

	return { rowSelectionColumn, selectRowKeysObj };
};

export default useTableRowSelection;
