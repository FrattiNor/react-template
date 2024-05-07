const getContentDispositionFileName = (contentDisposition?: string) => {
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    const matches = filenameRegex.exec(contentDisposition ?? '');
    if (matches != null && matches[1]) {
        const fileName = decodeURIComponent(matches[1].replace(/['"]/g, '') ?? 'unknown');
        console.log('fileName:', fileName);
        return fileName;
    }
    return 'unknown';
};

export default getContentDispositionFileName;
