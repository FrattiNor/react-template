import { useState } from 'react';

const useTableState = () => {
	const [vfs, setVfs] = useState(false);
	const [rowHover, setRowHover] = useState(false);
	const [rowClick, setRowClick] = useState(false);
	const [rowSelect, setRowSelect] = useState(false);
	return { vfs, setVfs, rowHover, setRowHover, rowClick, setRowClick, rowSelect, setRowSelect };
};

export default useTableState;
