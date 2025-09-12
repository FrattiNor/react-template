import type { FC } from 'react';
import styles from './index.module.less';
import { useTableContext } from '../../../TableContext';
import classNames from 'classnames';

type Props = {
	rowIndex: number;
};

const HeadCellPlaceholder: FC<Props> = ({ rowIndex }) => {
	const { tableProps } = useTableContext();
	const { columnsFlat, bordered } = tableProps;
	const colMaxIndex = columnsFlat.length - 1;

	return (
		<div
			className={classNames(styles['head-cell-placeholder'], { [styles['bordered']]: bordered })}
			style={{
				gridRow: `${1}/${rowIndex + 2}`,
				gridColumn: `${colMaxIndex + 2}/${colMaxIndex + 3}`,
			}}
		/>
	);
};

export default HeadCellPlaceholder;
