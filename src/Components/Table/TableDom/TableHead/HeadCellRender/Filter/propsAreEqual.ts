import { getPropsAreEqual } from '../../../../TableUtils';

import type { Props } from './index';

export const getProps = ({ column, tableRef, filterOpenKey, setFilterOpenKey }: Readonly<Props>) => {
	return { column, tableRef, filterOpenKey, setFilterOpenKey };
};

const propsAreEqual = getPropsAreEqual({ getProps });

export default propsAreEqual;
