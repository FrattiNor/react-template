/* eslint-disable react-refresh/only-export-components */
import type { FC } from 'react';
import { Suspense, lazy } from 'react';

import ReactDOM from 'react-dom/client';

const B = lazy(() => import('./B'));

const Entry: FC = () => {
    return (
        <Suspense>
            <B />
        </Suspense>
    );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<Entry />);
