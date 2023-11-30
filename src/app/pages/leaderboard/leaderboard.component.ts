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
          IdiomFigurative: '97',
          Metaphor: '99.7',
          OpenSimile: '100',
          ClosedSimile: '100',
          IdiomFigurativeLiteral: '90'
      },
      {
          name: 'CLIP-VIT-L/14',
          IdiomFigurative: '17',
          Metaphor: '25',
          OpenSimile: '40',
          ClosedSimile: '52',
          IdiomFigurativeLiteral: '56'
      },
      {
          name: 'CLIP-VIT-B/32',
          IdiomFigurative: '16',
          Metaphor: '23',
          OpenSimile: '38',
          ClosedSimile: '45',
          IdiomFigurativeLiteral: '44'
      },
      {
          name: 'CLIP-RN50',
          IdiomFigurative: '14',
          Metaphor: '27',
          OpenSimile: '35',
          ClosedSimile: '47',
          IdiomFigurativeLiteral: '37'
      },
      {
          name: 'CLIP-RN50x64/14',
          IdiomFigurative: '22',
          Metaphor: '30',
          OpenSimile: '41',
          ClosedSimile: '52',
          IdiomFigurativeLiteral: '56'
      },
      {
          name: 'BLIP',
          IdiomFigurative: '18',
          Metaphor: '22',
          OpenSimile: '44',
          ClosedSimile: '66',
          IdiomFigurativeLiteral: '57'
      },
      {
          name: 'BLIP2',
          IdiomFigurative: '19',
          Metaphor: '22',
          OpenSimile: '40',
          ClosedSimile: '57',
          IdiomFigurativeLiteral: '53'
      },
      {
          name: 'CoCa ViLT-L-14',
          IdiomFigurative: '17',
          Metaphor: '18',
          OpenSimile: '33',
          ClosedSimile: '45',
          IdiomFigurativeLiteral: '53'
      },
      {
          name: 'ViLT',
          IdiomFigurative: '-',
          Metaphor: '23',
          OpenSimile: '33',
          ClosedSimile: '40',
          IdiomFigurativeLiteral: '-'
      }
  ].sort((a,b) => (Number(b.IdiomFigurative) - Number(a.IdiomFigurative)) + (Number(b.Metaphor) - Number(a.Metaphor)) + (Number(b.OpenSimile) - Number(a.OpenSimile)))

    preferenceTaskModels = [
        {
            name: 'CLIP-VIT-L/14',
            IdiomFigurative: '37',
            Metaphor: '26',
            OpenSimile: '34',
            ClosedSimile: '44',
            IdiomFigurativeLiteral: '57'
        },
        {
            name: 'CLIP-VIT-B/32',
            IdiomFigurative: '36',
            Metaphor: '22',
            OpenSimile: '30',
            ClosedSimile: '38',
            IdiomFigurativeLiteral: '54'
        },

        {
            name: 'CLIP-RN50',
            IdiomFigurative: '37',
            Metaphor: '25',
            OpenSimile: '31',
            ClosedSimile: '38',
            IdiomFigurativeLiteral: '54'
        },
        {
            name: 'CLIP-RN50x64/14',
            IdiomFigurative: '39',
            Metaphor: '29',
            OpenSimile: '32',
            ClosedSimile: '43',
            IdiomFigurativeLiteral: '61'
        },
        {
            name: 'BLIP',
            IdiomFigurative: '39',
            Metaphor: '24',
            OpenSimile: '33',
            ClosedSimile: '54',
            IdiomFigurativeLiteral: '58'
        },
        {
            name: 'BLIP2',
            IdiomFigurative: '39',
            Metaphor: '22',
            OpenSimile: '29',
            ClosedSimile: '42',
            IdiomFigurativeLiteral: '57'
        },
        {
            name: 'CoCa ViT-L-14',
            IdiomFigurative: '36',
            Metaphor: '20',
            OpenSimile: '24',
            ClosedSimile: '39',
            IdiomFigurativeLiteral: '56'
        },
        {
            name: 'ViLT',
            IdiomFigurative: '-',
            Metaphor: '25',
            OpenSimile: '28',
            ClosedSimile: '34',
            IdiomFigurativeLiteral: '-'
        }
        // {
        //     name: 'X-VLM',
        //     cat_1: '46',
        //     cat_2: '53',
        //     cat_3: '68'
        // }
    ].sort((a,b) => (Number(b.IdiomFigurative) - Number(a.IdiomFigurative)) + (Number(b.Metaphor) - Number(a.Metaphor)) + (Number(b.OpenSimile) - Number(a.OpenSimile)))

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
