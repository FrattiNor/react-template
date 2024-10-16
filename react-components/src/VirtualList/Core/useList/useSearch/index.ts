import { useDeferredValue } from 'react';

import { useMergeState } from '@react/hooks';

import { type WithDefaultVirtualListProps } from '../type';

// TODO keyword设置展开收起
const useSearch = <T, K>(props: WithDefaultVirtualListProps<T, K>) => {
	// 合并 keyword state
	const [keyword, setKeyword] = useMergeState<string>({
		defaultValue: '',
		state: props.keyword,
		setState: props.setKeyword,
	});

	return { keyword: useDeferredValue(keyword.trim()), setKeyword };
};

export default useSearch;
