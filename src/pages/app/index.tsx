/* eslint-disable no-self-assign */
import React, { FC, useRef, useEffect, MouseEventHandler } from 'react'

const App: FC = () => {
    const ref = useRef<any>()

    useEffect(() => {
        if (ref.current && ref.current.getContext) {
            const canvas = ref.current

            const white = '#fff'
            const pink = '#f1d7d4'
            canvas.height = 500 // 清除画布
            canvas.width = 500
            const ctx = canvas.getContext('2d')

            // 获取旋转弧度 2PI * r = 周长（弧度不是角度）
            const getAngle = (n: number) => (n * Math.PI) / 180

            // 花瓣
            const getFlowerOne = (angle: number) => {
                // 花蕊直线 + 点
                const flowerLine = (ox: number, oy: number, x: number, y: number, angle: number) => {
                    ctx.save()
                    ctx.translate(ox, oy)
                    ctx.rotate(getAngle(angle))
                    ctx.translate(-ox, -oy)
                    ctx.beginPath()
                    ctx.strokeStyle = white
                    ctx.moveTo(ox, oy)
                    ctx.lineTo(x, y)
                    ctx.stroke()
                    ctx.beginPath()
                    ctx.fillStyle = white
                    ctx.arc(x, y, 2, 0, 360)
                    ctx.fill()
                    ctx.restore()
                }

                // 花瓣圆弧
                const flowerArc = () => {
                    ctx.save()
                    ctx.beginPath()
                    ctx.moveTo(250, 250)
                    ctx.quadraticCurveTo(150, 100, 225, 25)
                    ctx.lineTo(250, 50)
                    ctx.lineTo(275, 25)
                    ctx.quadraticCurveTo(350, 100, 250, 250)
                    ctx.fillStyle = pink
                    ctx.strokeStyle = white
                    ctx.fill()
                    ctx.stroke()
                    ctx.restore()
                }

                // 旋转
                ctx.save()
                ctx.translate(250, 250)
                ctx.rotate(getAngle(angle))
                ctx.translate(-250, -250)

                // 花瓣
                flowerArc()

                // 花蕊
                flowerLine(250, 250, 250, 150, 0)
                flowerLine(250, 250, 250, 180, 15)
                flowerLine(250, 250, 250, 180, -15)

                // 取消旋转
                ctx.restore()
            }

            // 绘图
            const angle = 360 / 5
            getFlowerOne(angle * 0)
            getFlowerOne(angle * 1)
            getFlowerOne(angle * 2)
            getFlowerOne(angle * 3)
            getFlowerOne(angle * 4)
        }
    }, [])

    const canvasClick: MouseEventHandler = (e) => {
        if (ref.current && ref.current.getContext) {
            const ctx = ref.current.getContext('2d')
            const { x, y } = (e.target as any).getBoundingClientRect()
            const ctxX = e.clientX - x
            const ctxY = e.clientY - y
            ctx.save()
            ctx.beginPath()
            ctx.moveTo(250, 250)
            ctx.lineTo(250, 0)
            ctx.lineTo(500, 0)
            ctx.fill()
            ctx.restore()
            console.log(ctxX, ctxY, ctx.isPointInPath(255, 5))
        }
    }

    return (
        <div style={{ height: '200vh' }}>
            <canvas onClick={canvasClick} ref={ref} width={500} height={500} style={{ border: '1px solid #000' }} />
        </div>
    )
}

export default App
