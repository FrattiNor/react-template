import { useCallback, useState } from 'react';

import { useAppTableContext } from './AppTableContext';
import FilterComponent from './FilterComponent';

import type { DataItem } from './useData';
import type { TableColumnFilter } from '../../Components/Table/TableTypes/type';
import type { TableColumns } from '../../Components/Table/TableTypes/typeColumn';

const useAppTableColumns = () => {
	const { params } = useAppTableContext();

	const [longColumns, setLongColumns] = useState(true);

	const getFilter = useCallback(
		(colKey: string) => {
			const filter: TableColumnFilter = {
				filtered: !!params[colKey],
				highlightKeywords: [params[colKey]],
				renderFilter: ({ close }) => <FilterComponent close={close} name={colKey} />,
			};
			return filter;
		},
		[params],
	);

	const columns = (() => {
		if (longColumns) {
			const columns1: TableColumns<DataItem> = [
				{
					width: 100,
					fixed: 'left',
					key: 'index',
					title: 'Index',
					render: ({ index }) => index,
				},
				{
					fixed: 'left',
					key: 'userId',
					title: '用户id_2',
					render: ({ userId }) => userId,
					width: '10%',
					onCell: (_, index) => ({
						rowSpan: index % 5 === 0 ? 5 : 0,
					}),
					filter: getFilter,
				},
				{
					key: 'nameGroup',
					title: 'NameGroup',
					children: [
						{
							width: 300,
							key: 'firstName',
							forceRender: true,
							title: 'firstName_0',
							render: ({ firstName }) => (
								<div
									style={{
										color: '#fff',
										padding: '12px 6px',
										borderRadius: '4px',
										display: 'inline-block',
										backgroundColor: 'rgba(0,0,0,0.25)',
									}}
								>
									{firstName}
								</div>
							),
							filter: getFilter,
						},
						{
							key: 'lastName',
							title: <span>{'lastName_1'}</span>,
							render: ({ lastName }, { renderHighlightText }) => <span>{renderHighlightText(lastName)}</span>,
							width: 300,
							filter: getFilter,
							onCell: ({ lastName }) => ({ title: lastName }),
						},
					],
				},
				{
					key: 'email',
					title: '邮箱_3',
					fixed: 'left',
					render: ({ email }) => email,
					width: 150,
					filter: getFilter,
				},
				{
					key: 'avatar',
					title: '头像_4',
					render: ({ avatar }) => avatar,
					width: 300,
					onCell: (_, index) => ({
						colSpan: index % 2 ? 2 : 1,
					}),
					filter: getFilter,
				},
				{
					key: '123',
					title: '123',
					children: [
						{
							key: '456',
							title: '456',
							children: [
								{
									key: 'password',
									title: '密码_5',
									render: ({ password }) => password,
									width: 50,
									filter: getFilter,
									onCell: (_, index) => ({
										colSpan: index % 2 ? 0 : 1,
									}),
								},
								{
									key: 'birthdate',
									title: '生日_6',
									render: ({ birthdate }) => birthdate.toString(),
									width: 200,
									filter: getFilter,
								},
							],
						},
						{
							key: 'registeredAt',
							title: '注册时间_7',
							render: ({ registeredAt }) => registeredAt.toString(),
							width: 300,
							filter: getFilter,
						},
					],
				},
				{
					key: 'age',
					title: '年龄_8',
					render: ({ age }) => age,
					width: 300,
					filter: getFilter,
				},
				{
					key: 'gender',
					title: '性别_9',
					render: ({ gender }) => gender,
					width: 300,
					filter: getFilter,
				},
				{
					key: 'height',
					title: '身高_10',
					render: ({ height }) => height,
					width: 300,
					filter: getFilter,
				},
				{
					key: 'weight',
					title: '体重_11',
					render: ({ weight }) => weight,
					width: 300,
					filter: getFilter,
				},
				{
					key: 'phoneNumber',
					title: '电话号码_12',
					render: ({ phoneNumber }) => phoneNumber,
					width: 300,
					filter: getFilter,
				},
				{
					key: 'jobArea',
					title: '工作地点_13',
					render: ({ jobArea }) => jobArea,
					width: 150,
					fixed: 'right',
					filter: getFilter,
					sort: {
						sorted: 'ascend',
						sortDirections: ['ascend', 'descend'],
					},
				},
				{
					key: 'jobTitle',
					title: '工作头衔_14',
					render: ({ jobTitle }) => jobTitle,
					width: 300,
					filter: getFilter,
				},
				{
					key: 'jobType',
					title: '工作类型_15',
					render: ({ jobType }) => jobType,
					width: 150,
					fixed: 'right',
					sort: {
						sorted: 'ascend',
						sortDirections: ['ascend', 'descend'],
					},
					filter: getFilter,
				},
				{
					key: 'nameGroup22',
					title: 'NameGroup',
					children: [
						{
							width: 300,
							key: 'firstName22',
							title: 'firstName_0',
							render: ({ firstName }) => (
								<div
									style={{
										padding: 4,
										color: '#fff',
										borderRadius: '4px',
										display: 'inline-block',
										backgroundColor: 'rgba(0,0,0,0.25)',
									}}
								>
									{firstName}
								</div>
							),
							sort: {
								sorted: 'ascend',
								sortDirections: ['ascend', 'descend'],
							},
							filter: getFilter,
						},
						{
							key: 'lastName22',
							title: <span>{'lastName_1'}</span>,
							render: ({ lastName }) => <span>{lastName}</span>,
							width: 300,
							sort: {
								sorted: 'ascend',
								sortDirections: ['ascend', 'descend'],
							},
							filter: getFilter,
						},
					],
				},
			];

			return columns1;
		}

		const columns2: TableColumns<DataItem> = [
			{
				width: 100,
				fixed: 'left',
				key: 'index',
				title: 'Index',
				render: ({ index }) => index,
			},
			{
				key: 'lastName',
				title: <span>{'lastName_1'}</span>,
				render: ({ lastName }) => <span>{lastName}</span>,
				width: 300,
				filter: getFilter,
			},
			{
				key: 'userId',
				title: '用户id_2',
				render: ({ userId }) => userId,
				width: '10%',
				onCell: (_, index) => ({
					rowSpan: index % 2 === 0 ? 2 : 0,
				}),
				filter: getFilter,
			},
			{
				key: 'email',
				title: '邮箱_3',
				render: ({ email }) => email,
				width: 300,
				filter: getFilter,
			},
			{
				key: 'avatar',
				title: '头像_4',
				render: ({ avatar }) => avatar,
				width: 300,
				filter: getFilter,
			},
		];

		return columns2;
	})();

	return { columns, setLongColumns };
};

export default useAppTableColumns;
