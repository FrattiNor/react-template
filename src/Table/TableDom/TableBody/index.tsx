import { memo } from 'react';

import BodyEmpty from './BodyGeneralComponent/BodyEmpty';
import MeasureColumnSize from './BodyGeneralComponent/MeasureColumnSize';
import BodyInner from './BodyInner';
import BodyInnerDraggable from './BodyInnerDraggable';
import styles from './index.module.less';
import propsAreEqual, { getInstanceProps } from './propsAreEqual';

import type { TableDataItem } from '../../TableTypes/type';
import type { TableInstance } from '../../TableTypes/typeHooks';

export type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
};

const TableBody = <T extends TableDataItem>(props: Props<T>) => {
	const { datasource, bodyRef, haveDraggable, colMeasure } = getInstanceProps(props);
	const notEmpty = Array.isArray(datasource) && datasource.length > 0;

	return (
		<div className={styles['body']} ref={bodyRef}>
			{colMeasure.measure && <MeasureColumnSize instance={props.instance} />}
			{!notEmpty && <BodyEmpty instance={props.instance} />}
			{notEmpty && !haveDraggable && <BodyInner instance={props.instance} />}
			{notEmpty && haveDraggable && <BodyInnerDraggable instance={props.instance} />}
		</div>
	);
};

export default memo(TableBody, propsAreEqual) as typeof TableBody;
