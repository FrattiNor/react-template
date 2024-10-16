import { type VirtualListFieldKeys, type VirtualListProps } from '../../type';

const useWithDefaultProps = <T, K>(props: VirtualListProps<T, K>) => {
	const defaultFieldKeys = {
		key: 'key',
		label: 'label',
	} as VirtualListFieldKeys<T, K>;

	const nextProps = {
		...props,
		width: props.width ?? 300,
		lineHeight: props.lineHeight ?? 26,
		paddingLeft: props.paddingLeft ?? 16,
		paddingBottom: props.paddingBottom ?? 6,
		blockNode: props.blockNode ?? true,
		showSearch: props.showSearch ?? true,
		selectMode: props.selectMode ?? 'single',
		fieldKeys: props.fieldKeys ?? defaultFieldKeys,
	};

	// 显示复选框【前置需求为存在选择模式】
	const showCheckbox = nextProps.selectMode !== 'none' && nextProps.showCheckbox === true;
	// 起始padding【showSearch时，不需要上方padding】
	const paddingTop = props.paddingTop ?? (nextProps.showSearch === true ? 0 : 6);

	return {
		...nextProps,
		paddingTop,
		showCheckbox,
	};
};

export default useWithDefaultProps;
