import Normal from '../Normal';
import { FC } from 'react';

const Year: FC = () => {
    return <Normal unit="年" type="year" min={2000} max={2099} inputMin={1} inputMax={9999} checkboxItemWidth={57} />;
};

export default Year;
