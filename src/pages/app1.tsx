import { useEffect } from 'react';
import flvjs from 'flv.js';

const App = () => {
    useEffect(() => {
        // const body = new FormData();
        // body.append('path', 'rtsp://admin:supcon1304@192.168.196.115:554/Streaming/Channels/102?transportmode=mcast&profile=Profile_2');

        // fetch('http://192.168.186.81:8080/putVideo', {
        //     method: 'POST',
        //     body,
        // }).then((d) => {
        //     d.json().then((data) => {
        //         console.log(data);
        //         if (data.code === 0) {
        //             if (flvjs.isSupported()) {
        //                 const videoElement = document.getElementById('videoElement') as HTMLMediaElement;
        //                 const flvPlayer = flvjs.createPlayer({
        //                     type: 'flv',
        //                     isLive: true,
        //                     hasAudio: false,
        //                     hasVideo: true,
        //                     url: 'http://192.168.186.81:8080/getVideo?id=' + data.data,
        //                 });
        //                 flvPlayer.attachMediaElement(videoElement);
        //                 flvPlayer.load();
        //                 flvPlayer.play();
        //                 videoElement.play();
        //             }
        //         }
        //     });
        // });

        const videoElement = document.getElementById('videoElement') as HTMLMediaElement;
        const flvPlayer = flvjs.createPlayer(
            // type: 'flv',
            // isLive: true,
            // hasAudio: false,
            // hasVideo: true,
            // url: 'http://192.168.184.70:8081/live.flv',
            { type: 'flv', url: 'http://192.168.184.70:8081/live.flv', hasAudio: false, hasVideo: true, isLive: true },
            // { isLive: true, enableStashBuffer: false, enableWorker: true, stashInitialSize: 128 },
        );
        flvPlayer.attachMediaElement(videoElement);
        flvPlayer.load();
        flvPlayer.play();
        videoElement.play();
    }, []);

    return (
        <div>
            <video id="videoElement" controls autoPlay width="1024" height="576" />
        </div>
    );
};

export default App;
