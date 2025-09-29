import { useEffect, useState, type FC } from 'react';

import { Input } from 'antd';

import { useAppTableContext } from './AppTableContext';
import { TableFilterTemplate } from '../../Components/Table/TableComponent';

type Props = {
	close: () => void;
	name: string;
};

const FilterComponent: FC<Props> = ({ close, name }) => {
	useEffect(() => {
		console.log('FilterComponent', name);
	}, []);

	const { params, setParams } = useAppTableContext();

	// 获取默认值
	const [value, setValue] = useState(() => params[name]);

	const onReset = () => {
		close();
		setParams((old) => {
			const next = { ...old };
			delete next[name];
			return next;
		});
	};

	const onSubmit = () => {
		close();
		setParams((old) => ({ ...old, [name]: value }));
	};

	return (
		<TableFilterTemplate onReset={onReset} onSubmit={onSubmit}>
			<div style={{ width: 300, padding: 8 }}>
				<Input value={value} onChange={(e) => setValue(e.target.value)} />
			</div>
		</TableFilterTemplate>
	);
};

export default FilterComponent;
