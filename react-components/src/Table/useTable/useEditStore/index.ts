import { startTransition, useEffect, useState } from 'react';

import { type DataSource } from '../type';

type Opt<T> = {
	dataSource: DataSource<T>;
};

const useEditStore = <T>({ dataSource }: Opt<T>) => {
	const [editStoreCellValues, setEditStoreCellValues] = useState<Record<string, string>>({});

	// 数据源变更后清空编辑缓存
	useEffect(() => {
		startTransition(() => {
			setEditStoreCellValues({});
		});
	}, [dataSource.totalDataSource]);

	return { editStoreCellValues, setEditStoreCellValues };
};

export default useEditStore;
