import React, { FC, useState, MouseEvent, useEffect, useRef, DragEventHandler, Fragment } from 'react'
import element from './canvas-items'
import DropItem from './drop-item'
import styles from './index.less'

const headHeight = 100
const tooltipHeight = 150

const Home: FC = () => {
    const rightRef = useRef<HTMLDivElement | null>(null)
    const containerRef = useRef<HTMLDivElement | null>(null)
    const imgRef = useRef<HTMLImageElement | null>(null)
    const [visible, setVisible] = useState(false)
    const [top, setTop] = useState(16)
    const [tooltipName, setTooltipName] = useState<string>('')
    const [putList, setPutList] = useState<Record<string, Record<string, any>>>({})
    const [imgSrc, setImgSrc] = useState<string>('')

    const TooltipComponent = element.find((item) => item.name === tooltipName)?.Component

    const onMouseEnter = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, name: string) => {
        const canSee = document.body.offsetHeight - headHeight - tooltipHeight
        const newTop = e.clientY - headHeight - tooltipHeight / 2
        setTop(newTop >= 16 && newTop <= canSee - 16 ? newTop : newTop < 16 ? 16 : newTop > canSee - 16 ? canSee - 16 : newTop)
        setTooltipName(name)
        setVisible(true)
    }

    const onMouseLeave = () => {
        setVisible(false)
    }

    const onMouseDown = (e: MouseEvent) => {
        const canvas = e.target as HTMLCanvasElement
        setImgSrc(canvas.toDataURL())
    }

    const onDragStart: DragEventHandler<HTMLCanvasElement> = (e) => {
        setVisible(false)
        if (e.target) {
            if (imgRef.current) e.dataTransfer.setDragImage(imgRef.current, 50, 50)
            e.dataTransfer.setData('key', String(new Date().getTime()))
            e.dataTransfer.setData('current', tooltipName)
        }
    }

    const onDragOver: DragEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault()
    }

    const onDrop: DragEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault()
        if (containerRef.current) {
            const { x, y } = containerRef.current.getBoundingClientRect()

            setPutList({
                ...putList,
                [e.dataTransfer.getData('key')]: {
                    name: e.dataTransfer.getData('current'),
                    x: e.clientX - x - 25,
                    y: e.clientY - y - 25
                }
            })
        }
    }

    useEffect(() => {
        if (rightRef.current) {
            rightRef.current.scrollLeft = 1000 - 24
            rightRef.current.scrollTop = 1000 - 24
        }
    }, [])

    return (
        <Fragment>
            <div className={styles['container']}>
                <div className={styles['head']}></div>
                <div className={styles['content']}>
                    <div className={styles['left']}>
                        {element.map(({ name, Component }) => (
                            <div className={styles['item']} key={name} onMouseEnter={(e) => onMouseEnter(e, name)} onMouseLeave={onMouseLeave}>
                                <Component onDragStart={onDragStart} onMouseDown={onMouseDown} draggable />
                            </div>
                        ))}
                    </div>
                    <div className={styles['tooltip']} style={{ display: visible ? 'flex' : 'none', top }}>
                        {TooltipComponent && <TooltipComponent height={100} width={100} />}
                        <div>{tooltipName}</div>
                    </div>
                    <div className={styles['right']} ref={rightRef}>
                        <div className={styles['layout']}>
                            <div className={styles['canvas-container']} ref={containerRef} onDrop={onDrop} onDragOver={onDragOver}>
                                <canvas className={styles['canvas']} />
                                {Object.entries(putList).map(([key, value]) => (
                                    <DropItem key={key} name={value.name} x={value.x} y={value.y} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <img className={styles['dragImage']} ref={imgRef} src={imgSrc} style={{ height: 100, width: 100 }} />
        </Fragment>
    )
}

export default Home
