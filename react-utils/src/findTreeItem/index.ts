type Props<T, D> = {
	treeData: T[];
	target: D;
	condition: (item: T, target: D) => boolean;
	getTreeChildren: (item: T) => T[] | undefined;
};

const findTreeItem = <T extends object, D>({ treeData, target, condition, getTreeChildren }: Props<T, D>) => {
	const find = (data: T[]): T | null => {
		let result: T | null = null;

		for (let i = 0; i < data.length; i++) {
			const item = data[i];
			// find target and break
			if (condition(item, target)) {
				result = item;
				break;
			}
			// find children
			const itemChildren = getTreeChildren(item);
			if (itemChildren) {
				const childResult = find(itemChildren);
				// find children target and break
				if (childResult) {
					result = childResult;
					break;
				}
			}
		}

		return result;
	};

	return find(treeData);
};

export default findTreeItem;
