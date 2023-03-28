import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {Candidate} from '../../types/candidate';
import {Observable, of, Subject, Subscription, timer} from 'rxjs';
import {ServerRequestService} from '../../services/server-request.service';
import {
    getIRFLTask,
    irflExampleIndexIDMap,
} from '../../types/task-dictionary';
import {IRFLTask} from '../../types/irfl-task';
import {takeUntil, tap} from 'rxjs/operators';
import {screens} from '../../types/screens';

@Component({
    selector: 'app-explore',
    templateUrl: './explore.component.html',
    styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit, OnDestroy {
    hint = ''
    answers: Map<number, Candidate> = new Map<number, Candidate>();
    practiceMode = false;
    isCollapsed = true;
    _submit = false;
    goodJobHint = 'Good Job!';
    timerSubscription = new Subscription()
    exampleIndex = 1;
    responseBackgroundColor = '';
    responseTextColor = '';
    cancel$ = new Subject();
    irflTask: IRFLTask;
    selectedCandidates = 'idiom';
    beatTheAIMode = false;
    candidates = [
        {value: 'idiom', viewValue: 'Idioms'},
        {value: 'simile', viewValue: 'Similes'},
        {value: 'metaphor', viewValue: 'Metaphors'},
        {value: 'random', viewValue: 'Random'}
    ];

    constructor(private router: Router,
                private activeRouter: ActivatedRoute,
                private changeDetectorRef: ChangeDetectorRef,
                private dialog: MatDialog,
                private serverRequestService: ServerRequestService
    ) {

    }

    ngOnInit() {
        this.changeDetectorRef.detectChanges();
        window.name = 'IRFL'
        this.practice();
    }

    init() {
        this.practiceMode = false;
        this.exampleIndex = 1;
        this.initExample(1)
    }


    initExample(index: number) {
        this.cancel$.next();
        this._submit = false;
        this.showHint('')
            this.getTaskFromServer(index).pipe(takeUntil(this.cancel$)).subscribe((task) => {
                this.irflTask = task;
            })
    }

    onNavbarClick(event: screens) {
        if (event === 'beat-the-ai') {
            this.init()
        } else if (event === 'explore') {
            this.init()
            this.practice()
        }
    }

    onCandidatesSelect(candidateOption) {
        this.selectedCandidates = candidateOption;
    }

    getTaskFromServer(index: number): Observable<any> {
        return this.serverRequestService.getIRFLTaskEXPLORE(this.selectedCandidates, index);
    }

    ngOnDestroy() {
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove('index-page');
    }

    restartPractice() {
        this._submit = false;
        this.showHint('')
        this.irflTask?.init();
    }

    submit(): void {
        this._submit = this.irflTask?.isTaskSolved()
        if (this._submit) {
            this.showHint(this.goodJobHint)
        } else {
            this.showHint(this.irflTask?.getHint())
        }
    }

    showHint(hint, time: number = 3000, responseBackgroundColor = '', responseTextColor = 'black') {
        this.hint = hint;
        this.responseTextColor = responseTextColor;
        this.responseBackgroundColor = responseBackgroundColor;
        this.timerSubscription.unsubscribe();
        this.timerSubscription = timer(time).subscribe(() => {
            this.hint = ''
            this.responseBackgroundColor = '';
            this.responseTextColor = 'black';
        });
    }

    moveLeft() {
        if (this.exampleIndex > 1) {
            this.exampleIndex--;
            this.move()
        }
    }

    moveRight() {
        this.exampleIndex++;
        this.move()
    }

    move() {
        this.irflTask?.init()
        this.initExample(this.exampleIndex)
    }

    practice(): void {
        this.initExample(this.exampleIndex);
        this.practiceMode = true;
    }
}
