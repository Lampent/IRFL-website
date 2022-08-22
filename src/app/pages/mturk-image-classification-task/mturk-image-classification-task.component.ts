import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Candidate} from '../../types/candidate';
import {Subscription, timer} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {ServerRequestService} from '../../services/server-request.service';
import {MturkTask} from '../../types/mturk-task';
import {ImageClassificationTask} from '../../types/image-classification-task';
import {imageClassificationExampleTask} from '../../types/task-dictionary';

@Component({
  selector: 'app-mturk-image-classification-task',
  templateUrl: './mturk-image-classification-task.component.html',
  styleUrls: ['./mturk-image-classification-task.component.scss']
})
export class MturkImageClassificationTaskComponent extends MturkTask implements OnInit, OnDestroy {

  hint = ''
  date = new Date();
  pagination = 3;
  pagination1 = 1;
  answers: Map<number, Candidate> = new Map<number, Candidate>();
  practiceMode = false;
  _submit = false;
  // goodJobHint = 'Good Job!';
  turkSubmitTo = '';
  assignmentId = '';
  solveCreate = false;
  timerSubscription = new Subscription()
  example = imageClassificationExampleTask;
  imageClassificationTasks: ImageClassificationTask[] = null

  constructor(private router: Router,
              private activeRouter: ActivatedRoute,
              private changeDetectorRef: ChangeDetectorRef,
              private serverRequestService: ServerRequestService
  ) {
    super();
    window.name = 'IRFL'
    this.id = this.activeRouter.snapshot.params.id
    if (this.id && typeof this.id === 'string') {
      this.serverRequestService.getIRFLImageClassificationTasks(this.id).subscribe((tasks: ImageClassificationTask[]) => {
        this.turkSubmitTo = this.activeRouter.snapshot.queryParams.turkSubmitTo
        this.assignmentId = this.activeRouter.snapshot.queryParams.assignmentId
        console.log(this.turkSubmitTo)
        console.log(this.assignmentId)
        this.imageClassificationTasks = tasks
      });
    }
    console.log(this.activeRouter.snapshot)
  }

  ngOnInit() {
    this.changeDetectorRef.detectChanges();
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('index-page');
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('index-page');
  }

  submit(): void {
    this._submit = this.imageClassificationTasks.map(task => task.isClassified()).every(val => val === true)
    if (this._submit) {
      this.handleSubmit(this.assignmentId, this.turkSubmitTo, this.imageClassificationTasks)
    } else {
      this.showHint('Please choose one of the categories in all of the instances.')
    }
  }

  showHint(hint, time: number = 3000) {
    this.hint = hint;
    this.timerSubscription.unsubscribe();
    this.timerSubscription = timer(time).subscribe(() => {
      this.hint = ''
    });
  }
}

