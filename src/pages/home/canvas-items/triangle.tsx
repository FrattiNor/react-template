import React, { FC, useEffect, useRef } from 'react'
import { lineDots, canvasProp, ctxStyle, Props } from './util'

const Rect: FC<Props> = ({ height = 50, width = 50, ...rest }) => {
    const ref = useRef<HTMLCanvasElement | null>(null)
    const inner = 2

    useEffect(() => {
        if (ref.current && ref.current.getContext) {
            ref.current.width = width
            ref.current.height = height
            const ctx = ref.current.getContext('2d')

            if (ctx) {
                ctx.save()

                const midHeight = (Math.min(height - 2 * inner, width - 2 * inner) / 2) * Math.sqrt(3) // 上下高度
                const spacing = (height - midHeight) / 2 // 上下间距

                const dots = [
                    {
                        x: width / 2,
                        y: spacing
                    },
                    {
                        x: width - inner,
                        y: spacing + midHeight
                    },
                    {
                        x: inner,
                        y: spacing + midHeight
                    }
                ]

                ctxStyle(ctx)
                ctx.beginPath()
                lineDots(ctx, dots)
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
