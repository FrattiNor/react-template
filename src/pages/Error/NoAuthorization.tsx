import type { FC } from 'react';
import Result from './SvgResult';

const NoAuthorization: FC = () => {
    return <Result code="403" message={`软件未授权！`} />;
};

export default NoAuthorization;
