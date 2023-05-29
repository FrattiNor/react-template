window.addEventListener('orientationchange', () => {
    if (window.orientation == 180 || window.orientation == 0) {
        console.log('竖屏状态');
    }
    if (window.orientation == 90 || window.orientation == -90) {
        console.log('横屏状态');
    }
});
