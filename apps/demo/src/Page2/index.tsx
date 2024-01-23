import { useNavigate } from 'react-router-dom';

console.log('Page2');

const Page2 = () => {
    const n = useNavigate();
    return <div onClick={() => n('/')}>Page2</div>;
};

export default Page2;
