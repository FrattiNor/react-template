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

export const transformFactoryModelId = (ids: Array<string>) => {
    return client<{ id: string }>({
        method: 'POST',
        url: 'http://192.168.188.45:7777/factory-model/bluetron-tree',
        data: { tree: `,${ids.join(',')},` },
    });
};

export const transformEquipmentId = (id: string) => {
    return client<{ isdmTag: string }>({
        method: 'POST',
        url: 'http://192.168.188.45:7777/device/isdm-tag',
        data: { equipmentId: id },
    });
};
