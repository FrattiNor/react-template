export const Rect = () => {
    return (
        <svg viewBox="0 0 24 24">
            <rect x="1" y="1" width="22" height="22" strokeWidth="1" stroke="#000" fill="transparent" />
        </svg>
    );
};

export const Circle = () => {
    return (
        <svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="11" strokeWidth="1" stroke="#000" fill="transparent" />
        </svg>
    );
};

export const Ellipse = () => {
    return (
        <svg viewBox="0 0 24 24">
            <ellipse cx="12" cy="12" rx="11" ry="8" strokeWidth="1" stroke="#000" fill="transparent" />
        </svg>
    );
};

export const Triangle = () => {
    return (
        <svg viewBox="0 0 24 24">
            <polygon points="12,1 23,23 1,23" strokeWidth="1" stroke="#000" fill="transparent" />
        </svg>
    );
};

/**
 * 获取多边形顶点坐标
 * @param edges 变数
 * @param radius 半径
 * @returns 坐标数组
 */
const getPolygonVertices = (edges: number, radius: number, x: number, y: number) => {
    const vertices = [];
    const interiorAngle = (Math.PI * 2) / edges;
    let rotationAdjustment = -Math.PI / 2;
    if (edges % 2 === 0) {
        rotationAdjustment += interiorAngle / 2;
    }
    for (let i = 0; i < edges; i++) {
        const rad = i * interiorAngle + rotationAdjustment;
        vertices.push({
            x: Math.cos(rad) * radius + x,
            y: Math.sin(rad) * radius + y,
        });
    }
    return vertices;
};

export const Polygon = () => {
    const points = getPolygonVertices(5, 11, 12, 12)
        .map(({ x, y }) => `${x},${y}`)
        .join(' ');

    return (
        <svg viewBox="0 0 24 24">
            <polygon points={points} strokeWidth="1" stroke="#000" fill="transparent" />
        </svg>
    );
};
