import InfiniteLists from '@/components/InfiniteLists';
import useAlarmData from './useAlarmData';
import Header from '@/components/Header';

const Alarm = () => {
    const { historyData, realtimeData } = useAlarmData();

    return (
        <Header boxShadow={false}>
            <InfiniteLists items={[historyData, realtimeData]} />
        </Header>
    );
};

export default Alarm;
