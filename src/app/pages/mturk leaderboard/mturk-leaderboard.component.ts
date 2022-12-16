import { Component, OnInit } from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {UserStats} from '../../types/user-stats';
import {LeaderboardService} from '../../services/leaderboard.service';
import {ServerRequestService} from '../../services/server-request.service';
import {map, take} from 'rxjs/operators';
import {HotObservable} from 'rxjs/internal/testing/HotObservable';
import {leaderboard} from '../../app-routing.module';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './mturk-leaderboard.component.html',
  styleUrls: ['./mturk-leaderboard.component.scss']
})
export class MturkLeaderboardComponent implements OnInit {
  isCollapsed = true;
  leaderboard$: ReplaySubject<any> = new ReplaySubject(1)
  indexes$: Observable<number[]>
  Math = Math;
  // ].sort((a,b) => Number(b.cat_1) - Number(a.cat_1))

  constructor(private serverRequestService: ServerRequestService) {
    serverRequestService.getMturkLeaderboard().subscribe(leaderboard => this.leaderboard$.next(leaderboard));
    this.indexes$ = this.leaderboard$.pipe(map(table =>
        [...Array(table['worker_id'].length).keys()]
        .filter((index) => table['images_annotated'][index] > 50)
        .sort((a,b) => this.calculate_worker_score(table, b) - this.calculate_worker_score(table, a))))
    this.leaderboard$.subscribe(l => console.log(l))
    this.indexes$.subscribe(l => console.log(l))
  }

  calculate_worker_score(table, index) {
    const scalar = (100/6) / 100
    return table['Figurative_Literal_agreement'][index] * scalar +
    table['Figurative_agreement'][index] * scalar +
    table['Caption_agreement'][index] * scalar +
    table['Partial_Objects_agreement'][index] * scalar +
    table['None_agreement'][index] * scalar +
    table['images_annotated'][index] * scalar;
  }

  ngOnInit(): void {
  }

}
