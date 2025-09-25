import { useState } from 'react';

const useTableState = () => {
	const [vfs, setVfs] = useState(true);
	const [rowHover, setRowHover] = useState(false);
	const [rowClick, setRowClick] = useState(false);
	const [rowSelect, setRowSelect] = useState(true);
	return { vfs, setVfs, rowHover, setRowHover, rowClick, setRowClick, rowSelect, setRowSelect };
};

export default useTableState;
