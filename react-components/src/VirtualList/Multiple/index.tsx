import VirtualList from '../Core';
import { type VirtualListKey } from '../Core/type';
import { type MultipleVirtualListProps } from '../type';

const MultipleVirtualList = <T, K extends VirtualListKey>(props: MultipleVirtualListProps<T, K>) => {
	const { selectedKeys, setSelectedKeys, shouldSelectedKeysChange, ...rest } = props;

	return (
		<VirtualList<T, K>
			{...(rest as any)}
			selectMode="multiple"
			selectedKeys={selectedKeys}
			setSelectedKeys={setSelectedKeys}
			shouldSelectedKeysChange={shouldSelectedKeysChange}
		/>
	);
};

export default MultipleVirtualList;
