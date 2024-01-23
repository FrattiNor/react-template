import { useNavigate } from 'react-router-dom';

const Page1Detail = () => {
    const n = useNavigate();
    return <div onClick={() => n('/')}>Page1Detail</div>;
};

export default Page1Detail;
