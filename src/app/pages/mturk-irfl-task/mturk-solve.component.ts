import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Candidate} from '../../types/candidate';
import {Subscription, timer} from 'rxjs';
import {IRFLTask} from '../../types/irfl-task';
import {ActivatedRoute, Router} from '@angular/router';
import {ServerRequestService} from '../../services/server-request.service';
import {MturkTask} from '../../types/mturk-task';

@Component({
    selector: 'app-mturk-solve',
    templateUrl: './mturk-solve.component.html',
    styleUrls: ['./mturk-solve.component.scss']
})
export class MturkSolveComponent extends MturkTask implements OnInit, OnDestroy {
    hint = ''
    date = new Date();
    pagination = 3;
    pagination1 = 1;
    answers: Map<number, Candidate> = new Map<number, Candidate>();
    testMode = false;
    _submit = false;
    // goodJobHint = 'Good Job!';
    turkSubmitTo = '';
    assignmentId = '';
    solveCreate = false;
    timerSubscription = new Subscription()
    irflTasks: IRFLTask[] = []

    constructor(private router: Router,
                private activeRouter: ActivatedRoute,
                private changeDetectorRef: ChangeDetectorRef,
                private serverRequestService: ServerRequestService
    ) {
        super();
        window.name = 'IRFL'
        this.id = this.activeRouter.snapshot.params.id
        if (this.id && typeof this.id === 'string') {
            this.serverRequestService.getIRFLTasks(this.id).subscribe((tasks: IRFLTask[]) => {
                this.turkSubmitTo = this.activeRouter.snapshot.queryParams.turkSubmitTo
                this.assignmentId = this.activeRouter.snapshot.queryParams.assignmentId
                console.log(this.turkSubmitTo)
                console.log(this.assignmentId)
                this.irflTasks = tasks
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

    restartPractice(index) {
        this._submit = false;
        this.showHint('')
        this.irflTasks[index]?.init();
    }

    submit(index): void {
        this._submit = this.irflTasks[index].isTaskSolved(true)
        if (this._submit) {
            this.handleSubmit(this.assignmentId, this.turkSubmitTo, this.irflTasks[index])
        } else {
            this.showHint(this.irflTasks[index]?.getHint())
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
