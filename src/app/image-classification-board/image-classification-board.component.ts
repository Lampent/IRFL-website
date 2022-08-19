import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ImageClassificationTask} from '../types/image-classification-task';
import {ImageCategoriesEnum} from '../types/image-categories-enum';

@Component({
  selector: 'app-image-classification-board',
  templateUrl: './image-classification-board.component.html',
  styleUrls: ['./image-classification-board.component.scss']
})
export class ImageClassificationBoardComponent implements OnInit {
  categories = Object.values(ImageCategoriesEnum)
  _imageClassificationTask: ImageClassificationTask = null;
  noSelection = true;
  showInfo = false;
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
}
