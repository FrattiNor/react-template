import got, { Got } from 'got';

// 将 obj 转为 formData
export const transformObjToFormData = (obj: Record<string, any>, type: 'FormData' | 'URLSearchParams') => {
    const newFormData = type === 'FormData' ? new FormData() : new URLSearchParams();
    Object.entries(obj).forEach(([k, v]) => {
        if (Array.isArray(v)) {
            v.forEach((item) => newFormData.append(k, item));
        } else {
            newFormData.append(k, v);
        }
    });
    return newFormData;
};

class GotInstanceClass {
    instance: Got | null = null;

    getInstance() {
        if (this.instance === null) {
            this.instance = got.extend({
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
                },
            });
        }
        return this.instance;
    }
}

export const gotInstance = new GotInstanceClass();
