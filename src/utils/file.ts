type fileUploadProps = {
    accept?: string;
    multiple?: boolean;
};

/**
 * 文件上传
 * @param accept 接收类型
 * @param multiple 多选
 */

export const fileUpload = (props?: fileUploadProps): Promise<File[]> => {
    return new Promise((res) => {
        const { accept, multiple } = props || {};
        const input = document.createElement('input');
        input.setAttribute('style', 'display:none');
        input.setAttribute('name', 'files');
        input.setAttribute('type', 'file');
        if (typeof accept === 'string') input.setAttribute('accept', accept);
        if (typeof multiple === 'boolean') input.setAttribute('multiple', `${multiple}`);
        input.onchange = (e) => {
            document.body.removeChild(input);
            const files = (e?.target as any)?.files as FileList;
            const fileArray: File[] = [];
            for (let i = 0; i < files.length; i++) {
                fileArray.push(files[i]);
            }
            res(fileArray);
        };
        document.body.appendChild(input);
        input.click();
    });
};

/**
 * 文件下载
 * @param blob 文件流
 * @param filename 文件名称
 */
export const fileDownload = (blob: Blob, filename: string) => {
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
 * @param url 文件流
 */
export const fileOpen = (url: string) => {
    const aLink = document.createElement('a');
    aLink.setAttribute('style', 'display:none');
    aLink.setAttribute('href', url);
    aLink.setAttribute('target', '_blank');
    document.body.appendChild(aLink);
    aLink.click();
    document.body.removeChild(aLink);
};
