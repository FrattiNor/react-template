import { faker } from '@faker-js/faker';

const createRandomUser = (_: unknown, index: number) => {
	return {
		index,
		// 用户id
		userId: faker.string.uuid(),
		// 姓名
		firstName: faker.person.firstName(),
		// 姓名
		lastName: faker.person.lastName(),
		// 邮箱
		email: faker.internet.email(),
		// 头像
		avatar: faker.image.avatar(),
		// 密码
		password: faker.internet.password(),
		// 生日
		birthdate: faker.date.birthdate(),
		// 注册时间
		registeredAt: faker.date.past(),
		// 年龄
		age: faker.number.int({ min: 0, max: 100 }),
		// 性别
		gender: faker.person.gender(),
		// 身高
		height: faker.number.float({ fractionDigits: 1, min: 100, max: 200 }),
		// 体重
		weight: faker.number.float({ fractionDigits: 1, min: 100, max: 200 }),
		// 电话号码
		phoneNumber: faker.phone.number(),
		// 工作地点
		jobArea: faker.person.jobArea(),
		// 工作头衔
		jobTitle: faker.person.jobTitle(),
		// 工作类型
		jobType: faker.person.jobType(),
	};
};

const getData = (count: number) =>
	faker.helpers.multiple(createRandomUser, {
		count,
	});

export type DataItem = ReturnType<typeof getData>[0];
export default getData;
