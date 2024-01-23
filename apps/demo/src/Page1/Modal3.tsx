import { AutoModal } from '@react/components';
import { FC, useEffect } from 'react';

console.log('modal3');

const Modal3: FC<{ c: number }> = ({ c }) => {
    useEffect(() => {
        console.log(3);
    }, []);

    return (
        <AutoModal title="新增" width={800}>
            <div style={{ height: 3000, background: 'rgba(0,0,0,0.1)' }}>{c}</div>
        </AutoModal>
    );
};

export default Modal3;
