import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import useDocumentTitle from '../hooks/useDocumentTitle';

const DocumentTitleComponent: FC = () => {
    useDocumentTitle();
    return <Outlet />;
};

export default DocumentTitleComponent;
