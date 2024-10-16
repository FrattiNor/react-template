import { type VirtualListProps } from '../type';
import useData from './useData';
import useSearch from './useSearch';
import useSelect from './useSelect';
import useVirtual from './useVirtual';
import useWithDefaultProps from './useWithDefaultProps';

const useList = <T, K>(props: VirtualListProps<T, K>) => {
	const withDefaultProps = useWithDefaultProps(props);
	const { keyword, setKeyword } = useSearch(withDefaultProps);
	const { selectedKeysMap, changeSelected } = useSelect(withDefaultProps);
	const { showData, isEmpty } = useData({ props: withDefaultProps, keyword, selectedKeysMap });
	const { lineHeight, virtualWrapperRef, virtual } = useVirtual({ props: withDefaultProps, showData });

	return {
		// withDefaultProps
		withDefaultProps,
		// useSearch
		keyword,
		setKeyword,
		// useData
		showData,
		isEmpty,
		// useVirtual
		lineHeight,
		virtualWrapperRef,
		virtual,
		// useSelect
		changeSelected,
	};
};

export default useList;
