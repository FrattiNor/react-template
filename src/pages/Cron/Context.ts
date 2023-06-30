import { createContext } from 'react';
import useData from './useData';

type Props = ReturnType<typeof useData>;

const CronContext = createContext<Props>({} as Props);

export default CronContext;
