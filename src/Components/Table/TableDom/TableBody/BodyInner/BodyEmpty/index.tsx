import { memo } from 'react';

import type { TableInstance } from '../../../../useTableInstance';

type Props<T> = Required<Pick<TableInstance<T>, 'h_scrollbar'>>;

const BodyEmpty = <T,>({ h_scrollbar }: Props<T>) => {
	return (
		<div
			style={{
				left: 0,
				height: 200,
				position: 'sticky',
				width: h_scrollbar.wrapperSize,
				backgroundColor: 'var(--table-bg)',
				// backgroundColor: 'rgba(0,0,0,0.15)',
			}}
		/>
	);
};

export default memo(BodyEmpty);
