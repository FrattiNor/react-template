import { colorMap } from './utils.js';
import puppeteer from 'puppeteer-core';

(async () => {
    try {
        //
        const browser = await puppeteer.launch({
            executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
            headless: false,
        });
        const page = await browser.newPage();
        await page.goto(
            'https://tieba.baidu.com/f?kw=%E9%80%B8%E5%89%91%E9%A3%8E%E4%BA%91%E5%86%B3&svcp_stk=1_fRkBTSvcDVDRsOEJxRfXjcz51rowHULmlo0Ke4_jzUhgXZgVBC3GpKa0QqyDELN-FJCid0JCH0yHOPfSqtaveSLXrRj-qPDxOyx_j4rwz6I5Giym8lNCbMn6lNLlZS_HU1pdnuQ7-DNzn_qCoNFcEEUGGthtVP8VwsE-04t-5iDMciBXwvJ8CN_Rw9kD7F8e',
        );
        await page.screenshot({ path: './dist/example.png' });

        await browser.close();
    } catch (e) {
        console.log(colorMap.red(String(e)));
    }
})();
