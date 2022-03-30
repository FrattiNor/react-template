import React, { FC, useEffect, useRef } from 'react'
import { canvasProp, ctxStyle, Props } from './util'

const Circle: FC<Props> = ({ height = 50, width = 50, ...rest }) => {
    const ref = useRef<HTMLCanvasElement | null>(null)
    const inner = 2

    useEffect(() => {
        if (ref.current && ref.current.getContext) {
            ref.current.width = width
            ref.current.height = height
            const ctx = ref.current.getContext('2d')

            if (ctx) {
                ctx.save()
                ctxStyle(ctx)
                ctx.beginPath()
                ctx.arc(width / 2, height / 2, Math.min(width / 2, height / 2) - inner, 0, 360)
                ctx.stroke()
                ctx.fill()
                ctx.restore()
            }
        }
    }, [])

    return <canvas ref={ref} height={height} width={width} {...canvasProp} {...rest} />
}

export default Circle
