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
                const lineWidth = minWidth / (2 * Math.sin((30 * Math.PI) / 180) + 1)
                const small = lineWidth * Math.sin((30 * Math.PI) / 180)
                const middle = lineWidth * Math.cos((30 * Math.PI) / 180)

                const theHeight = small * 2 + lineWidth
                const spacing = (height - 2 * inner - theHeight) / 2

                const dots = [
                    {
                        x: width / 2,
                        y: inner + spacing
                    },
                    {
                        x: width / 2 + middle,
                        y: small + inner + spacing
                    },
                    {
                        x: width / 2 + middle,
                        y: small + inner + spacing + lineWidth
                    },
                    {
                        x: width / 2,
                        y: height - inner - spacing
                    },
                    {
                        x: width / 2 - middle,
                        y: small + inner + spacing + lineWidth
                    },
                    {
                        x: width / 2 - middle,
                        y: small + inner + spacing
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
