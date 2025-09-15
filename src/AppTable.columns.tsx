import type { DataItem } from './AppTable.data';
import type { TableColumns } from './Table/TableTypes/typeColumn';

const columns: TableColumns<DataItem> = [
	{
		fixed: 'left',
		key: 'userId',
		title: '用户id_2',
		render: ({ userId }) => userId,
		width: '10%',
		onCell: (_, index) => ({
			rowSpan: index % 2 === 0 ? 2 : 0,
		}),
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
			},
			{
				key: 'lastName',
				title: <span>{'lastName_1'}</span>,
				render: ({ lastName }) => <span>{lastName}</span>,
				width: 300,
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
	},
	{
		key: 'avatar',
		title: '头像_4',
		render: ({ avatar }) => avatar,
		width: 300,
		onCell: () => ({
			colSpan: 0,
		}),
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
						width: 300,
					},
					{
						key: 'birthdate',
						title: '生日_6',
						render: ({ birthdate }) => birthdate.toString(),
						width: 300,
					},
				],
			},
			{
				key: 'registeredAt',
				title: '注册时间_7',
				render: ({ registeredAt }) => registeredAt.toString(),
				width: 300,
			},
		],
	},
	{
		key: 'age',
		title: '年龄_8',
		render: ({ age }) => age,
		width: 300,
	},
	{
		key: 'gender',
		title: '性别_9',
		render: ({ gender }) => gender,
		width: 300,
	},
	{
		key: 'height',
		title: '身高_10',
		render: ({ height }) => height,
		width: 300,
	},
	{
		key: 'weight',
		title: '体重_11',
		render: ({ weight }) => weight,
		width: 300,
	},
	{
		key: 'phoneNumber',
		title: '电话号码_12',
		render: ({ phoneNumber }) => phoneNumber,
		width: 300,
	},
	{
		key: 'jobArea',
		title: '工作地点_13',
		render: ({ jobArea }) => jobArea,
		width: 300,
	},
	{
		key: 'jobTitle',
		title: '工作头衔_14',
		render: ({ jobTitle }) => jobTitle,
		width: 300,
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
			},
			{
				key: 'lastName22',
				title: <span>{'lastName_1'}</span>,
				render: ({ lastName }) => <span>{lastName}</span>,
				width: 300,
			},
		],
	},
	{
		key: 'jobType',
		title: '工作类型_15',
		render: ({ jobType }) => jobType,
		width: 300,
		fixed: 'right',
	},
];

// const columns2: TableColumns<DataItem> = [
// 	{
// 		width: 300,
// 		key: 'firstName',
// 		title: 'firstName_0',
// 		 'left',
// 		render: ({ firstName }) => (
// 			<div
// 				style={{
// 					padding: 4,
// 					color: '#fff',
// 					borderRadius: '4px',
// 					display: 'inline-block',
// 					backgroundColor: 'rgba(0,0,0,0.25)',
// 				}}
// 			>
// 				{firstName}
// 			</div>
// 		),
// 	},
// 	{
// 		key: 'lastName',
// 		title: <span>{'lastName_1'}</span>,
// 		render: ({ lastName }) => <span>{lastName}</span>,
// 		width: 300,
// 	},
// 	{
// 		key: 'userId',
// 		title: '用户id_2',
// 		render: ({ userId }) => userId,
// 		width: '10%',
// 		 'left',
// 		onCell: (_, index) => ({
// 			rowSpan: index % 2 === 0 ? 2 : 0,
// 		}),
// 	},
// 	{
// 		key: 'email',
// 		title: '邮箱_3',
// 		render: ({ email }) => email,
// 		width: 300,
// 	},
// 	{
// 		key: 'avatar',
// 		title: '头像_4',
// 		render: ({ avatar }) => avatar,
// 		width: 300,
// 		 'left',
// 	},
// 	{
// 		key: 'password',
// 		title: '密码_5',
// 		render: ({ password }) => password,
// 		width: 300,
// 	},
// 	{
// 		key: 'birthdate',
// 		title: '生日_6',
// 		render: ({ birthdate }) => birthdate.toString(),
// 		width: 300,
// 	},
// 	{
// 		key: 'registeredAt',
// 		title: '注册时间_7',
// 		render: ({ registeredAt }) => registeredAt.toString(),
// 		width: 300,
// 	},
// 	{
// 		key: 'age',
// 		title: '年龄_8',
// 		render: ({ age }) => age,
// 		width: 300,
// 	},
// 	{
// 		key: 'gender',
// 		title: '性别_9',
// 		render: ({ gender }) => gender,
// 		width: 300,
// 	},
// 	{
// 		key: 'height',
// 		title: '身高_10',
// 		render: ({ height }) => height,
// 		width: 300,
// 	},
// 	{
// 		key: 'weight',
// 		title: '体重_11',
// 		render: ({ weight }) => weight,
// 		width: 300,
// 	},
// 	{
// 		key: 'phoneNumber',
// 		title: '电话号码_12',
// 		render: ({ phoneNumber }) => phoneNumber,
// 		width: 300,
// 	},
// 	{
// 		key: 'jobArea',
// 		title: '工作地点_13',
// 		render: ({ jobArea }) => jobArea,
// 		width: 300,
// 		 'right',
// 	},
// 	{
// 		key: 'jobTitle',
// 		title: '工作头衔_14',
// 		render: ({ jobTitle }) => jobTitle,
// 		width: 300,
// 	},
// 	{
// 		key: 'jobType',
// 		title: '工作类型_15',
// 		render: ({ jobType }) => jobType,
// 		width: 300,
// 		 'right',
// 	},
// ];

export default columns;
