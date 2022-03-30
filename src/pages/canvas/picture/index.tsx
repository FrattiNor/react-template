import React, { useEffect, useRef } from 'react'

const Picture = () => {
    const ref = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const img = document.createElement('img')
        img.src = 'https://mdn.mozillademos.org/files/4553/Capitan_Meadows,_Yosemite_National_Park.jpg'

        if (ref.current !== null) {
            const ctx = ref.current.getContext('2d')
            if (ctx !== null) {
                ctx.drawImage(img, 0, 0)
            }
        }
    }, [])

    return <canvas ref={ref} width={500} height={200} />
}

export default Picture
