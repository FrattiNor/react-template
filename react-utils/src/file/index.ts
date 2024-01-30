type fileUploadProps = {
    accept?: string;
    multiple?: boolean;
};

/**
 * 文件上传
 * @param accept 接收类型
 * @param multiple 多选
 */

export const uploadFile = (props?: fileUploadProps): Promise<File[]> => {
    return new Promise((res) => {
        // 创建input元素
        const { accept, multiple } = props || {};
        const input = document.createElement('input');
        input.setAttribute('style', 'display:none');
        input.setAttribute('name', 'files');
        input.setAttribute('type', 'file');
        if (typeof accept === 'string') input.setAttribute('accept', accept);
        if (typeof multiple === 'boolean') input.setAttribute('multiple', `${multiple}`);
        // 绑定上传事件
        input.addEventListener('change', (e) => {
            const files = (e?.target as any)?.files as FileList;
            const fileArray: File[] = [];
            for (let i = 0; i < files.length; i++) {
                fileArray.push(files[i]);
            }
            res(fileArray);
        });
        // 无论是否触发了上传，都清除掉插入的input元素【延迟清除，避免影响input change事件】
        window.addEventListener(
            'focus',
            () => {
                setTimeout(() => {
                    document.body.removeChild(input);
                }, 1000);
            },
            { once: true },
        );
        // 插入input元素，并触发点击事件
        document.body.appendChild(input);
        input.click();
    });
};

/**
 * 文件下载
 * @param blob 文件数据
 * @param filename 文件名称
 */
export const downloadBlob = (blob: Blob, filename: string) => {
    const blobUrl = URL.createObjectURL(blob);
    const aLink = document.createElement('a');
    aLink.setAttribute('style', 'display:none');
    aLink.setAttribute('href', `${blobUrl}`);
    aLink.setAttribute('download', `${filename}`);
    document.body.appendChild(aLink);
    aLink.click();
    URL.revokeObjectURL(blobUrl);
    document.body.removeChild(aLink);
};

/**
 * 文件打开
 * @param url 文件直链
 */
export const openFileUrl = (url: string) => {
    const aLink = document.createElement('a');
    aLink.setAttribute('style', 'display:none');
    aLink.setAttribute('href', url);
    aLink.setAttribute('target', '_blank');
    document.body.appendChild(aLink);
    aLink.click();
    document.body.removeChild(aLink);
};

/**
 * 下载url直链，而非打开
 * @param url 文件直链
 * @param filename 文件名称
 */
export const downloadFileUrl = (url: string, filename: string) => {
    fetch(url).then((res) => {
        res.blob().then((blob) => {
            downloadBlob(blob, filename);
        });
    });
};
