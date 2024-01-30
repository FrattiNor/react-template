import { FC, useEffect } from 'react';

import { AutoModal } from '@react/components';

console.log('modal1');

const Modal1: FC<{ a: number }> = ({ a }) => {
    useEffect(() => {
        console.log(1);
    }, []);

    return (
        <AutoModal title="新增" width={800}>
            <div style={{ height: 3000, background: 'rgba(0,0,0,0.1)' }}>{a}</div>
        </AutoModal>
    );
};

export default Modal1;
