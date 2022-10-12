import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import ConfettiGenerator from 'confetti-js';
import {Candidate} from '../types/candidate';
import {FormControl} from '@angular/forms';
import {IRFLTask} from '../types/irfl-task';

@Component({
    selector: 'app-task-board',
    templateUrl: './task-board.component.html',
    styleUrls: ['./task-board.component.scss']
})
export class TaskBoardComponent implements OnInit {
    _candidates: Candidate[] = []
    _irflTask: IRFLTask = null;
    confettiID = 'confetti-' + String(Math.floor(Math.random() * 10000000000))
    confettiSettings = {target: this.confettiID};
    confetti: ConfettiGenerator;
    confettiShown = false;
    noSelection = true;
    showInfo = false;
    isSixCandidates = false;
    isTwelveCandidates = false;
    @Input() enableSelection = true;
    @Input() testMode = false;
    @Input() disableSolutionIcons = false;
    @Input() _submit = false;
    @Input() title = '';
    @Input() enablePointer = false;
    @Input() info: string = '';
    @Output() selected$: EventEmitter<Candidate> = new EventEmitter<Candidate>();
    cueFormControl = new FormControl('');

    constructor(private changeDetectionRef: ChangeDetectorRef) {
    }

    ngOnInit(): void {
    }

    init() {
        this.clearConfetti();
        this.cueFormControl.setValue(this._irflTask.phrase)
        this.detectChanges();
    }

    @Input()
    set irflTask(task: IRFLTask) {
        this._irflTask = task;
        this._candidates = task.candidates;
        this.isSixCandidates = !(this._irflTask.candidates.length % 6);
        this.isTwelveCandidates = this._irflTask.candidates.length === 12
        this.init();
    }

    @Input()
    set submit(status: boolean) {
        this._submit = status;
    }

    selectCandidate(candidate: Candidate): void {
        if (this.enableSelection && !this._submit) {
            candidate.userChoice = !candidate.userChoice;
            this.noSelection = false;
            this.setConfetti();
            if (this._irflTask.isTaskSolved()) {
                if (!this.testMode) {
                    this.renderConfetti()
                }
            }
            this.detectChanges();
        }
    }

    setConfetti(): void {
        if (!this.confetti) {
            this.confetti = new ConfettiGenerator(this.confettiSettings);
        }
        this.clearConfetti();
    }

    renderConfetti(): void {
        if (!this.confettiShown) {
            this.confetti.render();
            this.confettiShown = true;
        }
    }

    clearConfetti(): void {
        if (this.confettiShown) {
            this.confetti.clear();
            this.confettiShown = false;
            this.confetti = new ConfettiGenerator(this.confettiSettings);
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
