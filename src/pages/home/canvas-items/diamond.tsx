import React, { FC, useEffect, useRef } from 'react'
import { lineDots, canvasProp, ctxStyle, Props } from './util'

const Rect: FC<Props> = ({ height = 50, width = 50, ...rest }) => {
    const ref = useRef<HTMLCanvasElement | null>(null)
    const inner = 2 // 距离边的距离
    const heightInner = 6 // 上下高度缩进距离

    useEffect(() => {
        if (ref.current && ref.current.getContext) {
            ref.current.width = width
            ref.current.height = height
            const ctx = ref.current.getContext('2d')

            if (ctx) {
                ctx.save()
                ctx.strokeStyle = '#000'
                ctx.lineWidth = 2
                ctx.lineJoin = 'round'

                const dots = [
                    {
                        x: inner,
                        y: height / 2
                    },
                    {
                        x: width / 2,
                        y: height - inner - heightInner
                    },
                    {
                        x: width - inner,
                        y: height / 2
                    },
                    {
                        x: width / 2,
                        y: inner + heightInner
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
