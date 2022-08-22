import {Component, OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {Router} from '@angular/router';
import {getIRFLTask, imageClassificationExampleTask} from '../../types/task-dictionary';
import {IRFLTask} from '../../types/irfl-task';
import {IRFLFigureOfSpeechType} from '../../types/irfl-figure-of-speech.type';

@Component({
    selector: 'app-main',
    templateUrl: 'main.component.html',
    styleUrls: ['./main.scss']
})
export class MainComponent implements OnInit, OnDestroy {
    simile: IRFLTask = getIRFLTask('simile');
    idiom: IRFLTask = getIRFLTask('idiom');
    selectedFigureOfSpeech: IRFLFigureOfSpeechType = 'simile';
    imageClassification = imageClassificationExampleTask;
    public window: Window = window;

    constructor(private router: Router, private changeDetectorRef: ChangeDetectorRef) {
        window.name = 'IRFL'
    }

    ngOnInit() {
        this.changeDetectorRef.detectChanges();
    }

    ngOnDestroy() {
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove('index-page');
    }

    navigateHome() {
        this.router.navigateByUrl(this.router.url);
    }

    onSimileTabSelected() {
        this.idiom.clearCandidates();
        this.selectedFigureOfSpeech = 'simile';
    }

    onIdiomTabSelected() {
        this.simile.clearCandidates()
        this.selectedFigureOfSpeech = 'idiom';
    }
}
