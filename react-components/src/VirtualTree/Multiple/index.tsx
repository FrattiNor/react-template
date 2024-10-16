import VirtualTree from '../Core';
import { type VirtualTreeKey } from '../Core/type';
import { type MultipleVirtualTreeProps } from '../type';

const MultipleVirtualTree = <T, K extends VirtualTreeKey>(props: MultipleVirtualTreeProps<T, K>) => {
	const { selectedKeys, setSelectedKeys, shouldSelectedKeysChange, ...rest } = props;

	return (
		<VirtualTree<T, K>
			{...(rest as any)}
			selectMode="multiple"
			selectedKeys={selectedKeys}
			setSelectedKeys={setSelectedKeys}
			shouldSelectedKeysChange={shouldSelectedKeysChange}
		/>
	);
};

export default MultipleVirtualTree;
