import { memo } from 'react';

import type { TableInstance } from '../../../../useTableInstance';

type Props<T> = Required<Pick<TableInstance<T>, 'bodyWidth'>>;

const BodyEmpty = <T,>({ bodyWidth }: Props<T>) => {
	return (
		<div
			style={{
				left: 0,
				height: 200,
				width: bodyWidth,
				position: 'sticky',
				backgroundColor: 'var(--table-bg)',
				// backgroundColor: 'rgba(0,0,0,0.15)',
			}}
		/>
	);
};

export default memo(BodyEmpty);
