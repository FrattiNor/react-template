import React, { FC, useEffect, useRef } from 'react'
import { canvasProp, ctxStyle, Props } from './util'

const Rect: FC<Props> = ({ height = 50, width = 50, ...rest }) => {
    const ref = useRef<HTMLCanvasElement | null>(null)
    const inner = 2
    const circleInner = 8 // 圆角半径

    useEffect(() => {
        if (ref.current && ref.current.getContext) {
            ref.current.width = width
            ref.current.height = height
            const ctx = ref.current.getContext('2d')

            if (ctx) {
                ctx.save()
                ctxStyle(ctx)
                ctx.beginPath()
                ctx.moveTo(inner + circleInner, inner)
                ctx.arcTo(inner, inner, inner, inner + circleInner, circleInner)
                ctx.lineTo(inner, height - inner - circleInner)
                ctx.arcTo(inner, height - inner, inner + circleInner, height - inner, circleInner)
                ctx.lineTo(width - inner - circleInner, height - inner)
                ctx.arcTo(width - inner, height - inner, width - inner, height - inner - circleInner, circleInner)
                ctx.lineTo(width - inner, inner + circleInner)
                ctx.arcTo(width - inner, inner, width - inner - circleInner, inner, circleInner)
                ctx.closePath()
                ctx.stroke()
                ctx.fill()
                ctx.restore()
            }
        }
    }, [])

    return <canvas ref={ref} height={height} width={width} {...canvasProp} {...rest} />
}

export default Rect
