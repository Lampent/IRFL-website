export abstract class Magnify {
    glass;
    img;
    w;
    h;
    bw;
    zoom;
    imageId;

    protected constructor(imageID: string = 'task-image', zoom: number = 3) {
        this.imageId =imageID;
        this.zoom = zoom;
    }

    magnify() {
        this.img = document.getElementById(this.imageId);
        /*create magnifier glass:*/
        this.glass = document.createElement('DIV');
        this.glass.setAttribute('class', 'img-magnifier-glass');
        /*insert magnifier glass:*/
        this.img.parentElement.insertBefore(this.glass, this.img);
        /*set background properties for the magnifier glass:*/
        this.glass.style.backgroundImage = 'url(\'' + this.img.src + '\')';
        this.glass.style.backgroundRepeat = 'no-repeat';
        this.glass.style.backgroundSize =
            this.img.width * this.zoom + 'px ' + this.img.height * this.zoom + 'px';
        this.bw = 3;
        this.w = this.glass.offsetWidth / 2;
        this.h = this.glass.offsetHeight / 2;
        /*execute a function when someone moves the magnifier glass over the image:*/
        this.glass.addEventListener('mousemove', this.moveMagnifier.bind(this));
        this.img.addEventListener('mousemove', this.moveMagnifier.bind(this));
        /*and also for touch screens:*/
        this.glass.addEventListener('touchmove', this.moveMagnifier.bind(this));
        this.img.addEventListener('touchmove', this.moveMagnifier.bind(this));
    }

    moveMagnifier(e) {
        let pos, x, y;
        /*prevent any other actions that may occur when moving over the image*/
        e.preventDefault();
        /*get the cursor's x and y positions:*/
        pos = this.getCursorPos(e);
        x = pos.x;
        y = pos.y;
        /*prevent the magnifier glass from being positioned outside the image:*/
        if (x > this.img.width - this.w / this.zoom) {
            x = this.img.width - this.w / this.zoom;
        }
        if (x < this.w / this.zoom) {
            x = this.w / this.zoom;
        }
        if (y > this.img.height - this.h / this.zoom) {
            y = this.img.height - this.h / this.zoom;
        }
        if (y < this.h / this.zoom) {
            y = this.h / this.zoom;
        }
        /*set the position of the magnifier glass:*/
        this.glass.style.left = x - this.w + 'px';
        this.glass.style.top = y - this.h + 'px';
        /*display what the magnifier glass "sees":*/
        this.glass.style.backgroundPosition =
            '-' + (x * this.zoom - this.w + this.bw) + 'px -' + (y * this.zoom - this.h + this.bw) + 'px';
    }

    getCursorPos(e) {
        let a, x = 0, y = 0;
        e = e || window.event;
        /*get the x and y positions of the image:*/
        a = this.img.getBoundingClientRect();
        /*calculate the cursor's x and y coordinates, relative to the image:*/
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        /*consider any page scrolling:*/
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return { x, y };
    }
}