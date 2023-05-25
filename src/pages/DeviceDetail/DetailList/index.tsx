import InfiniteLists from '@/components/InfiniteLists';
import useAlarmData from '@/pages/Alarm/useAlarmData';
import useLogData from './handleLog/useLogData';
import { FC } from 'react';

type Props = {
    deviceId?: string;
    isdmTag?: string;
};

const DetailList: FC<Props> = ({ deviceId, isdmTag }) => {
    const logData = useLogData(isdmTag);
    const { historyData, realtimeData } = useAlarmData(deviceId);
    return <InfiniteLists items={[historyData, realtimeData, logData]} />;
};

export default DetailList;
