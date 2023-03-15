// @ts-ignore
import jsmpegStr from 'raw-loader!./jsmpeg.min.txt';
import { useLayoutEffect, useEffect } from 'react';

const App = () => {
    useLayoutEffect(() => {
        const element = document.createElement('script');
        element.setAttribute('type', 'text/javascript');
        element.innerText = jsmpegStr;
        document.head.append(element);
    }, []);

    useEffect(() => {
        const JSMpeg = (window as any).JSMpeg;
        const video = document.getElementById('video');
        // const url = 'ws://' + document.location.hostname + ':9998/';
        const url = 'ws://192.168.186.81:8080/video';
        const player = new JSMpeg.Player(url, { canvas: video, loop: true, autoplay: true });
        player.play();
    }, []);

    return <canvas id="video" width="900" height="500" />;
};

export default App;
