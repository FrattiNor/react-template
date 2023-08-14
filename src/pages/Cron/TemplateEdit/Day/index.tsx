import { FC, useContext, useMemo } from 'react';
import CronContext from '../../Context';
import Normal from '../Normal';
import { Select } from 'antd';

const Day: FC = () => {
    const { dayType, setDayType } = useContext(CronContext);

    const max = useMemo(() => (dayType === 'dayOfMonth' ? 31 : 7), [dayType]);

    const DayTypeSelect = (
        <Select
            size="small"
            value={dayType}
            onChange={setDayType}
            style={{ width: 100, marginBottom: 8 }}
            options={[
                { label: '按月算', value: 'dayOfMonth' },
                { label: '按周算', value: 'dayOfWeek' },
            ]}
        />
    );

    return <Normal min={1} max={max} unit="天" type={dayType} Select={DayTypeSelect} checkboxGroupHeight={108} />;
};

export default Day;
