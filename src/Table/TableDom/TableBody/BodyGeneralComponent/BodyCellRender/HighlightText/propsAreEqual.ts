import { getPropsAreEqual } from '../../../../../TableUtils';

import type { Props } from './index';
import type { TableDataItem } from '../../../../../TableTypes/type';
import type { TableInstance } from '../../../../../TableTypes/typeHooks';

export const getProps = <T extends TableDataItem>({ children, columnHighlightKeywords }: Readonly<Props<T>>) => {
	return { children, columnHighlightKeywords };
};

export const getInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	const { highlightKeywords } = instance.tableProps;
	const { trim, caseSensitive, autoEscape } = instance.tableProps.highlightConfig ?? {};
	return { highlightKeywords, trim, caseSensitive, autoEscape };
};

export const getTotalInstanceProps = getInstanceProps;

const propsAreEqual = getPropsAreEqual({ getProps, getTotalInstanceProps });

export default propsAreEqual;
