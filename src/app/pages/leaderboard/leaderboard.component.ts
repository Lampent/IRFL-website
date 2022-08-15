import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {UserStats} from '../../types/user-stats';
import {LeaderboardService} from '../../services/leaderboard.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  isCollapsed = true;
  leaderboard$: Observable<UserStats[]>
  models = [
      {
          name: 'Humans',
          cat_1: '90',
          cat_2: '92',
          cat_3: '95'
      },
      {
        name: 'CLIP-RN50x64/14',
        cat_1: '38',
        cat_2: '50',
        cat_3: '70'
      },
      {
          name: 'CLIP-VIT-L/14',
          cat_1: '40',
          cat_2: '53',
          cat_3: '74'
      },
      {
          name: 'CLIP-VIT-B/32',
          cat_1: '41',
          cat_2: '53',
          cat_3: '74'
      },
      {
          name: 'CLIP-RN50',
          cat_1: '35',
          cat_2: '50',
          cat_3: '73'
      },
      {
          name: 'CLIP-VIL',
          cat_1: '15',
          cat_2: '47',
          cat_3: '66'
      },
      {
          name: 'ViLT',
          cat_1: '52',
          cat_2: '55',
          cat_3: '59'
      },
      {
          name: 'X-VLM',
          cat_1: '46',
          cat_2: '53',
          cat_3: '68'
      }
  ].sort((a,b) => Number(b.cat_1) - Number(a.cat_1))

  constructor(private leaderboardService: LeaderboardService) {
    this.leaderboard$ = this.leaderboardService.leaderboard;
  }

  ngOnInit(): void {
  }

}
