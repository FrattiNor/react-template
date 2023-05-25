import InfiniteLists from '@/components/InfiniteLists';
import useAlarmData from '@/pages/Alarm/useAlarmData';

const DetailList = () => {
    const { historyData, realtimeData } = useAlarmData();
    return <InfiniteLists items={[historyData, realtimeData]} />;
};

export default DetailList;
