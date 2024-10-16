import { type VirtualTreeProps } from './Core/type';

export type SingeVirtualTreeProps<T, K> = Omit<
	VirtualTreeProps<T, K>,
	'selectMode' | 'selectedKeys' | 'setSelectedKeys' | 'shouldSelectedKeysChange'
> & {
	selectedKey?: K;
	setSelectedKey?: (key: K | undefined, other: { selectedItem: T | undefined }) => void;
	shouldSelectedKeyChange?: (key: K | undefined, other: { selectedItem: T | undefined }) => boolean;
};

export type MultipleVirtualTreeProps<T, K> = Omit<
	VirtualTreeProps<T, K>,
	'selectMode' | 'selectedKeys' | 'setSelectedKeys' | 'shouldSelectedKeysChange'
> & {
	selectedKeys?: K[];
	setSelectedKeys?: (keys: K[]) => void;
	shouldSelectedKeysChange?: (keys: K[]) => boolean;
};
