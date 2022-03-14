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

            const minWidth = Math.min(width - 2 * inner, height - 2 * inner)
            const lineWidth = minWidth / (2 * Math.cos((45 * Math.PI) / 180) + 1)
            const smallOrMiddle = lineWidth * Math.sin((45 * Math.PI) / 180)
            const theHeight = smallOrMiddle * 2 + lineWidth
            const spacing = (height - 2 * inner - theHeight) / 2

            if (ctx) {
                ctx.save()

                const dots = [
                    {
                        x: inner + spacing + smallOrMiddle,
                        y: inner + spacing
                    },
                    {
                        x: inner + spacing + smallOrMiddle + lineWidth,
                        y: inner + spacing
                    },
                    {
                        x: inner + spacing + smallOrMiddle + lineWidth + smallOrMiddle,
                        y: inner + spacing + smallOrMiddle
                    },
                    {
                        x: inner + spacing + smallOrMiddle + lineWidth + smallOrMiddle,
                        y: inner + spacing + smallOrMiddle + lineWidth
                    },
                    {
                        x: inner + spacing + smallOrMiddle + lineWidth,
                        y: inner + spacing + smallOrMiddle + lineWidth + smallOrMiddle
                    },
                    {
                        x: inner + spacing + smallOrMiddle,
                        y: inner + spacing + smallOrMiddle + lineWidth + smallOrMiddle
                    },
                    {
                        x: inner + spacing,
                        y: inner + spacing + smallOrMiddle + lineWidth
                    },
                    {
                        x: inner + spacing,
                        y: inner + spacing + smallOrMiddle
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
