import styles from './theme.module.less';
import { createContext } from 'react';
import useData from './useData';

type ContextProps = ReturnType<typeof useData>;

const Context = createContext<ContextProps>({
    theme: 'light',
    themeClassName: styles['light'],
} as ContextProps);

export default Context;
