import { useEffect, useRef, useState } from 'react';

import { faker } from '@faker-js/faker';

import { useAppTableContext } from './AppTableContext';

const createRandomUser = () => ({
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
});

const getData = (count: number) =>
	faker.helpers.multiple(createRandomUser, {
		count,
	});

export type DataItem = ReturnType<typeof createRandomUser>;

const useData = () => {
	const { params } = useAppTableContext();
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<DataItem[]>(() => getData(10000));

	const fetchData = (count: number) => {
		return new Promise((res) => {
			setLoading(true);
			setTimeout(() => res(0), 1000);
		}).then(() => {
			setLoading(false);
			setData(getData(count));
		});
	};

	useEffect(() => {
		const count = data.length;
		fetchData(count);
	}, [params]);

	// refetch
	const timeoutRef = useRef<ReturnType<typeof setInterval> | null>(null);

	useEffect(() => {
		if (loading === false) {
			timeoutRef.current = setInterval(() => {
				const count = data.length;
				console.log(`refresh data(${count})`);
				fetchData(count);
			}, 10000);
			return () => {
				if (timeoutRef.current) clearInterval(timeoutRef.current);
			};
		}
	}, [data, loading]);

	return { data, loading, fetchData };
};

export default useData;
