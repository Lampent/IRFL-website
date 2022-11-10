import {AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Candidate} from '../../types/candidate';
import {Subject, Subscription, timer} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {ServerRequestService} from '../../services/server-request.service';
import {MturkTask} from '../../types/mturk-task';
import {ImageClassificationTask} from '../../types/image-classification-task';
import {imageClassificationExampleTask} from '../../types/task-dictionary';
import ConfettiGenerator from 'confetti-js';
import {filter, takeUntil, throttleTime} from 'rxjs/operators';

@Component({
  selector: 'app-mturk-personal-profile',
  templateUrl: './murk-personal-profile.component.html',
  styleUrls: ['./murk-personal-profile.component.scss']
})
export class MurkPersonalProfileComponent extends MturkTask implements OnInit, OnDestroy {

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
  confettiShown = false;
  confetti: ConfettiGenerator;
  confettiSettings: any = {target: 'confetti', height: document.documentElement.scrollHeight};
  timerSubscription = new Subscription()
  example = imageClassificationExampleTask;
  imageClassificationTasks: ImageClassificationTask[] = null;
  updateConfettiSettings$ = new Subject();
  unsubscribe$ = new Subject();
  workerStats;

  constructor(private router: Router,
              private activeRouter: ActivatedRoute,
              private changeDetectorRef: ChangeDetectorRef,
              private serverRequestService: ServerRequestService
  ) {
    super();
    window.name = 'IRFL'
    this.id = this.activeRouter.snapshot.params.id
    if (this.id && typeof this.id === 'string') {
      this.serverRequestService.getWorkerStats(this.id).subscribe(stats => this.workerStats = stats)
      this.serverRequestService.getWorkerSpacialAnswers(this.id).subscribe((tasks: ImageClassificationTask[]) => {
        this.turkSubmitTo = this.activeRouter.snapshot.queryParams.turkSubmitTo
        this.assignmentId = this.activeRouter.snapshot.queryParams.assignmentId
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
    this.initConfettiUpdater();
  }

  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('index-page');
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  submit(): void {
      this.taskSubmit();
  }

  trainingSubmit(): void {
    this._submit = this.imageClassificationTasks.map(task => task.isClassified()).every(val => val === true)
    if (this._submit) {
      const allClassifiedCorrectly = this.imageClassificationTasks.map(task => task.isClassifiedCorrect()).every(val => val === true)
      if (allClassifiedCorrectly) {
        this.renderConfetti();
        this.showHint('Good Job! You passed the training!', 30000)
      } else {
        this.showHint('There were some incorrect classifications. Try again after reviewing the hints!', 30000)
      }
    } else {
        this.showHint('Please choose one of the categories in all of the instances.', 10000)
    }
    timer(50).subscribe(() => window.scrollTo(0, document.body.scrollHeight))
  }

  taskSubmit(): void {
    this._submit = this.imageClassificationTasks.map(task => task.isClassified()).every(val => val === true)
    if (this._submit) { // regular case
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

  restart() {
    this.clearConfetti()
    this.imageClassificationTasks.forEach(task => task.init())
    this._submit = false;
  }

  initConfettiUpdater(): void {
    this.updateConfettiSettings$.pipe(
        takeUntil(this.unsubscribe$),
        throttleTime(500),
        filter((num) => num !== this.confettiSettings.height))
        .subscribe((num) => {
          this.confettiSettings = {target: 'confetti', max: 200, height: document.documentElement.scrollHeight};
        })
  }

  renderConfetti(): void {
    if (!this.confettiShown) {
      if (!this.confetti) {
        this.confetti = new ConfettiGenerator(this.confettiSettings);
      }
      this.confetti.render();
      this.confettiShown = true;
    }
  }

  clearConfetti(): void {
    if (!this.confetti) {
      this.confetti = new ConfettiGenerator(this.confettiSettings);
    }
    if (this.confettiShown) {
      this.confetti.clear();
      this.confettiShown = false;
      this.confetti = new ConfettiGenerator(this.confettiSettings);
    }
  }
}

