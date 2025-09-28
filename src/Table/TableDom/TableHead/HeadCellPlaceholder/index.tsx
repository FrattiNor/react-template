import { memo } from 'react';

import classNames from 'classnames';

import styles from './index.module.less';
import propsAreEqual, { getInstanceProps, getProps } from './propsAreEqual';

import type { TableDataItem } from '../../../TableTypes/type';
import type { TableInstance } from '../../../TableTypes/typeHooks';

export type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
	rowIndex: number;
};

const HeadCellPlaceholder = <T extends TableDataItem>(props: Props<T>) => {
	const { rowIndex } = getProps(props);
	const { colMaxIndex, bordered, pingedHeadPlaceholder, pingedRightLast } = getInstanceProps(props);

	return (
		<div
			className={classNames(styles['head-cell-placeholder'], {
				[styles['first-row']]: true,
				[styles['bordered']]: bordered,
				[styles['border-left']]: pingedHeadPlaceholder === true && pingedRightLast === undefined,
			})}
			style={{
				gridRow: `${1}/${rowIndex + 2}`,
				gridColumn: `${colMaxIndex + 2}/${colMaxIndex + 3}`,
			}}
		/>
	);
};

export default memo(HeadCellPlaceholder, propsAreEqual) as typeof HeadCellPlaceholder;
