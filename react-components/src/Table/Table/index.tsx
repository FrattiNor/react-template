import classNames from 'classnames';

import Body from './Body';
import Head from './Head';
import styles from './index.module.less';
import Pagination from './Pagination';
import Summary from './Summary';
import LoadingDiv from '../../LoadingDiv';
import { useTableContext } from '../TableContext';
import TableContextHoc from '../TableContextHoc';

const _Table = () => {
	const tableContext = useTableContext();
	const { loading, className, style } = tableContext.handledProps;

	return (
		<LoadingDiv loadingMaxHeight={400} loading={loading} className={classNames(styles['table'], className)} style={style}>
			<Head />
			<Body />
			<Summary />
			<Pagination />
		</LoadingDiv>
	);
};

const Table = TableContextHoc(_Table);

export default Table;
