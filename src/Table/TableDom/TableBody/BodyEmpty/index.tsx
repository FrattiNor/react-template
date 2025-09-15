import { useTableContext } from '../../../TableContext';

const BodyEmpty = () => {
	const { tableSecondaryState } = useTableContext();
	return <div style={{ width: tableSecondaryState.HTotalSize, minWidth: '100%', backgroundColor: 'rgba(0,0,0,0.05)', height: '200px' }} />;
};

export default BodyEmpty;
