import { Fragment, useState } from 'react';

import ConfModal from './ConfModal/index';
import styles from './index.module.less';
import useColumns from './useColumns';
import useData from './useData';
import BoxResize from '../../Components/BoxResize';
import Table from '../../Components/Table';

const TableDemo = () => {
	const { data, changeData } = useData();
	const { columns, leafColumns, setLongColumn } = useColumns();
	const [visible, setVisible] = useState<boolean>(false);
	const [bordered, setBordered] = useState<boolean>(true);
	const [sortConf, setSortConf] = useState<Record<string, number>>({});
	const [widthConf, setWidthConf] = useState<Record<string, number>>({});
	const [visibleConf, setVisibleConf] = useState<Record<string, boolean>>({});

	return (
		<Fragment>
			<div className={styles['wrapper']}>
				<div className={styles['btn-wrapper']}>
					<button style={{ cursor: 'pointer', outline: 'none' }} onClick={() => setBordered((old) => !old)}>
						{'Bordered'}
					</button>
					<button style={{ cursor: 'pointer', outline: 'none' }} onClick={() => setLongColumn((old) => !old)}>
						{'ChangeColumn'}
					</button>
					<button style={{ cursor: 'pointer', outline: 'none' }} onClick={changeData}>
						{'ChangeData'}
					</button>
					<button style={{ cursor: 'pointer', outline: 'none' }} onClick={() => setVisible((old) => !old)}>
						{'Config'}
					</button>
				</div>
				<BoxResize width={1500} height={500} logRender>
					<div className={styles['container']}>
						<Table
							data={data}
							columns={columns}
							rowKey={'userId'}
							bordered={bordered}
							columnConf={{ widthConf, sortConf, visibleConf }}
						/>
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
