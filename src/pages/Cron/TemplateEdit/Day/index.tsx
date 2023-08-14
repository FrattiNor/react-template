import { FC, useContext, useMemo } from 'react';
import CronContext from '../../Context';
import Normal from '../Normal';
import { Select } from 'antd';

const Day: FC = () => {
    const { dayType, setDayType } = useContext(CronContext);

    const max = useMemo(() => (dayType === 'dayOfMonth' ? 31 : 7), [dayType]);

    return (
        <Normal
            min={1}
            max={max}
            unit="天"
            type={dayType}
            checkboxWidth={47.5}
            Select={
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
            }
        />
    );
};

export default Day;
