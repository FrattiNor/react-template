import { memo } from 'react';
import type { TableInstance } from '../../../TableHooks/type';
import type { TableDataItem } from '../../../TableTypes/type';
import propsAreEqual from './propsAreEqual';

export type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
};

const BodyEmpty = <T extends TableDataItem>({ instance }: Props<T>) => {
	const { HTotalSize } = instance.tableSecondaryState;
	return <div style={{ width: HTotalSize, minWidth: '100%', backgroundColor: 'rgba(0,0,0,0.05)', height: '200px' }} />;
};

export default memo(BodyEmpty, propsAreEqual) as typeof BodyEmpty;
