import { useNavigate } from 'react-router-dom';

import { useCurrentTitles } from '@react/components';

const Page1Detail = () => {
    const n = useNavigate();
    useCurrentTitles();
    return <div onClick={() => n('/')}>Page1Detail</div>;
};

export default Page1Detail;
