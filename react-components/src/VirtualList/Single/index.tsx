import { useMemo } from 'react';

import VirtualList from '../Core';
import { type VirtualListKey, type VirtualListProps } from '../Core/type';
import { type SingeVirtualListProps } from '../type';

const SingleVirtualList = <T, K extends VirtualListKey>(props: SingeVirtualListProps<T, K>) => {
	const { selectedKey, setSelectedKey, shouldSelectedKeyChange, ...rest } = props;

	const selectedKeys: VirtualListProps<T, K>['selectedKeys'] = useMemo(() => {
		if (typeof selectedKey === 'string') return [selectedKey];
		return undefined;
	}, [selectedKey]);

	const setSelectedKeys: VirtualListProps<T, K>['setSelectedKeys'] = (() => {
		if (typeof setSelectedKey === 'function') {
			return (keys, { selectedItems }) => {
				const key = keys[0];
				const selectedItem = selectedItems[0];
				setSelectedKey(key, { selectedItem });
			};
		}
		return undefined;
	})();

	const shouldSelectedKeysChange: VirtualListProps<T, K>['shouldSelectedKeysChange'] = (() => {
		if (typeof shouldSelectedKeyChange === 'function') {
			return (keys, { selectedItems }) => {
				const key = keys[0];
				const selectedItem = selectedItems[0];
				return shouldSelectedKeyChange(key, { selectedItem });
			};
		}
		return undefined;
	})();

	return (
		<VirtualList<T, K>
			{...(rest as any)}
			selectMode="single"
			selectedKeys={selectedKeys}
			setSelectedKeys={setSelectedKeys}
			shouldSelectedKeysChange={shouldSelectedKeysChange}
		/>
	);
};

export default SingleVirtualList;
