import {Component, OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import noUiSlider from 'nouislider';
import {Router} from '@angular/router';
import {getIRFLTask} from '../../types/task-dictionary';
import {IRFLTask} from '../../types/irfl-task';

@Component({
    selector: 'app-main',
    templateUrl: 'main.component.html',
    styleUrls: ['./main.scss']
})
export class MainComponent implements OnInit, OnDestroy {
    task: IRFLTask = getIRFLTask('monkey-human-swing');
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
}
