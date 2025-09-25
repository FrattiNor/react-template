import { type FC } from 'react';

import Switch from 'antd/es/switch';

import styles from './index.module.less';
import Table from '../Table';
import { AppTableContext, useProvider } from './AppTableContext';
import useColumns from './useColumns';
import useData from './useData';
import useKeyword from './useKeyword';
import useTableState from './useTableState';

const AppTable: FC = () => {
	const { lightTheme, setLightTheme, bordered, setBordered, vfs, setVfs, rowHover, setRowHover, rowClick, setRowClick, rowSelect, setRowSelect } =
		useTableState();

	const { data, loading, changeOriginData, autoReload, setAutoReload } = useData();

	const { globalHighlightKeywords, keyword, setKeyword } = useKeyword();

	const { columns, setLongColumns } = useColumns();

	return (
		<div className={styles['wrapper']} style={{ background: lightTheme ? '#fff' : '#141414', color: lightTheme ? '#262626' : '#f2f2f2' }}>
			<div className={styles['flex-container']}>
				<span>{'light:'}</span>
				<Switch checked={lightTheme} onChange={setLightTheme} />
				<span>{'bordered:'}</span>
				<Switch checked={bordered} onChange={setBordered} />
				<span>{'reload:'}</span>
				<Switch checked={autoReload} onChange={setAutoReload} />
				<span>{'flushSync:'}</span>
				<Switch checked={vfs} onChange={setVfs} />
				<span>{'rowHoverBg:'}</span>
				<Switch checked={rowHover} onChange={setRowHover} />
				<span>{'rowClickBg:'}</span>
				<Switch checked={rowClick} onChange={setRowClick} />
				<span>{'rowSelectBg:'}</span>
				<Switch checked={rowSelect} onChange={setRowSelect} />
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
				<button className={styles['btn']} onClick={() => changeOriginData(0)}>{`data(0)`}</button>
				<button className={styles['btn']} onClick={() => changeOriginData(5)}>{`data(5)`}</button>
				<button className={styles['btn']} onClick={() => changeOriginData(10)}>{`data(10)`}</button>
				<button className={styles['btn']} onClick={() => changeOriginData(20)}>{`data(20)`}</button>
				<button className={styles['btn']} onClick={() => changeOriginData(50)}>{`data(50)`}</button>
				<button className={styles['btn']} onClick={() => changeOriginData(100)}>{`data(100)`}</button>
				<button className={styles['btn']} onClick={() => changeOriginData(1000)}>{`data(1000)`}</button>
				<button className={styles['btn']} onClick={() => changeOriginData(10000)}>{`data(10000)`}</button>
			</div>
			<div className={styles['table-wrapper']}>
				<Table
					data={data}
					rowKey="userId"
					columns={columns}
					loading={loading}
					rowSelection={{}}
					bordered={bordered}
					virtualFlushSync={vfs}
					theme={lightTheme ? 'light' : 'dark'}
					highlightKeywords={globalHighlightKeywords}
					rowBgHighlight={{ rowClick, rowHover, rowSelect }}
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
