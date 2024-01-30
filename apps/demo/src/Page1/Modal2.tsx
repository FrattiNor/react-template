import { Component } from 'react';

import { AutoModal } from '@react/components';

console.log('modal2');

class Modal2 extends Component<{ b: number }> {
    componentDidMount() {
        console.log(2);
    }

    render() {
        return (
            <AutoModal title="新增2" width={700}>
                <div style={{ height: 300, background: 'rgba(0,0,0,0.1)' }}>{this.props.b}</div>
            </AutoModal>
        );
    }
}

export default Modal2;
