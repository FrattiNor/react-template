import { FC } from 'react';
import KeepAlive from './KeepAlive';

function keepAliveHoc<T>(Component: FC<T>, cacheKey: string) {
    const Inner: FC<T> = (props) => {
        return (
            <KeepAlive cacheKey={cacheKey}>
                <Component {...(props as any)} />
            </KeepAlive>
        );
    };

    return Inner;
}

export default keepAliveHoc;
