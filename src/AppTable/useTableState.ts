import { useState } from 'react';

const isDev = process.env.NODE_ENV === 'development';

const useTableState = () => {
	const [vfs, setVfs] = useState(!isDev);
	const [hEnabled, setHEnabled] = useState(true);
	const [vEnabled, setVEnabled] = useState(true);
	const [rowHover, setRowHover] = useState(false);
	const [rowClick, setRowClick] = useState(false);
	const [rowSelect, setRowSelect] = useState(!isDev);
	const [bordered, setBordered] = useState(true);
	const [lightTheme, setLightTheme] = useState(true);
	const [draggable, setDraggable] = useState(false);
	return {
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
	};
};

export default useTableState;
