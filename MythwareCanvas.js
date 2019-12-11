class MythwareCanvas {
    constructor(target = '', dotarr = [], canvasWidth = 500, canvasHeight = 500) {
        this.target = target;
        this.dotarr = dotarr;
        this.canvas = null;
        this.context = null;
        this.todot = null;
        this.style = '';
        this.dw = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        this.dh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.x = 0;
        this.y = 0;
        this.init();
    }

    init() {
        document.getElementById(this.target).innerHTML = '<canvas id="canvas" style="width:1000px; height: 1000px;"></canvas>';
        this.canvas = document.getElementById('canvas');
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;
        // this.canvas.style = this.style;
        this.context = this.canvas.getContext('2d');
        this.context.beginPath();
        this.run();
    }

    run() {
        if(this.dotarr.length != 0) {
            //运行
            this.todot = this.dotarr.shift();
            this.context.lineTo(this.todot.x, this.todot.y);
            this.context.stroke();
            this.run();
        } else {
            return;
        }
    }

    add(newdot) {
        if(newdot instanceof Array) {
            this.dotarr = this.dotarr.concat(newdot);
        } else {
            this.dotarr.push(newdot);
        }
        this.run();
    }

    // 设置背景
    setBaseImg(imgsrc, resetCanvas = false) {
        var _this = this;
        var img = new Image();
        img.src = imgsrc;
        img.onload = function() {
            if(resetCanvas) {
                // 依据背景图比例调整画布规格
                _this.canvas.style.height = this.height / this.width * parseInt(_this.canvas.style.width) + 'px';
            }
            _this.context.drawImage(this, 0, 0, _this.canvas.width, _this.canvas.height);
        }
    }

    save(rex, savename) {
        // image/png image/jpeg image/bmp
        var url = this.canvas.toDataURL(rex);
        var aTmp = document.createElement("a");
        aTmp.download = savename;
        aTmp.href = url;
        document.body.appendChild(aTmp);
        aTmp.click();
        aTmp.remove();
    }
}