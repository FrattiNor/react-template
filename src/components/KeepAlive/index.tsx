import { FC, useCallback, useRef } from 'react';
import NativeKeepAlive from 'react-activation';
import styles from './index.module.less';
import Context from './context';
import { Props } from './type';

const KeepAlive: FC<Props> = ({ children, ...props }) => {
    const when = useRef(false);

    const getWhen = useCallback(() => {
        console.log(when.current);
        return when.current;
    }, []);

    const setCache = useCallback((v: boolean) => {
        when.current = v;
        return Promise.resolve();
    }, []);

    return (
        <div className={styles['keep-alive-wrapper']}>
            <Context.Provider value={{ setCache }}>
                <NativeKeepAlive {...props} when={getWhen}>
                    {children}
                </NativeKeepAlive>
            </Context.Provider>
        </div>
    );
};

export default KeepAlive;
