import { useState } from 'react';

const useFlushSync = () => {
	const [vfs, setVfs] = useState(true);
	return { vfs, setVfs };
};

export default useFlushSync;
