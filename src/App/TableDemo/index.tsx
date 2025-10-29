import { useMemo, useState } from 'react';
import BoxResize from '../../Components/BoxResize';
import Table from '../../Components/Table';
import getData, { type DataItem } from './data';
import styles from './index.module.less';
import type { TableColumns } from '../../Components/Table/TableTypes/typeColumn';

const TableDemo = () => {
	const [data, setData] = useState(() => getData(20));

	const columns: TableColumns<DataItem> = useMemo(
		() => [
			{
				key: 'index',
				title: 'Index',
				render: ({ index }) => index,
			},
			{
				key: 'userId',
				title: '用户id_2',
				render: ({ userId }) => userId,
			},
			{
				key: 'firstName',
				title: 'firstName_0',
				render: ({ firstName }) => (
					<div
						style={{
							color: '#fff',
							// padding: '12px 6px',
							padding: '0 6px',
							borderRadius: '4px',
							display: 'inline-block',
							backgroundColor: 'rgba(0,0,0,0.25)',
						}}
					>
						{firstName}
					</div>
				),
			},
			{
				key: 'lastName',
				title: <span>{'lastName_1'}</span>,
				render: ({ lastName }) => <span>{lastName}</span>,
			},
			{
				key: 'email',
				title: '邮箱_3',
				render: ({ email }) => email,
			},
			{
				key: 'avatar',
				title: '头像_4',
				render: ({ avatar }) => avatar,
			},
			{
				key: 'password',
				title: '密码_5',
				render: ({ password }) => password,
			},
			{
				key: 'birthdate',
				title: '生日_6',
				render: ({ birthdate }) => birthdate.toString(),
			},
			{
				key: 'registeredAt',
				title: '注册时间_7',
				render: ({ registeredAt }) => registeredAt.toString(),
			},
			{
				key: 'age',
				title: '年龄_8',
				render: ({ age }) => age,
			},
			{
				key: 'gender',
				title: '性别_9',
				render: ({ gender }) => gender,
			},
			{
				key: 'height',
				title: '身高_10',
				render: ({ height }) => height,
			},
			{
				key: 'weight',
				title: '体重_11',
				render: ({ weight }) => weight,
			},
			{
				key: 'phoneNumber',
				title: '电话号码_12',
				render: ({ phoneNumber }) => phoneNumber,
			},
			{
				key: 'jobArea',
				title: '工作地点_13',
				render: ({ jobArea }) => jobArea,
			},
			{
				key: 'jobTitle',
				title: '工作头衔_14',
				render: ({ jobTitle }) => jobTitle,
			},
			{
				key: 'jobType',
				title: '工作类型_15',
				render: ({ jobType }) => jobType,
			},
		],
		[],
	);

	return (
		<div className={styles['wrapper']}>
			<button onClick={() => setData((old) => (old.length === 20 ? getData(5) : getData(20)))}>ADD</button>
			<BoxResize width={1000} height={500} logRender>
				<div className={styles['container']}>
					<Table
						bordered
						data={data}
						columns={columns}
						rowKey={'userId'}
						logRender={useMemo(
							() => ({
								table: true,
								tableDom: true,
								body: true,
								bodyRow: false,
								bodyCell: false,
								head: true,
								headRow: false,
								headCell: false,
							}),
							[],
						)}
					/>
				</div>
			</BoxResize>
		</div>
	);
};

export default TableDemo;
