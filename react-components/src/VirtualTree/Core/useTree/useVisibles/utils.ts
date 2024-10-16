import { type VirtualTreeFieldKeys } from '../../type';
import { getItemProps } from '../utils';

type GetAllParentKeysProps<T, K> = {
	data: T[];
	fieldKeys: VirtualTreeFieldKeys<T, K>;
};

export const getAllParentKeys = <T, K>({ data, fieldKeys }: GetAllParentKeysProps<T, K>) => {
	// 搜索到的父Id
	const allParentKeys: K[] = [];
	// 遍历数据
	const recursionData = (v: T[]) => {
		v.forEach((item) => {
			const { key, children, haveChildren } = getItemProps(item, fieldKeys);
			if (haveChildren) {
				allParentKeys.push(key);
				recursionData(children);
			}
		});
	};

	recursionData(data);

	return allParentKeys;
};
