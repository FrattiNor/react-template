import { getPropsAreEqual } from '../../../TableUtils';
import type { Props } from './index';

export const getProps = ({ column, align, tableRef }: Readonly<Props>) => {
	return { column, align, tableRef };
};

const propsAreEqual = getPropsAreEqual({ getProps });

export default propsAreEqual;
