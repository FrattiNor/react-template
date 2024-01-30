import { isEmpty } from '../empty';
import { isFormData } from '../valueType';

// 清除空数组，undefined，null，空字符串，空对象
const cleanRecord = <T extends Record<string, any> | FormData>(params: T): T => {
    if (isFormData(params)) {
        const nextParams = new FormData();

        for (const [key, value] of params) {
            if (!isEmpty(value)) {
                nextParams.append(key, value);
            }
        }

        return nextParams as T;
    } else {
        const nextParams: Record<string, any> = {};

        Object.entries(params).forEach(([key, value]) => {
            if (!isEmpty(value)) {
                nextParams[key] = value;
            }
        });

        return nextParams as T;
    }
};

export default cleanRecord;
