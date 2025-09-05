import type { DataItem } from './AppTable.data';
import type { TableColumns } from './Table/TableTypes/typeColumn';

const columns: TableColumns<DataItem> = [
	{
		key: 'userId',
		title: '用户id',
		render: ({ userId }) => userId,
		width: '40%',
	},
	{
		width: 150,
		key: 'firstName',
		title: 'firstName',
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
		title: <span>{'lastName'}</span>,
		render: ({ lastName }) => <span>{lastName}</span>,
		width: 150,
	},
	{
		key: 'email',
		title: '邮箱',
		render: ({ email }) => email,
		width: 150,
	},
	{
		key: 'avatar',
		title: '头像',
		render: ({ avatar }) => avatar,
		width: 150,
	},
	{
		key: 'password',
		title: '密码',
		render: ({ password }) => password,
		width: 150,
	},
	// {
	// 	key: 'birthdate',
	// 	title: '生日',
	// 	render: ({ birthdate }) => birthdate.toString(),
	// 	width: 150,
	// },
	// {
	// 	key: 'registeredAt',
	// 	title: '注册时间',
	// 	render: ({ registeredAt }) => registeredAt.toString(),
	// 	width: 150,
	// },
	// {
	// 	key: 'age',
	// 	title: '年龄',
	// 	render: ({ age }) => age,
	// 	width: 150,
	// },
	// {
	// 	key: 'gender',
	// 	title: '性别',
	// 	render: ({ gender }) => gender,
	// 	width: 150,
	// },
	// {
	// 	key: 'height',
	// 	title: '身高',
	// 	render: ({ height }) => height,
	// 	width: 150,
	// },
	// {
	// 	key: 'weight',
	// 	title: '体重',
	// 	render: ({ weight }) => weight,
	// 	width: 150,
	// },
	// {
	// 	key: 'phoneNumber',
	// 	title: '电话号码',
	// 	render: ({ phoneNumber }) => phoneNumber,
	// 	width: 150,
	// },
	// {
	// 	key: 'jobArea',
	// 	title: '工作地点',
	// 	render: ({ jobArea }) => jobArea,
	// 	width: 150,
	// },
	// {
	// 	key: 'jobTitle',
	// 	title: '工作头衔',
	// 	render: ({ jobTitle }) => jobTitle,
	// 	width: 150,
	// },
	// {
	// 	key: 'jobType',
	// 	title: '工作类型',
	// 	render: ({ jobType }) => jobType,
	// 	width: 150,
	// },
];

export default columns;
