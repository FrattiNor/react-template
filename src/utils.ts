import axios from 'axios';

export const atob = (text: string) => {
    return Buffer.from(text, 'base64').toString('utf-8');
};

export const btoa = (text: string) => {
    return Buffer.from(text, 'utf-8').toString('base64');
};

const client = axios.create({
    proxy: {
        protocol: 'http',
        host: '127.0.0.1',
        port: 8080,
    },
});

export const transformEquipmentId = (id: string) => {
    return client<string>({
        method: 'GET',
        url: `http://192.168.22.131:30323/mapping?id=${id}`,
    });
};
