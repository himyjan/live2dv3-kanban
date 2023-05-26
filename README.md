# Live2Dv3 Kanban

# Pull Submodule
```
git submodule update --recursive --remote
```

支持Live2D Model3的網頁看板娘插件。效果可參考[道山神連的博客](https://michiyamakaren.github.io/)。

## 直接使用

若不需要自行構建，可以直接通過jsDelivr訪問打包的js腳本並在項目中引用。

### 引用依賴腳本

在頁面的header中引用所需的js腳本和CSS樣式文件
```html
<!-- Pollyfill script -->
<script src="https://unpkg.com/core-js-bundle@latest/minified.js"></script>
<!-- Live2DCubismCore script -->
<script src="https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js"></script>

<script src="https://unpkg.com//jquery@latest/dist/jquery.min.js"></script>
<script src="https://unpkg.com//jquery-ui@latest/dist/jquery-ui.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/font-awesome@latest/css/font-awesome.min.css">
<script src="https://cdn.jsdelivr.net/gh/MichiyamaKaren/live2dv3-kanban@latest/Demo/static/js/canvas2image.js"></script>

<script src="https://cdn.jsdelivr.net/gh/MichiyamaKaren/live2dv3-kanban@latest/dist/l2dkanban.min.js"></script>

<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/MichiyamaKaren/live2dv3-kanban@latest/Demo/static/css/live2d.css" />
```

### 設定模型路徑

`l2dkanban.min.js`文件為本項目打包生成的文件，引入後會在`window`下註冊字典變量`L2DSettings`用於設定模型和配置文件路徑等信息，以及加載模型的函數`setupKanban`。

在項目中新建目錄（假設目錄名為`models`），將Live2D模型文件添加到`models`下，每個模型的目錄名要和`*.model3.json`的前綴一致。例如，若有模型`karen`和`hikari`，則`models`下的目錄結構應如
```
├── path/to/models
│   ├── karen
│   │   ├── karen.model3.json
│   │   ├── other...
│   ├── hikari
│   │   ├── hikari.model3.json
│   │   ├── other...
```
此時應在header中添加如下js代碼進行設定
```html
<script type="text/javascript">
    L2Dsettings.configPath = '/path/to/config.json';  // 設定配置文件路徑
    L2Dsettings.resourcesPath = '/path/to/models/';  // 設定模型文件路徑
    L2Dsettings.backImageName = '';
    L2Dsettings.modelDirs = 'karen,hikari'.split(',');  // 設定使用的模型名
    L2Dsettings.canvasId = 'live2d';

    L2Dsettings.onModelLoaded = (model) => {  // 應用初始表情和動作，需在live2d模型的model3.json文件中定義onLoad表情和動作組
        model.setExpression("onLoad");
        model.startMotion("onLoad", 0, 2);
    };

    window.onload = setupKanban;  // 自動加載模型
</script>
```

### 插入頁面元素

在body中插入看板娘面板的HTML元素
```html
<div class="live2d-main">
    <div class="live2d-tips"></div>
    <canvas id="live2d" class="live2d"></canvas>
    <div class="live2d-tool"></div>
</div>
```
`canvas`對象的`id`屬性應與`L2Dsettings.canvasId`變量的值保持一致。

## 構建

- 下載項目代碼（由於項目中包含子模塊，需要使用`git clone --recursive`）
- 運行`npm install`下載需要的依賴庫，再運行`npm run build`編譯項目代碼，這會在`dist`生成`l2dkanban.js`文件。
  - 運行`npm run build:prod`則會生成壓縮的`l2dkanban.min.js`。
- 在`Demo/demo.js`中參考上一節的內容進行相關設置。
- 運行`npm run serve`啟動本地服務，訪問`http://localhost:5000/Demo/`即可查看看板娘效果。

## 配置

關於看板娘顯示和對話內容的配置信息都寫在`Demo/config.json`中，可以自行更改。可更改的內容為：
- `global`：Live2D模型顯示相關配置
  - `global.model`
    - `global.model.scale`：模型的縮放率
    - `global.model.scale`：模型在X、Y兩個方向的平移量。這裡X、Y的坐標範圍均為`[-1, 1]`。
  - `global.canvas`
    - `global.canvas.height`：canvas對象的高度，單位px。下面`global`中的長度值都是與這一高度的比值。
    - `global.canvas.ratio`：canvas的寬度
    - `global.canvas.bottom`,`global.canvas.left`：看板娘相對頁面底部和左側的距離
    - `global.canvas.marginLeft`：canvas的CSS `margin-left`屬性
  - `global.toolbar`：工具欄的CSS屬性
- `tool`：字典，描述工具按鍵的行為。 key為工具名稱，value中為相應配置

  通用配置：
  - `icon`：工具按鍵的圖標相應的`class`名，參考[Font Awesome](https://fontawesome.com.cn/v4/icons)
  - `hover`：鼠標懸停在按鍵上時顯示的對話信息

  各個工具按鍵的自用配置：
  - `randomMsg.message`：列表，每一項為一條對話內容。 `text`、`exp`、`mtn`分別對應對話文本、表情和動作。
  - `drag.dragging_icon`：鼠標拖動時改變的圖標樣式
  - `close.message`、`close.msgTime`、`close.closeTime`：點擊關閉後顯示對話信息`message`，持續時長`msgTime`，然後向下退出頁面，動畫時長`closeTime`。時間單位均為毫秒。
- `onCopy`：監聽複製頁面上的文字時的對話信息

## 引用的項目

`src/live2d`的代碼分別來自
- [Live2D/CubismWebFramework](https://github.com/Live2D/CubismWebFramework)  
- [Live2D/CubismWebSamples](https://github.com/Live2D/CubismWebSamples)

更改`src/live2d/lapp`的代碼參考了文章：[筆記：live2d4.0 sdk 博客園網頁動畫](https://blog.csdn.net/weixin_44128558/article/details/104792345)和[live2d web端加載moc3模型](https://www.cnblogs.com/wstong/p/12874732.html)。部分CSS樣式參考了項目[live2d-widget](https://github.com/stevenjoezhang/live2d-widget)。

`Demo/static/js/canvas2image.js`來自項目[canvas2image](https://github.com/hongru/canvas2image)。