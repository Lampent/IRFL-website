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
  selectedTask: 'preference' | 'understanding' = 'understanding';
  leaderboard$: Observable<UserStats[]>
  understandingTaskModels = [
      {
          name: 'Humans',
          cat_1: '97',
          cat_2: '99.7',
          cat_3: '100'
      },
      {
          name: 'CLIP-VIT-L/14',
          cat_1: '17',
          cat_2: '25',
          cat_3: '52'
      },
      {
          name: 'CLIP-VIT-B/32',
          cat_1: '16',
          cat_2: '23',
          cat_3: '45'
      },

      {
          name: 'CLIP-RN50',
          cat_1: '14',
          cat_2: '27',
          cat_3: '47'
      },
      {
          name: 'CLIP-RN50x64/14',
          cat_1: '22',
          cat_2: '30',
          cat_3: '52'
      },
      {
          name: 'LiT',
          cat_1: '27',
          cat_2: '21',
          cat_3: '19'
      },
      {
          name: 'ViLT',
          cat_1: '-',
          cat_2: '23',
          cat_3: '40'
      }
      // {
      //     name: 'X-VLM',
      //     cat_1: '46',
      //     cat_2: '53',
      //     cat_3: '68'
      // }
  ].sort((a,b) => (Number(b.cat_1) - Number(a.cat_1)) + (Number(b.cat_2) - Number(a.cat_2)) + (Number(b.cat_3) - Number(a.cat_3)))

    preferenceTaskModels = [
        {
            name: 'CLIP-VIT-L/14',
            cat_1: '37',
            cat_2: '26',
            cat_3: '44'
        },
        {
            name: 'CLIP-VIT-B/32',
            cat_1: '36',
            cat_2: '22',
            cat_3: '38'
        },

        {
            name: 'CLIP-RN50',
            cat_1: '37',
            cat_2: '25',
            cat_3: '38'
        },
        {
            name: 'CLIP-RN50x64/14',
            cat_1: '39',
            cat_2: '29',
            cat_3: '43'
        },
        {
            name: 'LiT',
            cat_1: '56',
            cat_2: '25',
            cat_3: '25'
        },
        {
            name: 'ViLT',
            cat_1: '-',
            cat_2: '23',
            cat_3: '34'
        }
        // {
        //     name: 'X-VLM',
        //     cat_1: '46',
        //     cat_2: '53',
        //     cat_3: '68'
        // }
    ].sort((a,b) => (Number(b.cat_1) - Number(a.cat_1)) + (Number(b.cat_2) - Number(a.cat_2)) + (Number(b.cat_3) - Number(a.cat_3)))

  constructor(private leaderboardService: LeaderboardService) {
    this.leaderboard$ = this.leaderboardService.leaderboard;
  }

  ngOnInit(): void {
  }

    onPreferenceTaskSelected() {
        this.selectedTask = 'preference';
    }

    onUnderstandingTaskSelected() {
        this.selectedTask = 'understanding';
    }
}
