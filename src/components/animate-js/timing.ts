// timing函数

export const easeIn = (progress: number) => {
    return Math.pow(progress, 2)
}

export const easeOut = (progress: number) => {
    return -(progress * progress) + 2 * progress
}

// 将前半段0-0.5映射0-1，除2，后半段0.5-1映射到0-1，除2，加0.5
export const easeInOut = (progress: number) => {
    if (progress < 0.5) {
        return easeIn(progress * 2) / 2
    } else {
        return easeOut((progress - 0.5) * 2) / 2 + 0.5
    }
}

// 线性函数
export const linear = (progress: number) => {
    return progress
}

// 抛物线
export const quad = (x: number) => (progress: number) => {
    return Math.pow(progress, x)
}

// 圆弧
export const circ = (progress: number) => {
    return 1 - Math.sin(Math.acos(progress))
}

// 反弹
export const back = (x: number) => (progress: number) => {
    return Math.pow(progress, 2) * ((x + 1) * progress - x)
}

// 伸缩动画
export const elastic = (x: number) => (progress: number) => {
    return Math.pow(2, 10 * (progress - 1)) * Math.cos(((20 * Math.PI * x) / 3) * progress)
}
