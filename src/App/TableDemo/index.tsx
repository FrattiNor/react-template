import { Fragment, useState } from 'react';

import ConfModal from './ConfModal/index';
import styles from './index.module.less';
import useColumns from './useColumns';
import useData from './useData';
import BoxResize from '../../Components/BoxResize';
import Table from '../../Components/Table';

const TableDemo = () => {
	const { data } = useData();
	const { columns, leafColumns } = useColumns();
	const [visible, setVisible] = useState<boolean>(false);
	const [sortConf, setSortConf] = useState<Record<string, number>>({});
	const [widthConf, setWidthConf] = useState<Record<string, number>>({});
	const [visibleConf, setVisibleConf] = useState<Record<string, boolean>>({});

	return (
		<Fragment>
			<div className={styles['wrapper']}>
				<button style={{ cursor: 'pointer' }} onClick={() => setVisible((old) => !old)}>
					{'Config'}
				</button>
				<BoxResize width={1000} height={500} logRender>
					<div className={styles['container']}>
						<Table bordered data={data} columns={columns} rowKey={'userId'} columnConf={{ widthConf, sortConf, visibleConf }} />
					</div>
				</BoxResize>
			</div>

			<ConfModal
				visible={visible}
				sortConf={sortConf}
				widthConf={widthConf}
				setVisible={setVisible}
				leafColumns={leafColumns}
				setSortConf={setSortConf}
				visibleConf={visibleConf}
				setWidthConf={setWidthConf}
				setVisibleConf={setVisibleConf}
			/>
		</Fragment>
	);
};

export default TableDemo;
