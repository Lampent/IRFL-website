import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ImageClassificationTask} from '../types/image-classification-task';
import {ImageCategoriesEnum, SimilesConceptsCategoriesEnum, SimilesImagesCategoriesEnum} from '../types/image-categories-enum';
import {Magnify} from '../types/magnify';

@Component({
  selector: 'app-image-classification-board',
  templateUrl: './image-classification-board.component.html',
  styleUrls: ['./image-classification-board.component.scss']
})
export class ImageClassificationBoardComponent extends Magnify implements OnInit, AfterViewInit {
  secondaryCategories = Object.values(SimilesConceptsCategoriesEnum)
  categories = Object.values(ImageCategoriesEnum);
  _imageClassificationTask: ImageClassificationTask = null;
  isSimile = false;
  noSelection = true;
  showInfo = false;
  showTree = false;
  annotations = null;
  annotationsAgreement = null;
  workerStar = null;
  imageLoaded = false;
  @Input() _submit = false;
  @Input() title = '';
  @Input() showHint = false;
  @Input() showCorrectAnswer = false;
  @Input() isFirst = false;
  @Input() reviewMode = false;
  @Output() selected$: EventEmitter<ImageClassificationTask> = new EventEmitter<ImageClassificationTask>();
  phraseFormControl = new FormControl('');

  constructor(private changeDetectionRef: ChangeDetectorRef) {
    super(String(Math.floor(Math.random() * 10000000000)));
    this.secondaryCategories.pop();

  }

  ngOnInit(): void {
    this.onImageLoad();
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
    this.isSimile = this._imageClassificationTask.type === 'simile';
    this.categories = this.isSimile ? Object.values(SimilesImagesCategoriesEnum) as any : Object.values(ImageCategoriesEnum) as any
    this.categories.pop();
    const annotationsData = this._imageClassificationTask?.serverData['annotations']
    this.annotations = annotationsData ?
        JSON.stringify(annotationsData.map(annotation => {return{worker: annotation['worker_id'], category: annotation['category']}})) :
        null;
    if (this.annotations != null) {
      const annotationDetails = this.getAgreementDetails(this.annotations);
      this.annotationsAgreement = annotationDetails.agreement;
      this.workerStar = annotationDetails.star;
    }
    this.init();
  }

  @Input()
  set submit(status: boolean) {
    this._submit = status;
  }

  selectCategory(category: ImageCategoriesEnum, secondCategory: SimilesConceptsCategoriesEnum=null): void {
    if (!this._submit && this.imageLoaded) {
      this._imageClassificationTask.category = !!category ? category : this._imageClassificationTask.category;
      this._imageClassificationTask.secondaryCategory = !!secondCategory ? secondCategory : this._imageClassificationTask.secondaryCategory;
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

  toggleTree(): void {
    this.showTree = !this.showTree;
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

  onImageLoad() {
    const logo = document.getElementById(this.imageId);

    logo.onload = () => {
      this.imageLoaded = true;
      this.img.style.backgroundImage = 'none';
    };
  }

  getAgreementDetails(annotations) {
    const parsedAnnotations = JSON.parse(annotations);
    const annotatedCategories = parsedAnnotations.map(annotation => annotation['category'])
    const mostCommon = this.getMostCommonElement(annotatedCategories)
    const agreement = annotatedCategories.filter(x => x === mostCommon).length / annotatedCategories.length
    if (agreement < 0.5) {
      const leastCommon = this.getMostCommonElement(annotatedCategories, true)
      return {agreement, star: parsedAnnotations.find(anot => anot['category'] === leastCommon)['worker']}
    }
    return {agreement, star: null}
  }


  getMostCommonElement(arr, revert = false) {
      const store = {}
      arr.forEach((num) => store[num] ? store[num] += 1 : store[num] = 1)
      const arrSorted = Object.keys(store).sort((a, b) => store[b] - store[a])
      return revert ? arrSorted.reverse()[0] : arrSorted[0]
  }

}
