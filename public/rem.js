/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prettier/prettier */
((doc, win) => {
    const docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = () => {
            const clientWidth = docEl.clientWidth
            docEl.style.fontSize = 100 * (clientWidth / 1920) + 'px'
        }
    if (!doc.addEventListener) {
        return
    }
    win.addEventListener(resizeEvt, recalc, false)
    doc.addEventListener('DOMContentLoaded', recalc, false)
    recalc()
})(document, window)
