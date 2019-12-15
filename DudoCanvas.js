class DudoCanvas {

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
        this.dotarrStorage = [];

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
            this.dotarrStorage.push(this.todot);
            this.context.lineTo(this.todot.x, this.todot.y);
            this.context.stroke();
            this.run(prop);
        } else {
            return;
        }
    }

    runstorage() {
        if(this.dotarrStorage.length != 0) {
            var start = this.dotarrStorage[0];
            this.context.moveTo(start.x, start.y);
            this.dotarrStorage.forEach(data => {
                this.context.lineTo(data.x, data.y);
                this.context.stroke();
            });
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
            this.setAttribute('crossOrigin', 'anonymous');
            if(resetCanvas) {
                // 依据背景图比例调整画布规格
                _this.canvas.style.height = this.height / this.width * parseInt(_this.canvas.style.width) + 'px';
            }
            _this.context.drawImage(this, 0, 0, _this.canvas.width, _this.canvas.height);
            _this.runstorage();
            // _this.getPx(this);
        }
    }

    getPx(img) {
        var imgW = img.width || img.naturalWidth;
        var imgH = img.height || img.naturalHeight;
        var imgdata = this.context.getImageData(0, 0, imgW, imgH);
        var count = 0;
        for(let px of imgdata.data) {
            console.log(px);
            count ++;
            if(count > 100) {
                break;
            }
        }
    }

    // 画布输出为图片并保存
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
    css(obj, styleObj) {
        for(var key in styleObj) {
            obj.style[key] = styleObj[key];
        }
    }

    // 属性绑定
    extend(obj, params, override) {
        for(var key in params) {
            if(params.hasOwnProperty(key) && (!obj.hasOwnProperty(key) || override)) {
                obj[key] = params[key];
            }
        }
        return obj;
    }
}