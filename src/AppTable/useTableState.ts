import { useState } from 'react';

const useTableState = () => {
	const [vfs, setVfs] = useState(false);
	const [rowHover, setRowHover] = useState(false);
	const [rowClick, setRowClick] = useState(false);
	const [rowSelect, setRowSelect] = useState(false);
	const [bordered, setBordered] = useState(true);
	return { bordered, setBordered, vfs, setVfs, rowHover, setRowHover, rowClick, setRowClick, rowSelect, setRowSelect };
};

export default useTableState;
