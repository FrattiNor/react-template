/* eslint-disable no-self-assign */
import React, { FC, useRef, useEffect, useState } from 'react'
import { Button } from 'antd'
import JSAnimate, { easeIn, easeInOut, easeOut, useAnimate } from './util2'
import styles from './index.less'

const App: FC = () => {
    const ref = useRef<any>()
    const [w1, setW1] = useState(0)
    const [w2, setW2] = useState(0)
    const [w3, setW3] = useState(0)

    const draw = (p: number) => {
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
            ctx.translate(250, 250)
            ctx.rotate(getAngle(p * 360))
            ctx.translate(-250, -250)

            const angle = 360 / 5
            getFlowerOne(angle * 0)
            getFlowerOne(angle * 1)
            getFlowerOne(angle * 2)
            getFlowerOne(angle * 3)
            getFlowerOne(angle * 4)
        }
    }

    const [animate] = useAnimate(draw, 10000, {
        count: 1,
        timing: easeIn
    })

    const onClick = () => {
        if (animate !== null) {
            if (animate.state === 'playing') {
                animate.pause()
            }
            if (animate.state === 'paused') {
                animate.play()
            }
        }
    }

    useEffect(() => {
        JSAnimate(
            (p: number) => {
                setW1(p * 100)
            },
            10000,
            { timing: easeIn }
        )
        // JSAnimate(
        //     (p: number) => {
        //         setW2(p * 100)
        //     },
        //     10000,
        //     { timing: easeOut }
        // )
        // JSAnimate(
        //     (p: number) => {
        //         setW3(p * 100)
        //     },
        //     10000,
        //     { timing: easeInOut }
        // )
    }, [])

    return (
        <div style={{ height: '200vh' }}>
            <canvas ref={ref} width={500} height={500} style={{ border: '1px solid #000' }} />
            <div className={styles['a']} style={{ width: w1 }} />
            <div className={styles['a']} style={{ width: w2 }} />
            <div className={styles['a']} style={{ width: w3 }} />
            <div>
                <Button onClick={onClick}>取消</Button>
            </div>
        </div>
    )
}

export default App
