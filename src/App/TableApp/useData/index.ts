import { useEffect, useMemo, useState } from 'react';

import { type GlobalHistoryAlarmItem, useGlobalHistoryAlarm } from '@app/services/src/webServices/Alarm/GlobalAlarm/History';

import { type ListData } from '@/components/ListDataProvider/type';

import { testData } from './data';
import { useTableAppContext } from '../../TableAppContext';

const useData = () => {
	const query = useGlobalHistoryAlarm();
	const { empty } = useTableAppContext();
	const [data, setData] = useState<ListData<GlobalHistoryAlarmItem> | undefined>(() => undefined);

	useEffect(() => {
		query
			.delayMutateAsync(
				{
					params: { statusChangeTimeStart: '2025-01-01 00:00:00', statusChangeTimeEnd: '2025-11-12 23:59:59' },
					pagination: { current: 1, pageSize: 300 },
				},
				2000,
			)
			.then(setData);
	}, []);

	const list = useMemo(() => (empty ? [] : (testData as unknown as GlobalHistoryAlarmItem[])), [empty, data?.list]);

	return { data: list, loading: query.loading };
};

export default useData;
