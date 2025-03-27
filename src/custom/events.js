import { showMessage } from "./message.js";

export { windowEvents, autoEvents };

// 監聽窗口事件
let windowEvents = {
    copy: function (config, event) {
        event.stopPropagation();
        showMessage(config.onCopy);
    }
}

// 自動觸發
let autoEvents = [];