class DudoPreview {
    constructor(params = {}) {
        let defaults = {
            imgs: [],
            direct: 'x', // x: 水平预览；y: 垂直预览

        };
        this.def = this.extend(defaults, params);
        this.init();
    }

    extend(obj, params) {
        for(var key in params) {
            obj[key] = params[key];
        }
        return obj;
    }

    init() {
        let _this = this;
        let container = document.createElement('div');
        container.id = 'DudoPreview';
        container.style['top'] = '0';
        container.style['left'] = '0';
        container.style['width'] = '100%';
        container.style['height'] = '100%';
        container.style['position'] = 'fixed';
        container.style['background-color'] = 'rgba(0, 0, 0, 0.5)';
        container.style['padding-top'] = '60%';
        container.addEventListener('click', (e) => {
            var evnt = e || event;
            if(evnt.target.id == 'DudoPreview') {
                document.body.removeChild(container);
            }
        });

        let viewContainer = document.createElement('div');
        viewContainer.style['width'] = '100%';
        viewContainer.style['height'] = '';
        viewContainer.style['background-color'] = 'white';
        viewContainer.style['overflow'] = 'scroll';

        this.def.imgs.forEach(img => {
            var imgObj = document.createElement('img');
            imgObj.src = img;
            imgObj.style['width'] = '100%';
            imgObj.addEventListener('touchstart', (e) => {
                if(e.touches.length >= 2) {

                } else {
                    this.startPosition = [e.touches[0].pageX, e.touches[0].pageY];
                }
            });
            imgObj.addEventListener('touchmove', (e) => {
                if(e.touches.length >= 2) {

                } else {
                    this.endPosition = [e.touches[0].pageX, e.touches[0].pageY];
                }
            });
            imgObj.addEventListener('touchend', (e) => {
                if(e.touches.length >= 2) {

                } else {
                    console.log(this.startPosition, this.endPosition);
                }
            });
            viewContainer.appendChild(imgObj);
        });

        container.appendChild(viewContainer);
        document.body.appendChild(container);
    }

    start(index = 0) {

    }
}