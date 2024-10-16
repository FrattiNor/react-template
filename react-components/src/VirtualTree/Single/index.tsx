import { useMemo } from 'react';

import VirtualTree from '../Core';
import { type VirtualTreeKey, type VirtualTreeProps } from '../Core/type';
import { type SingeVirtualTreeProps } from '../type';

const SingleVirtualTree = <T, K extends VirtualTreeKey>(props: SingeVirtualTreeProps<T, K>) => {
	const { selectedKey, setSelectedKey, shouldSelectedKeyChange, ...rest } = props;

	const selectedKeys: VirtualTreeProps<T, K>['selectedKeys'] = useMemo(() => {
		if (selectedKey !== undefined) return [selectedKey];
		return undefined;
	}, [selectedKey]);

	const setSelectedKeys: VirtualTreeProps<T, K>['setSelectedKeys'] = (() => {
		if (typeof setSelectedKey === 'function') {
			return (keys, { selectedItems }) => {
				const key = keys[0];
				const selectedItem = selectedItems[0];
				setSelectedKey(key, { selectedItem });
			};
		}
		return undefined;
	})();

	const shouldSelectedKeysChange: VirtualTreeProps<T, K>['shouldSelectedKeysChange'] = (() => {
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
		<VirtualTree<T, K>
			{...(rest as any)}
			selectMode="single"
			selectedKeys={selectedKeys}
			setSelectedKeys={setSelectedKeys}
			shouldSelectedKeysChange={shouldSelectedKeysChange}
		/>
	);
};

export default SingleVirtualTree;
