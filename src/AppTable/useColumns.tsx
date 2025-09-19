/* eslint-disable react-refresh/only-export-components */
import { useEffect, useMemo, useState, type FC } from 'react';

import { TableFilterTemplate } from '../Table/TableComponent';

import type { DataItem } from './data';
import type { TableFilter } from '../Table/TableTypes/type';
import type { TableColumns } from '../Table/TableTypes/typeColumn';

const FilterComponent: FC<{ close: () => void }> = ({ close }) => {
	useEffect(() => {
		console.log('FilterComponent');
	}, []);
	return (
		<TableFilterTemplate
			onReset={() => {
				console.log('onReset');
				close();
			}}
			onSubmit={() => {
				console.log('onSubmit');
				close();
			}}
		>
			<div style={{ width: 200, height: 300 }}>FilterComponent</div>
		</TableFilterTemplate>
	);
};

const useAppTableColumns = ({ colIndex, keyword }: { colIndex: number | undefined; keyword: string }) => {
	const [longColumns, setLongColumns] = useState(true);
	const highlightKeywords = useMemo(() => [keyword], [keyword]);
	const getHighlightKeywords = (index: number) => {
		if (index === colIndex) return highlightKeywords;
		return undefined;
	};

	const createFilter = (index: number) => {
		const filter: TableFilter = {
			filtered: true,
			FilterComponent: FilterComponent,
			highlightKeywords: getHighlightKeywords(index),
		};
		return filter;
	};

	const columns = (() => {
		if (longColumns) {
			const columns1: TableColumns<DataItem> = [
				{
					fixed: 'left',
					key: 'userId',
					title: '用户id_2',
					render: ({ userId }) => userId,
					width: '10%',
					onCell: (_, index) => ({
						rowSpan: index % 2 === 0 ? 2 : 0,
					}),
					filter: createFilter(0),
				},
				{
					key: 'nameGroup',
					title: 'NameGroup',
					children: [
						{
							width: 300,
							key: 'firstName',
							title: 'firstName_0',
							render: ({ firstName }) => (
								<div
									style={{
										color: '#fff',
										padding: '2px 6px',
										borderRadius: '4px',
										display: 'inline-block',
										backgroundColor: 'rgba(0,0,0,0.25)',
									}}
								>
									{firstName}
								</div>
							),
							filter: createFilter(1),
						},
						{
							key: 'lastName',
							title: <span>{'lastName_1'}</span>,
							render: ({ lastName }, { renderHighlightText }) => <span>{renderHighlightText(lastName)}</span>,
							width: 300,
							filter: createFilter(2),
							onCell: ({ lastName }) => ({ title: lastName }),
						},
					],
				},
				{
					key: 'email',
					title: '邮箱_3',
					render: ({ email }) => email,
					width: 300,
					onCell: () => ({
						colSpan: 2,
					}),
					filter: createFilter(3),
				},
				{
					key: 'avatar',
					title: '头像_4',
					render: ({ avatar }) => avatar,
					width: 300,
					onCell: () => ({
						colSpan: 0,
					}),
					filter: createFilter(4),
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
									filter: createFilter(5),
								},
								{
									key: 'birthdate',
									title: '生日_6',
									render: ({ birthdate }) => birthdate.toString(),
									width: 200,
									filter: createFilter(6),
								},
							],
						},
						{
							key: 'registeredAt',
							title: '注册时间_7',
							render: ({ registeredAt }) => registeredAt.toString(),
							width: 300,
							filter: createFilter(7),
						},
					],
				},
				{
					key: 'age',
					title: '年龄_8',
					render: ({ age }) => age,
					width: 300,
					filter: createFilter(8),
				},
				{
					key: 'gender',
					title: '性别_9',
					render: ({ gender }) => gender,
					width: 300,
					filter: createFilter(9),
				},
				{
					key: 'height',
					title: '身高_10',
					render: ({ height }) => height,
					width: 300,
					filter: createFilter(10),
				},
				{
					key: 'weight',
					title: '体重_11',
					render: ({ weight }) => weight,
					width: 300,
					filter: createFilter(11),
				},
				{
					key: 'phoneNumber',
					title: '电话号码_12',
					render: ({ phoneNumber }) => phoneNumber,
					width: 300,
					filter: createFilter(12),
				},
				{
					key: 'jobArea',
					title: '工作地点_13',
					render: ({ jobArea }) => jobArea,
					width: 300,
					filter: createFilter(13),
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
					filter: createFilter(14),
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
							filter: createFilter(15),
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
							filter: createFilter(16),
						},
					],
				},
				{
					key: 'jobType',
					title: '工作类型_15',
					render: ({ jobType }) => jobType,
					width: 300,
					fixed: 'right',
					sort: {
						sorted: 'ascend',
						sortDirections: ['ascend', 'descend'],
					},
					filter: createFilter(17),
				},
			];

			return columns1;
		}

		const columns2: TableColumns<DataItem> = [
			{
				key: 'lastName',
				title: <span>{'lastName_1'}</span>,
				render: ({ lastName }) => <span>{lastName}</span>,
				width: 300,
				filter: createFilter(0),
			},
			{
				key: 'userId',
				title: '用户id_2',
				render: ({ userId }) => userId,
				width: '10%',
				onCell: (_, index) => ({
					rowSpan: index % 2 === 0 ? 2 : 0,
				}),
				filter: createFilter(1),
			},
			{
				key: 'email',
				title: '邮箱_3',
				render: ({ email }) => email,
				width: 300,
				onCell: () => ({
					colSpan: 2,
				}),
				filter: createFilter(2),
			},
			{
				key: 'avatar',
				title: '头像_4',
				render: ({ avatar }) => avatar,
				width: 300,
				filter: createFilter(3),
			},
		];

		return columns2;
	})();

	return { columns, setLongColumns };
};

export default useAppTableColumns;
