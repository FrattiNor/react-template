import { Fragment, useState } from 'react';

import CellTextArea from './CellTextArea';
import { getEditValue, getShowValue } from './utils';
import { useTableContext } from '../../../../../TableContext';
import { type AnyObj, type TableColumnEdit } from '../../../../../type';
import styles from '../../../index.module.less';

type Props<T> = {
	rowData: T;
	rowKey: string;
	cellKey: string;
	rowIndex: number;
	minHeight: number;
	paddingLeft?: number;
	edit: TableColumnEdit<T>;
	cellValue: null | undefined | string | number;
};

const EditCell2 = <T extends AnyObj>(props: Props<T>) => {
	const { enable, saveEdit } = props.edit;
	const { editStoreCellValues, setEditStoreCellValues } = useTableContext().editStore;
	const { rowData, rowIndex, cellKey, rowKey, cellValue, minHeight, paddingLeft } = props;

	// table-grid的key
	const gridKey = `${cellKey}-${rowKey}`;
	// 是否处于编辑状态
	const [isEdit, setEdit] = useState(false);
	// cell的值，编辑过后会将值存入editStoreCellValues
	const value = editStoreCellValues[gridKey] ?? cellValue;
	// 是否可以编辑
	const canEdit = typeof enable === 'boolean' ? enable : typeof enable === 'function' ? enable(rowData, rowIndex) : false;

	// 退出编辑状态 并触发保存
	const exitEdit = (nextValue: string) => {
		// 当前值
		const currentValue = getEditValue(value);
		// 退出编辑状态
		setEdit(false);
		// 更新值
		setEditStoreCellValues((old) => ({ ...old, [gridKey]: nextValue }));
		// 如果值有变化
		if (nextValue !== currentValue) {
			// 保存编辑
			saveEdit(nextValue, rowData, rowIndex).catch(() => {
				// 保存失败时，恢复原值
				setEditStoreCellValues((old) => ({ ...old, [gridKey]: currentValue }));
			});
		}
	};

	return (
		<Fragment>
			{!isEdit ? (
				<div
					title={getShowValue(value)}
					style={{ minHeight, paddingLeft }}
					onDoubleClick={() => canEdit && setEdit(true)}
					className={styles['body-cell-editor-inner']}
				>
					<div className={styles['body-cell-editor-str']}>{getShowValue(value)}</div>
				</div>
			) : (
				<CellTextArea defaultValue={getEditValue(value)} exitEdit={exitEdit} />
			)}
		</Fragment>
	);
};

export default EditCell2;
