import { type FC, type ReactNode, forwardRef, useImperativeHandle, memo } from 'react';

import { TableContext } from './TableContext';
import { type TableRef, type AnyObj, type TableProps } from './type';
import useTable from './useTable';

type NextComponentType = <T extends AnyObj>(props: TableProps<T> & React.RefAttributes<TableRef>) => ReactNode | null;

// Hoc
const TableContextHoc = (Component: FC) => {
	const NextComponent: NextComponentType = forwardRef((props, ref) => {
		const value = useTable(props);

		useImperativeHandle(ref, () => ({
			getOriginColumnsConf: value.handledColumnsObj.getOriginColumnsConf,
			getSortedColumnsConf: value.handledColumnsObj.getSortedColumnsConf,
			scrollTo: (options: { left?: number; top?: number; behavior?: 'auto' | 'instant' | 'smooth' }) => {
				if (value.bodyRef.current) value.bodyRef.current.scrollTo(options);
			},
		}));

		return <TableContext.Provider value={value}>{<Component />}</TableContext.Provider>;
	});

	return memo(NextComponent) as NextComponentType;
};

export default TableContextHoc;
