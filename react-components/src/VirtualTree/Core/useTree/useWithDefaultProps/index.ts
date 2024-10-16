import { type VirtualTreeFieldKeys, type VirtualTreeProps } from '../../type';

const useWithDefaultProps = <T, K>(props: VirtualTreeProps<T, K>) => {
	const defaultFieldKeys = {
		key: 'key',
		label: 'label',
		children: 'children',
	} as VirtualTreeFieldKeys<T, K>;

	const nextProps = {
		...props,
		width: props.width ?? 300,
		lineHeight: props.lineHeight ?? 26,
		paddingLeft: props.paddingLeft ?? 16,
		paddingBottom: props.paddingBottom ?? 6,
		levelPaddingLeft: props.levelPaddingLeft ?? 20,
		blockNode: props.blockNode ?? true,
		showSearch: props.showSearch ?? true,
		selectMode: props.selectMode ?? 'single',
		checkStrictly: props.checkStrictly ?? true,
		fieldKeys: props.fieldKeys ?? defaultFieldKeys,
	};

	// 显示复选框【前置需求为存在选择模式】
	const showCheckbox = nextProps.selectMode !== 'none' && nextProps.showCheckbox === true;
	// 是否完全受控【前置需求为showCheckbox】
	const checkStrictly = showCheckbox === true ? nextProps.checkStrictly === true : true;
	// 起始padding【showSearch时，不需要上方padding】
	const paddingTop = props.paddingTop ?? (nextProps.showSearch === true ? 0 : 6);

	return {
		...nextProps,
		paddingTop,
		showCheckbox,
		checkStrictly,
	};
};

export default useWithDefaultProps;
