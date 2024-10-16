import { type VirtualListProps } from './Core/type';

export type SingeVirtualListProps<T, K> = Omit<
	VirtualListProps<T, K>,
	'selectMode' | 'selectedKeys' | 'setSelectedKeys' | 'shouldSelectedKeysChange'
> & {
	selectedKey?: K;
	setSelectedKey?: (key: K | undefined, other: { selectedItem: T | undefined }) => void;
	shouldSelectedKeyChange?: (key: K | undefined, other: { selectedItem: T | undefined }) => boolean;
};

export type MultipleVirtualListProps<T, K> = Omit<
	VirtualListProps<T, K>,
	'selectMode' | 'selectedKeys' | 'setSelectedKeys' | 'shouldSelectedKeysChange'
> & {
	selectedKeys?: K[];
	setSelectedKeys?: (keys: K[]) => void;
	shouldSelectedKeysChange?: (keys: K[]) => boolean;
};
