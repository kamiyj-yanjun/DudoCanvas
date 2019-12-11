class MythwareCanvas {

    constructor(paramsObj) {
        var props = {
            target: '',
            dotarr: [],
            style: {
                width: '500px',
                height: '500px'
            },
            canvasWidth: 500,
            canvasHeight: 500
        };
        this.prop = this.extend(props, paramsObj, true);

        this.canvas = null;
        this.context = null;
        this.todot = null;
        // 窗口
        this.dw = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        this.dh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        // canvas相对窗口坐标
        this.x = 0;
        this.y = 0;

        this.init(this.prop);
    }

    init(prop) {
        document.getElementById(prop.target).innerHTML = '<canvas id="canvas" style="width: 500px; height: 500px;"></canvas>';
        this.canvas = document.getElementById('canvas');
        this.canvas.width = prop.canvasWidth;
        this.canvas.height = prop.canvasHeight;
        this.css(this.canvas, prop.style);
        // this.canvas.style = this.style;
        this.context = this.canvas.getContext('2d');
        this.context.beginPath();
        this.run(prop);
    }

    run(prop) {
        if(prop.dotarr.length != 0) {
            //运行
            this.todot = prop.dotarr.shift();
            this.context.lineTo(this.todot.x, this.todot.y);
            this.context.stroke();
            this.run(prop);
        } else {
            return;
        }
    }

    add(newdot) {
        if(newdot instanceof Array) {
            this.prop.dotarr = this.prop.dotarr.concat(newdot);
        } else {
            this.prop.dotarr.push(newdot);
        }
        this.run(this.prop);
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

    // 样式绑定
    css(obj, styleObj){
        for(var key in styleObj) {
            obj.style[key] = styleObj[key];
        }
    }

    // 属性绑定
    extend(o, n, override) {
        for(var key in n) {
            if(n.hasOwnProperty(key) && (!o.hasOwnProperty(key) || override)) {
                o[key] = n[key];
            }
        }
        return o;
    }
}