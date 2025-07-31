import createTableColumnsHelper from './SimpleTable/TableUtils/createTableColumnsHelper';
import type { DataItem } from './AppTable.data';
import type { TableColumns } from './SimpleTable/TableTypes/typeColumn';

const columnsHelper = createTableColumnsHelper<DataItem>();

const columns: TableColumns<DataItem> = [
	columnsHelper.createColumn({
		key: 'userId',
		title: '用户id',
		render: ({ userId }) => userId,
	}),
	columnsHelper.createGroup({
		key: 'name',
		title: '姓名',
		children: [
			columnsHelper.createColumn({
				key: 'firstName',
				title: 'firstName',
				render: ({ firstName }) => firstName,
			}),
			columnsHelper.createColumn({
				key: 'lastName',
				title: 'lastName',
				render: ({ lastName }) => lastName,
			}),
		],
	}),
	columnsHelper.createColumn({
		key: 'email',
		title: '邮箱',
		render: ({ email }) => email,
	}),
	columnsHelper.createColumn({
		key: 'avatar',
		title: '头像',
		render: ({ avatar }) => avatar,
	}),
	columnsHelper.createColumn({
		key: 'password',
		title: '密码',
		render: ({ password }) => password,
	}),
	columnsHelper.createColumn({
		key: 'birthdate',
		title: '生日',
		render: ({ birthdate }) => birthdate.toString(),
	}),
	columnsHelper.createColumn({
		key: 'registeredAt',
		title: '注册时间',
		render: ({ registeredAt }) => registeredAt.toString(),
	}),
	columnsHelper.createColumn({
		key: 'age',
		title: '年龄',
		render: ({ age }) => age,
	}),
	columnsHelper.createColumn({
		key: 'gender',
		title: '性别',
		render: ({ gender }) => gender,
	}),
	columnsHelper.createColumn({
		key: 'height',
		title: '身高',
		render: ({ height }) => height,
	}),
	columnsHelper.createColumn({
		key: 'weight',
		title: '体重',
		render: ({ weight }) => weight,
	}),
	columnsHelper.createColumn({
		key: 'phoneNumber',
		title: '电话号码',
		render: ({ phoneNumber }) => phoneNumber,
	}),
	columnsHelper.createColumn({
		key: 'jobArea',
		title: '工作地点',
		render: ({ jobArea }) => jobArea,
	}),
	columnsHelper.createColumn({
		key: 'jobTitle',
		title: '工作头衔',
		render: ({ jobTitle }) => jobTitle,
	}),
	columnsHelper.createColumn({
		key: 'jobType',
		title: '工作类型',
		render: ({ jobType }) => jobType,
	}),
];

export default columns;
