import { memo } from 'react';

const BodyEmpty = () => {
	return <div style={{ height: 200, width: '100%', position: 'sticky', left: 0, backgroundColor: 'var(--table-bg)' }}></div>;
};

export default memo(BodyEmpty);
