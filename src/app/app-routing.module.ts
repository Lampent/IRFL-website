import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import {MainComponent} from './pages/main/main.component';
import {DownloadComponent} from './pages/download/download.component';
import {ExploreComponent} from './pages/explore/explore.component';
import {MturkSolveComponent} from './pages/mturk-irfl-task/mturk-solve.component';
import {LeaderboardComponent} from './pages/leaderboard/leaderboard.component';
import {MturkImageClassificationTaskComponent} from './pages/mturk-image-classification-task/mturk-image-classification-task.component';
import {MurkPersonalProfileComponent} from './pages/mturk-personal-profile/murk-personal-profile.component';
import {MturkLeaderboardComponent} from './pages/mturk leaderboard/mturk-leaderboard.component';

export const IRFLTaskPath = 'task';
export const leaderboard = 'leaderboard';

const routes: Routes = [
  { path: '*', component: MainComponent},
  { path: 'main', component: MainComponent },
  { path: 'explore', component: ExploreComponent },
  { path: leaderboard, component: LeaderboardComponent },
  { path: 'mturk/leaderboard', component: MturkLeaderboardComponent },
  { path: 'mturk/task/:id', component: MturkSolveComponent },
  {path: 'mturk/image/:id', component: MturkImageClassificationTaskComponent},
  {path: 'profile/:id', component: MurkPersonalProfileComponent},
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
      onSameUrlNavigation: 'reload'
    })
  ],
  exports: []
})
export class AppRoutingModule {}
