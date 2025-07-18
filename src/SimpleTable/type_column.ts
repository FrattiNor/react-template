/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ReactNode } from 'react';

type Column<T extends Record<string, any>> = (
	| {
			key: keyof T;
			render: undefined;
	  }
	| {
			key: string;
			render: (item: T) => ReactNode;
	  }
) & {
	title: ReactNode;
	type: 'column';
};

type ColumnGroup<T extends Record<string, any>> = {
	title: ReactNode;
	type: 'group';
	children: Array<ColumnGroup<T> | Column<T>>;
};

export type Columns<T extends Record<string, any>> = Array<Column<T> | ColumnGroup<T>>;
