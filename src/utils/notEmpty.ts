import { isEmpty } from './tools';

const notEmpty = <T>(t: T, res?: () => any): any => {
    if (isEmpty(t)) {
        return '-';
    } else if (typeof res === 'function') {
        return notEmpty(res());
    } else {
        return t;
    }
};

export default notEmpty;
