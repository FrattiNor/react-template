import { type FC } from 'react';

import Switch from 'antd/es/switch';

import styles from './index.module.less';
import Table from '../Table';
import { AppTableContext, useProvider } from './AppTableContext';
import useColumns from './useColumns';
import useData from './useData';
import useFlushSync from './useFlushSync';
import useKeyword from './useKeyword';

const AppTable: FC = () => {
	const { vfs, setVfs } = useFlushSync();

	const { data, loading, fetchData, autoReload, setAutoReload } = useData();

	const { globalHighlightKeywords, keyword, setKeyword } = useKeyword();

	const { columns, setLongColumns } = useColumns();

	return (
		<div className={styles['wrapper']}>
			<div className={styles['flex-container']}>
				<span>{'reload:'}</span>
				<Switch checked={autoReload} onChange={setAutoReload} />
				<span>{'flushSync:'}</span>
				<Switch checked={vfs} onChange={setVfs} />
			</div>
			<div className={styles['flex-container']}>
				<span>{'keyword:'}</span>
				<input className={styles['input']} value={keyword} onChange={(e) => setKeyword(e.target.value)} />
			</div>
			<div className={styles['flex-container']}>
				<button className={styles['btn']} onClick={() => setLongColumns(false)}>{`columns(4)`}</button>
				<button className={styles['btn']} onClick={() => setLongColumns(true)}>{`columns(17)`}</button>
			</div>
			<div className={styles['flex-container']}>
				<button className={styles['btn']} onClick={() => fetchData(0)}>{`data(0)`}</button>
				<button className={styles['btn']} onClick={() => fetchData(5)}>{`data(5)`}</button>
				<button className={styles['btn']} onClick={() => fetchData(10)}>{`data(10)`}</button>
				<button className={styles['btn']} onClick={() => fetchData(20)}>{`data(20)`}</button>
				<button className={styles['btn']} onClick={() => fetchData(50)}>{`data(50)`}</button>
				<button className={styles['btn']} onClick={() => fetchData(100)}>{`data(100)`}</button>
				<button className={styles['btn']} onClick={() => fetchData(1000)}>{`data(1000)`}</button>
				<button className={styles['btn']} onClick={() => fetchData(10000)}>{`data(10000)`}</button>
			</div>
			<div className={styles['table-wrapper']}>
				<Table
					bordered
					data={data}
					rowKey="userId"
					columns={columns}
					loading={loading}
					rowSelection={{}}
					virtualFlushSync={vfs}
					highlightKeywords={globalHighlightKeywords}
					highlightConfig={{ trim: true, caseSensitive: true, autoEscape: true }}
				/>
			</div>
		</div>
	);
};

const Wrapper: FC = () => {
	const value = useProvider();
	return (
		<AppTableContext value={value}>
			<AppTable />
		</AppTableContext>
	);
};

export default Wrapper;
