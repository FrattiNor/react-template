import { Fragment, useState } from 'react';

import ConfModal from './ConfModal/index';
import getData from './data';
import styles from './index.module.less';
import useColumns from './useColumns';
import BoxResize from '../../Components/BoxResize';
import Table from '../../Components/Table';

const TableDemo = () => {
	const [data] = useState(() => getData(20));
	const { columns, leafColumns } = useColumns();
	const [visible, setVisible] = useState<boolean>(false);
	const [sortConf, setSortConf] = useState<Record<string, number>>({});
	const [visibleConf, setVisibleConf] = useState<Record<string, boolean>>({});

	return (
		<Fragment>
			<ConfModal
				visible={visible}
				setVisible={setVisible}
				leafColumns={leafColumns}
				setSortConf={setSortConf}
				visibleConf={visibleConf}
				setVisibleConf={setVisibleConf}
			/>
			<div className={styles['wrapper']}>
				<button onClick={() => setVisible((old) => !old)}>Config</button>
				<BoxResize width={1000} height={500} logRender>
					<div className={styles['container']}>
						<Table bordered data={data} columns={columns} rowKey={'userId'} columnConf={{ sortConf, visibleConf }} />
					</div>
				</BoxResize>
			</div>
		</Fragment>
	);
};

export default TableDemo;
