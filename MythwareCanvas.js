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
        document.getElementById(this.target).innerHTML = '<canvas id="canvas"></canvas>';
        this.canvas = document.getElementById('canvas');
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;
        this.canvas.style = this.style;
        var cw = this.canvas.width;
        var ch = this.canvas.height;
        var scalew = cw / this.dw;
        var scaleh = ch / this.dh;
        var rect = this.canvas.getBoundingClientRect();
        this.x = rect.left;
        this.y = rect.top;
        this.context = this.canvas.getContext('2d');
        this.context.transform(scalew, 0, 0, scaleh, this.x, this.y);
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
    setBaseImg(imgsrc, resetCanvas = true) {
        var _w = this.dw;
        var _h = this.dh;
        var _x = this.x;
        var _y = this.y;
        var _canvas = this.canvas;
        var _context = this.context;
        var img = new Image();
        img.src = imgsrc;
        // img.setAttribute("crossOrigin",'Anonymous')
        img.onload = function() {
            if(resetCanvas) {
                // 依据背景图比例调整画布规格
                _canvas.height = this.height / this.width * _canvas.width;
            }
            var nw = _canvas.width;
            var nh = _canvas.height;
            _context.drawImage(this, 0, 0, nw, nh);
            _context.transform(nw / _w, 0, 0, nh / _h, _x, _y);
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