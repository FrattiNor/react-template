import App2048 from './App2048';
import AppList from './AppList';
import AppReactVirtualized from './AppReactVirtualized';
import AppReactWindow from './AppReactWindow';
import AppTable from './AppTable';

export const menu = {
	'2048': App2048,
	ReactVirtualized: AppReactVirtualized,
	ReactWindow: AppReactWindow,
	List: AppList,
	Table: AppTable,
} as const;

export type MenuKey = keyof typeof menu;

export const menuKeys = Object.keys(menu) as Array<MenuKey>;

export const openIcon = (
	<svg viewBox="64 64 896 896" focusable="false" data-icon="menu-unfold" width="1em" height="1em" fill="currentColor" aria-hidden="true">
		<path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 000-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0014.4 7z"></path>
	</svg>
);

export const closeIcon = (
	<svg viewBox="64 64 896 896" focusable="false" data-icon="menu-fold" width="1em" height="1em" fill="currentColor" aria-hidden="true">
		<path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM115.4 518.9L271.7 642c5.8 4.6 14.4.5 14.4-6.9V388.9c0-7.4-8.5-11.5-14.4-6.9L115.4 505.1a8.74 8.74 0 000 13.8z"></path>
	</svg>
);

export const getLocationKey = () => {
	const url = new URL(window.location.href);
	const activeKey = url.searchParams.getAll('activeKey')?.[0];
	if (typeof activeKey === 'string' && menu[activeKey as MenuKey] !== undefined) {
		return activeKey as MenuKey;
	}
	return undefined;
};

export const setLocationKey = (key: string) => {
	const url = new URL(window.location.href);
	url.searchParams.set('activeKey', key);
	window.history.replaceState(null, '', url.toString());
};
