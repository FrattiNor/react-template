import { type FC } from 'react';

import Switch from 'antd/es/switch';

import { AppTableContext, useProvider } from './AppTableContext';
import styles from './index.module.less';
import useColumns from './useColumns';
import useData from './useData';
import useKeyword from './useKeyword';
import useTableState from './useTableState';
import Table from '../../Components/Table';

const AppTable: FC = () => {
	const {
		draggable,
		setDraggable,
		lightTheme,
		setLightTheme,
		bordered,
		setBordered,
		vfs,
		setVfs,
		rowHover,
		setRowHover,
		rowClick,
		setRowClick,
		rowSelect,
		setRowSelect,
		hEnabled,
		setHEnabled,
		vEnabled,
		setVEnabled,
	} = useTableState();

	const { data, loading, setLoading, changeOriginData, autoReload, setAutoReload, onDragEnd } = useData();

	const { globalHighlightKeywords, keyword, setKeyword } = useKeyword();

	const { columns, setLongColumns } = useColumns();

	return (
		<div className={styles['wrapper']} style={{ background: lightTheme ? '#fff' : '#141414', color: lightTheme ? '#262626' : '#f2f2f2' }}>
			<div className={styles['flex-container']}>
				<span>{'高亮关键字:'}</span>
				<input className={styles['input']} value={keyword} onChange={(e) => setKeyword(e.target.value)} />
			</div>
			<div className={styles['flex-container']}>
				<button className={styles['btn']} onClick={() => setLongColumns(false)}>{`columns(5)`}</button>
				<button className={styles['btn']} onClick={() => setLongColumns(true)}>{`columns(18)`}</button>
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
			<div className={styles['flex-container']}>
				<span>{'拖拽:'}</span>
				<Switch checked={draggable} onChange={setDraggable} />
				<span>{'亮色主题:'}</span>
				<Switch checked={lightTheme} onChange={setLightTheme} />
				<span>{'边框:'}</span>
				<Switch checked={bordered} onChange={setBordered} />
				<span>{'flushSync:'}</span>
				<Switch checked={vfs} onChange={setVfs} />
				<span>{'横向virtual:'}</span>
				<Switch checked={hEnabled} onChange={setHEnabled} />
				<span>{'纵向virtual:'}</span>
				<Switch checked={vEnabled} onChange={setVEnabled} />
				<span>{'hover背景:'}</span>
				<Switch checked={rowHover} onChange={setRowHover} />
				<span>{'click背景:'}</span>
				<Switch checked={rowClick} onChange={setRowClick} />
				<span>{'select背景:'}</span>
				<Switch checked={rowSelect} onChange={setRowSelect} />
				<span>{'自动刷新:'}</span>
				<Switch checked={autoReload} onChange={setAutoReload} />
				<span>{'loading:'}</span>
				<Switch checked={loading} onChange={setLoading} />
			</div>
			<div className={styles['table-wrapper']}>
				<Table
					data={data}
					rowKey="userId"
					columns={columns}
					loading={loading}
					rowSelection={{}}
					bordered={bordered}
					theme={lightTheme ? 'light' : 'dark'}
					highlightKeywords={globalHighlightKeywords}
					draggable={draggable ? { onDragEnd } : undefined}
					rowBgHighlight={{ rowClick, rowHover, rowSelect }}
					highlightConfig={{ trim: true, caseSensitive: true, autoEscape: true }}
					virtual={{
						virtualFlushSync: vfs,
						verticalVirtual: { enabled: vEnabled },
						horizontalVirtual: { enabled: hEnabled },
						shouldClearSizeCache: (prev, next) => {
							if (prev.length !== next.length) return true;
							const prevKeys: Record<string, true> = {};
							prev.forEach((item) => (prevKeys[item.userId] = true));
							const haveDiff = next.some((item) => prevKeys[item.userId] !== true);
							return haveDiff;
						},
					}}
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
