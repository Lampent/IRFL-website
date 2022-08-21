import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ImageClassificationTask} from '../types/image-classification-task';
import {ImageCategoriesEnum} from '../types/image-categories-enum';

@Component({
  selector: 'app-image-classification-board',
  templateUrl: './image-classification-board.component.html',
  styleUrls: ['./image-classification-board.component.scss']
})
export class ImageClassificationBoardComponent implements OnInit, AfterViewInit {
  categories = Object.values(ImageCategoriesEnum)
  _imageClassificationTask: ImageClassificationTask = null;
  noSelection = true;
  showInfo = false;
  glass;
  img;
  w;
  h;
  bw;
  zoom = 3;
  imageId = 'task-image'
  @Input() _submit = false;
  @Input() title = '';
  @Input() info: string = '';
  @Output() selected$: EventEmitter<ImageClassificationTask> = new EventEmitter<ImageClassificationTask>();
  phraseFormControl = new FormControl('');

  constructor(private changeDetectionRef: ChangeDetectorRef) {
    this.categories.pop();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.magnify();
    this.hideZoom();
  }

  init() {
    this.phraseFormControl.setValue(this._imageClassificationTask.phrase)
    this.detectChanges();
  }

  @Input()
  set imageClassificationTask(task: ImageClassificationTask) {
    this._imageClassificationTask = task;
    this.init();
  }

  @Input()
  set submit(status: boolean) {
    this._submit = status;
  }

  selectCategory(category: ImageCategoriesEnum): void {
    if (!this._submit) {
      this._imageClassificationTask.category = category;
      if (this._imageClassificationTask.isClassified()) {
        this.selected$.emit(this._imageClassificationTask);
      }
      this.detectChanges();
    }
  }

  toggleInfo(): void {
    this.showInfo = !this.showInfo;
    this.detectChanges();
  }

  detectChanges(): void {
    this.changeDetectionRef.markForCheck();
    this.changeDetectionRef.detectChanges();
  }

  showZoom() {
    this.glass.style.display = 'block';
  }

  hideZoom() {
    this.glass.style.display = 'none';
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
