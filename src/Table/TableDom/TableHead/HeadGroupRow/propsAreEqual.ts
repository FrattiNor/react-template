import type { Props } from './index';
import type { TableDataItem } from '../../../TableTypes/type';
import type { TableInstance } from '../../../TableHooks/type';
import { getPropsAreEqual } from '../../../TableUtils';
import { getInstanceProps as HeadGroupCell_getInstanceProps } from '../HeadGroupCell/propsAreEqual';

export const getProps = <T extends TableDataItem>({ rowIndex }: Readonly<Props<T>>) => {
	return { rowIndex };
};

export const getInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	const { columnGroups } = instance.tableProps;
	return {
		columnGroups,
	};
};

const propsAreEqual = getPropsAreEqual({
	getProps,
	getInstanceProps: <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
		return {
			...getInstanceProps({ instance }),
			...HeadGroupCell_getInstanceProps({ instance }),
		};
	},
});

export default propsAreEqual;
