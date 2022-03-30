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

                const minWidth = Math.min(width - 2 * inner, height - 2 * inner)
                const lineWidth = minWidth / (2 * Math.cos((36 * Math.PI) / 180))

                const small36 = lineWidth * Math.sin((36 * Math.PI) / 180)
                const small18 = lineWidth * Math.sin((18 * Math.PI) / 180)
                const middle18 = lineWidth * Math.cos((18 * Math.PI) / 180)

                const theHeight = small36 + middle18
                const spacing = (height - 2 * inner - theHeight) / 2

                const dots = [
                    {
                        x: width / 2,
                        y: inner + spacing
                    },
                    {
                        x: width - inner,
                        y: small36 + inner + spacing
                    },
                    {
                        x: width - inner - small18,
                        y: small36 + middle18 + inner + spacing
                    },
                    {
                        x: inner + small18,
                        y: small36 + middle18 + inner + spacing
                    },
                    {
                        x: inner,
                        y: small36 + inner + spacing
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
