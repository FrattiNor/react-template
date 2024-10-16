import { useEffect, useRef } from 'react';

import { isEmpty, regExpMatch } from '@react/utils';

import { type VirtualTreeFieldKeys } from '../../type';
import { getItemProps } from '../utils';

type FindSearchedParentKeysProps<T, K> = {
	data: T[];
	defaultVisibleLevel: number;
	fieldKeys: VirtualTreeFieldKeys<T, K>;
};

const findLevelParentKeys = <T, K>({ defaultVisibleLevel, data, fieldKeys }: FindSearchedParentKeysProps<T, K>) => {
	// 搜索到的父Id
	const searchedParentKeys: K[] = [];
	// 遍历数据
	const recursionData = (v: T[], { level }: { level: number }) => {
		v.forEach((item) => {
			const { key, children, haveChildren } = getItemProps(item, fieldKeys);
			// 等级小于等于默认打开的等级
			if (level < defaultVisibleLevel - 1) {
				searchedParentKeys.push(key);
				if (haveChildren) recursionData(children, { level: level + 1 });
			}
			//
			if (level === defaultVisibleLevel - 1) {
				searchedParentKeys.push(key);
			}
		});
	};

	recursionData(data, { level: 0 });

	return searchedParentKeys;
};

type GetAllParentKeysMapProps<T, K> = {
	data: T[];
	fieldKeys: VirtualTreeFieldKeys<T, K>;
};

const getAllParentKeysMap = <T, K>({ data, fieldKeys }: GetAllParentKeysMapProps<T, K>) => {
	// 搜索到的父Id
	const allParentKeys: Map<K, boolean> = new Map();
	// 遍历数据
	const recursionData = (v: T[]) => {
		v.forEach((item) => {
			const { key, children, haveChildren } = getItemProps(item, fieldKeys);
			if (haveChildren) {
				allParentKeys.set(key, true);
				recursionData(children);
			}
		});
	};

	recursionData(data);

	return allParentKeys;
};

type GetAllParentKeysByKeywordProps<T, K> = {
	data: T[];
	keyword: string;
	fieldKeys: VirtualTreeFieldKeys<T, K>;
};

const getAllParentKeysByKeyword = <T, K>({ data, fieldKeys, keyword }: GetAllParentKeysByKeywordProps<T, K>) => {
	// 搜索到的父Id
	const allParentKeys: K[] = [];
	// 遍历数据
	const recursionData = (v: T[], parentKeys: K[] = []) => {
		v.forEach((item) => {
			const { key, label, children, haveChildren } = getItemProps(item, fieldKeys);
			const searched = keyword !== '' ? regExpMatch(label, keyword).length > 0 : true;
			if (searched) parentKeys.forEach((parentKey) => allParentKeys.push(parentKey));
			if (haveChildren) recursionData(children, [...parentKeys, key]);
		});
	};

	recursionData(data);

	return allParentKeys;
};

type VisiblesChangeProps<T, K> = {
	data?: T[];
	keyword: string;
	fieldKeys: VirtualTreeFieldKeys<T, K>;
	defaultVisibleLevel?: number;
	defaultVisibles?: K[];
	visibles: K[];
	setVisibles: (v: K[]) => void;
};

export const useVisiblesChange = <T, K>(props: VisiblesChangeProps<T, K>) => {
	const { data, keyword, fieldKeys, defaultVisibleLevel, defaultVisibles, visibles, setVisibles } = props;

	// 设置初始展开
	// 根据data删除不存在的key
	// 根据keyword设置visibles
	const isFirstRef = useRef(true);
	const keywordRef = useRef(keyword);
	useEffect(() => {
		// data已经存在
		if (data) {
			// 是否是第一次
			if (isFirstRef.current) {
				isFirstRef.current = false;
				// 设置默认展开
				if (defaultVisibles) {
					setVisibles(defaultVisibles);
				}
				// 	默认展开层级
				else if (typeof defaultVisibleLevel === 'number') {
					const levelParentKeys = findLevelParentKeys({ data, fieldKeys, defaultVisibleLevel });
					setVisibles(levelParentKeys);
				}
			} else {
				// 搜索关键字变更
				if (keywordRef.current !== keyword) {
					keywordRef.current = keyword;
					if (isEmpty(keyword)) {
						setVisibles([]);
					} else {
						const nextVisibles = getAllParentKeysByKeyword({ data, fieldKeys, keyword });
						setVisibles(nextVisibles);
					}
				}
				// data本身变更，删除不存在的key
				else {
					const nextVisibles: K[] = [];
					// 获取所有父key【可打开的key】
					const allParentKeysMap = getAllParentKeysMap({ data, fieldKeys });
					// 遍历当前的visibles，删除不存在的
					visibles.forEach((key) => {
						if (allParentKeysMap.get(key) === true) {
							nextVisibles.push(key);
						}
					});
					setVisibles(nextVisibles);
				}
			}
		}
	}, [data, keyword]);
};
