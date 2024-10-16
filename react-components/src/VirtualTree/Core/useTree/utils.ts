import { type VirtualTreeFieldKeys } from '../type';

export const getItemProps = <T, K>(item: T, fieldKeys: VirtualTreeFieldKeys<T, K>) => {
	const { key: FKey, label: FLabel, children: FChildren, disabled: FDisabled } = fieldKeys;
	// item key
	const _key = item?.[FKey];
	const key = (typeof _key === 'string' || typeof _key === 'number' ? _key : '') as K;
	// item label
	const _label = item?.[FLabel];
	const label = typeof _label === 'string' || typeof _key === 'number' ? `${_label}` : '';
	// item children
	const children = item?.[FChildren] as T[];
	// item have children
	const haveChildren = Array.isArray(children) && children.length > 0;
	// item disabled
	const disabled = FDisabled ? (typeof FDisabled === 'function' ? FDisabled(item) : (item?.[FDisabled] as boolean)) : false;

	return { key, label, children, haveChildren, disabled };
};
