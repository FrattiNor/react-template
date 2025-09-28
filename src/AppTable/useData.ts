import { useCallback, useEffect, useRef, useState } from 'react';

import { faker } from '@faker-js/faker';

import { useAppTableContext } from './AppTableContext';

import type { TableDraggable } from '../Table/TableTypes/type';

const isDev = process.env.NODE_ENV === 'development';

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

export type DataItem = ReturnType<typeof createRandomUser>;

const useData = () => {
	const { params } = useAppTableContext();
	const [loading, setLoading] = useState(false);
	const [autoReload, setAutoReload] = useState(false);
	const [originData, setOriginData] = useState<DataItem[]>(() => getData(isDev ? 5 : 1000));
	const [data, setData] = useState<DataItem[]>(() => originData);

	const changeOriginData = (count: number) => {
		setOriginData(getData(count));
	};

	useEffect(() => {
		const nextData = originData.filter((item) => {
			return Object.keys(params).every((paramsKey) => {
				const itemValue = item[paramsKey as keyof DataItem];
				if (itemValue === undefined) return true;
				const paramsValue = params[paramsKey] as string;
				if (typeof itemValue === 'string') return itemValue.includes(paramsValue);
				if (typeof itemValue === 'number') return String(itemValue).includes(paramsValue);
				if (itemValue instanceof Date) return itemValue.toString().includes(paramsValue);
				return false;
			});
		});

		new Promise((res) => {
			setLoading(true);
			setTimeout(() => res(0), 1000);
		}).then(() => {
			setLoading(false);
			setData(nextData);
		});
	}, [originData, params]);

	// refetch
	const timeoutRef = useRef<ReturnType<typeof setInterval> | null>(null);

	useEffect(() => {
		if (autoReload === true && loading === false) {
			timeoutRef.current = setInterval(() => {
				const count = originData.length;
				console.log(`refresh data(${count})`);
				changeOriginData(count);
			}, 10000);
			return () => {
				if (timeoutRef.current) clearInterval(timeoutRef.current);
			};
		}
	}, [originData, loading, autoReload]);

	const onDragEnd: TableDraggable['onDragEnd'] = useCallback(({ activeId, overId, arrayMove }) => {
		if (overId && activeId !== overId) {
			setData((_items) => {
				let oldIndex = -1;
				let newIndex = -1;

				for (let i = 0; i < _items.length; i++) {
					const _item = _items[i];
					const itemId = _item['userId'];

					if (itemId === activeId) {
						oldIndex = i;
					}

					if (itemId === overId) {
						newIndex = i;
					}

					if (oldIndex >= 0 && newIndex >= 0) {
						break;
					}
				}

				let nextItems = [..._items];

				if (oldIndex >= 0 && newIndex >= 0) {
					nextItems = arrayMove(_items, oldIndex, newIndex);
				}

				return nextItems;
			});
		}
	}, []);

	return { data, loading, changeOriginData, autoReload, setAutoReload, onDragEnd };
};

export default useData;
