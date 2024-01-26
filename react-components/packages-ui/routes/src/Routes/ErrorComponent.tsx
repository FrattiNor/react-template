import { useAsyncError, useRouteError } from 'react-router-dom';
import { FC, useEffect } from 'react';

const ErrorBoundary: FC = () => {
    const error = useRouteError();
    const error2 = useAsyncError();

    useEffect(() => {
        if (error) console.error(error);
        if (error2) console.error(error2);
    }, []);

    return <div style={{ maxWidth: '100vw', maxHeight: '100vh', padding: '24px', textAlign: 'center' }}>对不起，发生异常，请刷新页面重试!</div>;
};

export default ErrorBoundary;
