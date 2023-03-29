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
          Idiom: '97',
          Metaphor: '99.7',
          Simile: '100'
      },
      {
          name: 'CLIP-VIT-L/14',
          Idiom: '17',
          Metaphor: '25',
          Simile: '52'
      },
      {
          name: 'CLIP-VIT-B/32',
          Idiom: '16',
          Metaphor: '23',
          Simile: '45'
      },

      {
          name: 'CLIP-RN50',
          Idiom: '14',
          Metaphor: '27',
          Simile: '47'
      },
      {
          name: 'CLIP-RN50x64/14',
          Idiom: '22',
          Metaphor: '30',
          Simile: '52'
      },
      {
          name: 'LiT',
          Idiom: '27',
          Metaphor: '21',
          Simile: '19'
      },
      {
          name: 'ViLT',
          Idiom: '-',
          Metaphor: '23',
          Simile: '40'
      }
      // {
      //     name: 'X-VLM',
      //     cat_1: '46',
      //     cat_2: '53',
      //     cat_3: '68'
      // }
  ].sort((a,b) => (Number(b.Idiom) - Number(a.Idiom)) + (Number(b.Metaphor) - Number(a.Metaphor)) + (Number(b.Simile) - Number(a.Simile)))

    preferenceTaskModels = [
        {
            name: 'CLIP-VIT-L/14',
            Idiom: '37',
            Metaphor: '26',
            Simile: '44'
        },
        {
            name: 'CLIP-VIT-B/32',
            Idiom: '36',
            Metaphor: '22',
            Simile: '38'
        },

        {
            name: 'CLIP-RN50',
            Idiom: '37',
            Metaphor: '25',
            Simile: '38'
        },
        {
            name: 'CLIP-RN50x64/14',
            Idiom: '39',
            Metaphor: '29',
            Simile: '43'
        },
        {
            name: 'LiT',
            Idiom: '56',
            Metaphor: '25',
            Simile: '25'
        },
        {
            name: 'ViLT',
            Idiom: '-',
            Metaphor: '23',
            Simile: '34'
        }
        // {
        //     name: 'X-VLM',
        //     cat_1: '46',
        //     cat_2: '53',
        //     cat_3: '68'
        // }
    ].sort((a,b) => (Number(b.Idiom) - Number(a.Idiom)) + (Number(b.Metaphor) - Number(a.Metaphor)) + (Number(b.Simile) - Number(a.Simile)))

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
