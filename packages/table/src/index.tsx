/* eslint-disable react-refresh/only-export-components */
import { Context2Hoc } from './Context2';
import { FC } from 'react';
import Dom from './Dom';

const Table2: FC = () => {
    return <Dom />;
};

export default Context2Hoc(Table2);
export * from './type';
