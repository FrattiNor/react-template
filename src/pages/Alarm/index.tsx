import InfiniteLists from '@/components/InfiniteLists';
import useAlarmData from './useAlarmData';

const Alarm = () => {
    const { historyData, realtimeData } = useAlarmData({});
    return <InfiniteLists items={[historyData, realtimeData]} />;
};

export default Alarm;
