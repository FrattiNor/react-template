import type { DataItem } from './AppTable.data';
import type { TableColumns } from './Table/TableTypes/typeColumn';

const columns: TableColumns<DataItem> = [
	{
		key: 'nameGroup',
		title: 'NameGroup',
		fixed: 'left',
		children: [
			{
				width: 150,
				key: 'firstName',
				title: 'firstName_0',
				fixed: 'left',
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
				key: 'lastName',
				title: <span>{'lastName_1'}</span>,
				render: ({ lastName }) => <span>{lastName}</span>,
				width: 150,
			},
		],
	},
	{
		key: 'userId',
		title: '用户id_2',
		render: ({ userId }) => userId,
		width: '10%',
		onCell: (_, index) => ({
			rowSpan: index % 2 === 0 ? 2 : 0,
		}),
	},
	{
		key: 'email',
		title: '邮箱_3',
		render: ({ email }) => email,
		width: 150,
	},
	{
		key: 'avatar',
		title: '头像_4',
		render: ({ avatar }) => avatar,
		width: 150,
	},
	{
		key: '123',
		title: '123',
		fixed: 'left',
		children: [
			{
				key: '456',
				title: '456',
				children: [
					{
						key: 'password',
						title: '密码_5',
						render: ({ password }) => password,
						width: 150,
					},
					{
						key: 'birthdate',
						title: '生日_6',
						render: ({ birthdate }) => birthdate.toString(),
						width: 150,
					},
				],
			},
			{
				key: 'registeredAt',
				title: '注册时间_7',
				render: ({ registeredAt }) => registeredAt.toString(),
				width: 150,
			},
		],
	},
	{
		key: 'age',
		title: '年龄_8',
		render: ({ age }) => age,
		width: 150,
	},
	{
		key: 'gender',
		title: '性别_9',
		render: ({ gender }) => gender,
		width: 150,
	},
	{
		key: 'height',
		title: '身高_10',
		render: ({ height }) => height,
		width: 150,
	},
	{
		key: 'weight',
		title: '体重_11',
		render: ({ weight }) => weight,
		width: 150,
	},
	{
		key: 'phoneNumber',
		title: '电话号码_12',
		render: ({ phoneNumber }) => phoneNumber,
		width: 150,
	},
	{
		key: 'jobArea',
		title: '工作地点_13',
		render: ({ jobArea }) => jobArea,
		width: 150,
		fixed: 'right',
	},
	{
		key: 'jobTitle',
		title: '工作头衔_14',
		render: ({ jobTitle }) => jobTitle,
		width: 150,
	},
	{
		key: 'jobType',
		title: '工作类型_15',
		render: ({ jobType }) => jobType,
		width: 150,
	},
	{
		key: 'nameGroup22',
		title: 'NameGroup',
		fixed: 'right',
		children: [
			{
				width: 150,
				key: 'firstName22',
				title: 'firstName_0',
				fixed: 'left',
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
				width: 150,
			},
		],
	},
];

// const columns2: TableColumns<DataItem> = [
// 	{
// 		width: 150,
// 		key: 'firstName',
// 		title: 'firstName_0',
// 		fixed: 'left',
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
// 		width: 150,
// 	},
// 	{
// 		key: 'userId',
// 		title: '用户id_2',
// 		render: ({ userId }) => userId,
// 		width: '10%',
// 		fixed: 'left',
// 		onCell: (_, index) => ({
// 			rowSpan: index % 2 === 0 ? 2 : 0,
// 		}),
// 	},
// 	{
// 		key: 'email',
// 		title: '邮箱_3',
// 		render: ({ email }) => email,
// 		width: 150,
// 	},
// 	{
// 		key: 'avatar',
// 		title: '头像_4',
// 		render: ({ avatar }) => avatar,
// 		width: 150,
// 		fixed: 'left',
// 	},
// 	{
// 		key: 'password',
// 		title: '密码_5',
// 		render: ({ password }) => password,
// 		width: 150,
// 	},
// 	{
// 		key: 'birthdate',
// 		title: '生日_6',
// 		render: ({ birthdate }) => birthdate.toString(),
// 		width: 150,
// 	},
// 	{
// 		key: 'registeredAt',
// 		title: '注册时间_7',
// 		render: ({ registeredAt }) => registeredAt.toString(),
// 		width: 150,
// 	},
// 	{
// 		key: 'age',
// 		title: '年龄_8',
// 		render: ({ age }) => age,
// 		width: 150,
// 	},
// 	{
// 		key: 'gender',
// 		title: '性别_9',
// 		render: ({ gender }) => gender,
// 		width: 150,
// 	},
// 	{
// 		key: 'height',
// 		title: '身高_10',
// 		render: ({ height }) => height,
// 		width: 150,
// 	},
// 	{
// 		key: 'weight',
// 		title: '体重_11',
// 		render: ({ weight }) => weight,
// 		width: 150,
// 	},
// 	{
// 		key: 'phoneNumber',
// 		title: '电话号码_12',
// 		render: ({ phoneNumber }) => phoneNumber,
// 		width: 150,
// 	},
// 	{
// 		key: 'jobArea',
// 		title: '工作地点_13',
// 		render: ({ jobArea }) => jobArea,
// 		width: 150,
// 		fixed: 'right',
// 	},
// 	{
// 		key: 'jobTitle',
// 		title: '工作头衔_14',
// 		render: ({ jobTitle }) => jobTitle,
// 		width: 150,
// 	},
// 	{
// 		key: 'jobType',
// 		title: '工作类型_15',
// 		render: ({ jobType }) => jobType,
// 		width: 150,
// 		fixed: 'right',
// 	},
// ];

export default columns;
