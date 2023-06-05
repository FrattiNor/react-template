const copyText = (text: string) => {
    // 数字没有 .length 不能执行selectText 需要转化成字符串
    const textString = text.toString();
    let input = document.querySelector('#copy-input') as HTMLInputElement;

    if (!input) {
        input = document.createElement('input');
        input.id = 'copy-input';
        input.readOnly = true; // 防止ios聚焦触发键盘事件
        input.style.position = 'absolute';
        input.style.left = '-1000px';
        input.style.zIndex = '-1000';
        document.body.appendChild(input);
    }

    input.value = textString;
    // ios必须先选中文字且不支持 input.select();
    selectText(input, 0, textString.length);
    if (document.execCommand('copy')) {
        document.execCommand('copy');
    } else {
        console.log('不兼容');
    }
    input.blur();

    function selectText(textbox: any, startIndex: any, stopIndex: any) {
        if (textbox.createTextRange) {
            //ie
            const range = textbox.createTextRange();
            range.collapse(true);
            range.moveStart('character', startIndex); //起始光标
            range.moveEnd('character', stopIndex - startIndex); //结束光标
            range.select(); //不兼容苹果
        } else {
            //firefox/chrome
            textbox.setSelectionRange(startIndex, stopIndex);
            textbox.focus();
        }
    }
};

export default copyText;
