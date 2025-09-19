import { useEffect, useMemo, useRef, useState, type FC } from 'react';

import { getData } from './data';
import styles from './index.module.less';
import Table from '../Table';
import useColumns from './useColumns';

const AppTable: FC = () => {
	const timeoutRef = useRef<ReturnType<typeof setInterval> | null>(null);

	const [keyword, setKeyword] = useState('');

	const [keywordColIndex, setKeywordColIndex] = useState('');

	const [data, setData] = useState<ReturnType<typeof getData>>(() => getData(10000));

	useEffect(() => {
		timeoutRef.current = setInterval(() => {
			const count = data.length;
			setData(getData(count));
			console.log(`refresh data(${count})`);
		}, 5000);
		return () => {
			if (timeoutRef.current) clearInterval(timeoutRef.current);
		};
	}, [data]);

	const colIndex = useMemo(() => {
		if (keywordColIndex === '') return undefined;
		const num = Number(keywordColIndex);
		if (isNaN(num)) return undefined;
		return num;
	}, [keywordColIndex]);

	const { columns, setLongColumns } = useColumns({ colIndex, keyword });

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
				<button className={styles['btn']} onClick={() => setLongColumns(false)}>{`columns(4)`}</button>
				<button className={styles['btn']} onClick={() => setLongColumns(true)}>{`columns(17)`}</button>
			</div>
			<div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
				<button className={styles['btn']} onClick={() => setData(getData(0))}>{`data(0)`}</button>
				<button className={styles['btn']} onClick={() => setData(getData(5))}>{`data(5)`}</button>
				<button className={styles['btn']} onClick={() => setData(getData(100))}>{`data(100)`}</button>
				<button className={styles['btn']} onClick={() => setData(getData(1000))}>{`data(1000)`}</button>
				<button className={styles['btn']} onClick={() => setData(getData(10000))}>{`data(10000)`}</button>
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
