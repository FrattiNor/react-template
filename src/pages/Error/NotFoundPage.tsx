import type { FC } from 'react';
import Result from './SvgResult';

const NotFoundPage: FC = () => {
    return <Result code="404" message={`很抱歉，您访问的页面不存在！`} />;
};

export default NotFoundPage;
