// import TileImage from 'ol/source/TileImage';
// import TileGrid from 'ol/tilegrid/TileGrid';
import XYZ from 'ol/source/XYZ';
import { fromLonLat } from 'ol/proj';
import { useEffect } from 'react';
import { Tile } from 'ol/layer';
import View from 'ol/View';
import Map from 'ol/Map';
import 'ol/ol.css';

const App = () => {
    useEffect(() => {
        // 获取地图容器
        const mapDom = document.getElementById('map') as HTMLElement;

        // 初始化地图配置
        const mapObj = new Map({
            target: mapDom, // 地图容器
            view: new View({
                projection: 'EPSG:3857', // 坐标系
                center: fromLonLat([120.13809443, 30.17955119], 'EPSG:3857'), // 中心点
                zoom: 15, // 缩放
            }),
        });

        // const resolutions = [];
        // const maxZoom = 18;

        // // 计算百度使用的分辨率
        // for (let i = 0; i <= maxZoom; i++) {
        //     resolutions[i] = Math.pow(2, maxZoom - i);
        // }

        // // 设置分辨率
        // const tileGrid = new TileGrid({
        //     origin: [0, 0],
        //     resolutions: resolutions,
        // });

        // // 创建百度地图的数据源
        // const baiduSource = new TileImage({
        //     projection: 'EPSG:3857',
        //     tileGrid: tileGrid,
        //     tileUrlFunction: (tileCoord) => {
        //         const z = tileCoord[0];
        //         let x = tileCoord[1];
        //         let y = tileCoord[2];

        //         // 百度瓦片服务url将负数使用M前缀来标识
        //         if (x < 0) {
        //             x = -x;
        //         }
        //         if (y < 0) {
        //             y = -y - 1;
        //         }

        //         return `http://127.0.0.1:3001/api/${z}/${x}/${y}.png`;
        //     },
        // });

        const aSource = new XYZ({
            projection: 'EPSG:3857',
            url: `http://127.0.0.1:3001/api/{z}/{x}/{y}.png`,
        });

        const offlineMapLayer = new Tile({
            source: aSource,
        });

        // 将图层添加到地图
        mapObj.addLayer(offlineMapLayer);

        mapObj.on('click', (evt) => {
            console.log(evt);
            // 获取点击位置的数据
            const feature = mapObj.forEachFeatureAtPixel(evt.pixel, function (f) {
                return f;
            });

            console.log(feature);
        });

        return () => {
            mapObj.dispose();
        };
    }, []);

    return (
        <>
            <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
                <div style={{ width: '100vw', height: '100vh' }} id="map" />
            </div>
            <div style={{ width: '2px', height: '2px', top: '50%', left: '50%', backgroundColor: '#000', position: 'fixed' }} />
        </>
    );
};

export default App;
