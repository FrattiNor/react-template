import { FC, useEffect } from 'react';
import { useAsyncError, useRouteError } from 'react-router-dom';

import { useTranslation } from '@pkg/i18n';

const ErrorBoundary: FC = () => {
    const error = useRouteError();
    const error2 = useAsyncError();
    const { t1 } = useTranslation();

    useEffect(() => {
        if (error) console.error(error);
        if (error2) console.error(error2);
    }, []);

    return <div style={{ maxWidth: '100vw', maxHeight: '100vh', padding: '24px', textAlign: 'center' }}>{t1('package@route.error')}</div>;
};

export default ErrorBoundary;
