import { useMemo, useState, type FC } from 'react';

import { data_empty, data1, data2, data3, data4 } from './AppTable.data';
import styles from './AppTable.module.less';
import Table from './Table';
import useAppTableColumns from './useAppTable.columns';

const AppTable: FC = () => {
	const [keyword, setKeyword] = useState('');

	const [keywordColIndex, setKeywordColIndex] = useState('');

	const [data, setData] = useState<typeof data1>(() => data4);

	const colIndex = useMemo(() => {
		if (keywordColIndex === '') return undefined;
		const num = Number(keywordColIndex);
		if (isNaN(num)) return undefined;
		return num;
	}, [keywordColIndex]);

	const { columns, setLongColumns } = useAppTableColumns({ colIndex, keyword });

	const globalHighlightKeywords = useMemo(() => {
		if (colIndex !== undefined) return undefined;
		return [keyword];
	}, [colIndex, keyword]);

	return (
		<div
			style={{
				gap: 16,
				width: '100vw',
				height: '100vh',
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'column',
				justifyContent: 'center',
			}}
		>
			<div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
				<span>{'colIndex:'}</span>
				<input className={styles['input']} value={keywordColIndex} onChange={(e) => setKeywordColIndex(e.target.value)} />
				<span>{'keyword:'}</span>
				<input className={styles['input']} value={keyword} onChange={(e) => setKeyword(e.target.value)} />
			</div>
			<div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
				<button className={styles['btn']} onClick={() => setLongColumns(false)}>{`columns(less)`}</button>
				<button className={styles['btn']} onClick={() => setLongColumns(true)}>{`columns(lot)`}</button>
			</div>
			<div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
				<button className={styles['btn']} onClick={() => setData(data_empty)}>{`data(empty)`}</button>
				<button className={styles['btn']} onClick={() => setData(data1)}>{`data(level1)`}</button>
				<button className={styles['btn']} onClick={() => setData(data2)}>{`data(level2)`}</button>
				<button className={styles['btn']} onClick={() => setData(data3)}>{`data(level3)`}</button>
				<button className={styles['btn']} onClick={() => setData(data4)}>{`data(level4)`}</button>
			</div>
			<div style={{ width: '80vw', maxHeight: 500, flexShrink: 0, padding: 8 }}>
				<Table
					bordered
					data={data}
					rowKey="userId"
					columns={columns}
					highlightKeywords={globalHighlightKeywords}
					highlightConfig={{ trim: true, caseSensitive: true, autoEscape: true }}
				/>
			</div>
		</div>
	);
};

export default AppTable;
