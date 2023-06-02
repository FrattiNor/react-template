import InfiniteLists from '@/components/InfiniteLists';
import useAlarmData from '../Alarm/useAlarmData';
import { useParams } from 'react-router-dom';

const OverviewAlarm = () => {
    const { factoryModelId } = useParams<{ factoryModelId: string }>();
    const { historyData, realtimeData } = useAlarmData({ factoryModelId });
    return <InfiniteLists items={[historyData, realtimeData]} />;
};

export default OverviewAlarm;
