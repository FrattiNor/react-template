/* eslint-disable no-debugger */
import dotenv from 'dotenv';
import axios from 'axios';

// 加载环境变量
dotenv.config();

// 将 obj 转为 formData
const transformObjToFormData = (obj: Record<string, any>) => {
    const newFormData = new URLSearchParams();
    Object.entries(obj).forEach(([k, v]) => {
        if (Array.isArray(v)) {
            v.forEach((item) => newFormData.append(k, item));
        } else {
            newFormData.append(k, v);
        }
    });
    return newFormData;
};

const loginUrl = 'https://portal.supcon.com/cas-web/login?service=http%3A%2F%2Fsupportal.supcon.com%3A80%2Finter-api%2Fauth%2Fv1%2Fthird%2Fauthorize';

axios.post(loginUrl).then((res) => {
    const cookieArr = res.headers['set-cookie'];
    let JSESSIONID = '';
    if (Array.isArray(cookieArr)) {
        cookieArr.forEach((item) => {
            const id = /JSESSIONID=(.*?);/.exec(item)?.[1];
            if (typeof id === 'string' && id.length > 0) {
                JSESSIONID = id;
            }
        });
    }

    if (typeof res.data === 'string') {
        const lt = /name="lt" value="(.*)"/.exec(res.data)?.[1];
        if (lt) {
            axios
                .post(
                    loginUrl,
                    transformObjToFormData({
                        portal_username: 'sunzhibin',
                        password: 'QWEtPS09LT0xMjM=',
                        username: 'sunzhibin',
                        _eventId: 'submit',
                        veCode: '',
                        lt,
                    }),
                    {
                        headers: {
                            Cookie: `JSESSIONID=${JSESSIONID};`,
                        },
                    },
                )
                .then((res) => {
                    if (typeof res.request.path === 'string') {
                        console.log(res.request.path);
                        console.log(/ticket=(.*)$/.exec(res.request.path)?.[1]);
                    }
                    debugger;
                });
        }
    }
});
