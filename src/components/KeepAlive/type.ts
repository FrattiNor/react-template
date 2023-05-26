import { KeepAliveProps } from 'react-activation';

export type Props = KeepAliveProps;

export type ContextProps = {
    setCache: (v: boolean) => Promise<any>;
};
