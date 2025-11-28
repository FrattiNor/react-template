import { useMemo, useState, type ReactNode } from 'react';

import type { TableColumns } from '../../../Components/Table/TableTypes/typeColumn';
import type { DataItem } from '../useData/data';

const useColumns = () => {
	const [longColumn, setLongColumn] = useState(true);

	const columns: TableColumns<DataItem> = useMemo(() => {
		if (longColumn === true) {
			return [
				{
					key: 'index',
					title: 'Index',
					render: ({ index }) => `row1_${index}`,
					onCellSpan: (_, i) => ({
						rowSpan: i % 3 === 0 ? 3 : 0,
					}),
				},
				{
					flexGrow: 0,
					width: 200.55555555,
					key: 'index2',
					title: 'Index2',
					render: ({ index }) => `row2_${index}`,
					fixed: 'left',
				},
				{
					flexGrow: 0,
					width: '50%',
					key: 'index3',
					title: 'Index3',
					render: ({ index }) => `row3_${index}`,
				},
				{
					flexGrow: 0,
					width: 200.55555555,
					key: 'index4',
					title: 'Index4',
					render: ({ index }) => `row4_${index}`,
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
					fixed: 'right',
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
					width: 120,
					flexGrow: 0,
					key: 'phoneNumber',
					title: '电话号码_12',
					render: ({ phoneNumber }) => phoneNumber,
					fixed: 'right',
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
				{
					align: 'center',
					key: 'user',
					title: '用户',
					children: [
						{
							align: 'center',
							key: 'userName',
							title: '用户名称',
							children: [
								{
									width: 120,
									flexGrow: 0,
									fixed: 'right',
									align: 'center',
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
									onCellSpan: () => ({
										colSpan: 2,
									}),
								},
								{
									width: 120,
									flexGrow: 0,
									fixed: 'right',
									key: 'lastName',
									title: <span>{'lastName_1'}</span>,
									render: ({ lastName }) => <span>{lastName}</span>,
									onCellSpan: () => ({
										colSpan: 0,
									}),
								},
							],
						},
						{
							width: 120,
							flexGrow: 0,
							// fixed: 'right',
							key: 'userId',
							title: '用户id_2',
							render: ({ userId }) => userId,
						},
					],
				},
			];
		} else {
			return [
				{
					flexGrow: 0,
					width: 200.55555555,
					key: 'index2',
					title: 'Index2',
					render: ({ index }) => `row2_${index}`,
					fixed: 'left',
				},
				{
					key: 'index333',
					title: 'Index',
					render: ({ index }) => `row1_${index}`,
					onCellSpan: (_, i) => ({
						rowSpan: i % 3 === 0 ? 3 : 0,
					}),
				},
				{
					flexGrow: 0,
					width: '50%',
					key: 'index444',
					title: 'Index3',
					render: ({ index }) => `row3_${index}`,
				},
				{
					flexGrow: 0,
					width: 200.55555555,
					key: 'index5555',
					title: 'Index4',
					render: ({ index }) => `row4_${index}`,
				},
			];
		}
	}, [longColumn]);

	const leafColumns = useMemo(() => {
		const _columns: Array<{ key: string; title: ReactNode }> = [];
		const loop = (c: TableColumns<DataItem>) => {
			c.forEach((item) => {
				if (Array.isArray(item.children)) {
					loop(item.children);
				} else {
					_columns.push({ key: item.key, title: item.title });
				}
			});
		};
		loop(columns);
		return _columns;
	}, [columns]);

	return { columns, leafColumns, setLongColumn };
};

export default useColumns;
