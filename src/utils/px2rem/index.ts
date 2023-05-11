export const px2rem = (px: number): number => {
    const oneRem2Px = Number(import.meta.env.VITE_ONE_REM_TO_PX);
    if (typeof oneRem2Px === 'number' && !isNaN(oneRem2Px) && oneRem2Px > 0) {
        return px / oneRem2Px;
    }
    console.error('环境变量VITE_ONE_REM_TO_PX错误');
    return px;
};
