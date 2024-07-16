export const base64ToFile = (base64Data: string, filename = 'file') => {
    const arr = base64Data.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || '';
    const suffix = mime.split('/')[1];
    const bstr = window.atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], `${filename}.${suffix}`, {
        type: mime,
    });
};

export const fileToBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
        // 创建一个新的 FileReader 对象
        const reader = new FileReader();
        // 读取 File 对象
        reader.readAsDataURL(file);
        // 加载完成后
        reader.onload = function () {
            if (typeof reader.result === 'string') {
                // 将读取的数据转换为 base64 编码的字符串
                const base64String = reader.result.split(',')[1];
                // 解析为 Promise 对象，并返回 base64 编码的字符串
                resolve(base64String);
            } else {
                reject(new Error('Failed'));
            }
        };

        // 加载失败时
        reader.onerror = function () {
            reject(new Error('Failed to load file'));
        };
    });
};
