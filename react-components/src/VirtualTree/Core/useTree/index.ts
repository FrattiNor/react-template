import { type VirtualTreeProps } from '../type';
import useData from './useData';
import useSearch from './useSearch';
import useSelect from './useSelect';
import useVirtual from './useVirtual';
import useVisibles from './useVisibles';
import useWithDefaultProps from './useWithDefaultProps';

const useTree = <T, K>(props: VirtualTreeProps<T, K>) => {
	const withDefaultProps = useWithDefaultProps(props);
	const { keyword, setKeyword } = useSearch(withDefaultProps);
	const { selectedKeysMap, changeSelected } = useSelect(withDefaultProps);
	const { visiblesMap, triggerVisibleByItem, closeAll, openAll, atLeastOneOpen } = useVisibles({ props: withDefaultProps, keyword });
	const { showData, isEmpty } = useData({ props: withDefaultProps, visiblesMap, keyword, selectedKeysMap });
	const { lineHeight, virtualWrapperRef, virtual } = useVirtual({ props: withDefaultProps, showData });

	return {
		// withDefaultProps
		withDefaultProps,
		// useSearch
		keyword,
		setKeyword,
		// useVisibles
		triggerVisibleByItem,
		closeAll,
		openAll,
		atLeastOneOpen,
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

export default useTree;
