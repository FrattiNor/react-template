export const atob = (text: string) => {
    return Buffer.from(text, 'base64').toString('utf-8');
};

export const btoa = (text: string) => {
    return Buffer.from(text, 'utf-8').toString('base64');
};
