import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  focus;
  focus1;
  focus2;
  date = new Date();
  pagination = 3;
  pagination1 = 1;
  selectedTab = 'Idioms'

  constructor() {
    window.name = 'IRFL'
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('index-page');
  }

  onSelectedTab(event) {
    this.selectedTab = event['heading']
  }
}
