type dots = {
    x: number
    y: number
}[]

export const lineDots = (ctx: CanvasRenderingContext2D, dots: dots) => {
    for (let i = 0; i < dots.length; i++) {
        if (i === 0) {
            ctx.moveTo(dots[i].x, dots[i].y)
        } else {
            ctx.lineTo(dots[i].x, dots[i].y)
        }
    }
}

export const ctxStyle = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = '#000'
    ctx.fillStyle = '#fff'
    ctx.lineWidth = 2
    ctx.lineJoin = 'round'
}

export const canvasProp = {
    // draggable: true
}

export type Props = {
    height?: number
    width?: number
    onDragStart?: any
    onMouseDown?: any
    draggable?: boolean
}
