import { memo } from 'react';

import classNames from 'classnames';

import BodyEmpty from './BodyGeneralComponent/BodyEmpty';
import MeasureColumnSize from './BodyGeneralComponent/MeasureColumnSize';
import BodyInner from './BodyInner';
import BodyInnerDraggable from './BodyInnerDraggable';
import styles from './index.module.less';
import propsAreEqual, { getInstanceProps } from './propsAreEqual';

import type { TableDataItem, TableInstance } from '../../TableTypes/type';

export type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
};

const TableBody = <T extends TableDataItem>(props: Props<T>) => {
	const { datasource, bordered, bodyRef, haveDraggable, colMeasure } = getInstanceProps(props);
	const notEmpty = Array.isArray(datasource) && datasource.length > 0;

	return (
		<div ref={bodyRef} className={classNames(styles['body'], { [styles['bordered']]: bordered })}>
			{colMeasure.measure && <MeasureColumnSize instance={props.instance} />}
			{!notEmpty && <BodyEmpty instance={props.instance} />}
			{notEmpty && !haveDraggable && <BodyInner instance={props.instance} />}
			{notEmpty && haveDraggable && <BodyInnerDraggable instance={props.instance} />}
		</div>
	);
};

export default memo(TableBody, propsAreEqual) as typeof TableBody;
