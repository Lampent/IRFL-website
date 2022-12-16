import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';

import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {ProgressbarModule} from 'ngx-bootstrap/progressbar';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {AlertModule} from 'ngx-bootstrap/alert';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {CarouselModule} from 'ngx-bootstrap/carousel';
import {ModalModule} from 'ngx-bootstrap/modal';
import {JwBootstrapSwitchNg2Module} from 'jw-bootstrap-switch-ng2';
import {PopoverModule} from 'ngx-bootstrap/popover';
import {MainComponent} from './main/main.component';
import {TaskBoardComponent} from '../task-bord/task-board.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ExploreComponent} from './explore/explore.component';
import {DownloadComponent} from './download/download.component';
import {MatInputModule} from '@angular/material/input';
import {MturkSolveComponent} from './mturk-irfl-task/mturk-solve.component';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {PersonalDetailsFormComponent} from './personal-details-form/personal-details-form.component';
import {MatButtonModule} from '@angular/material/button';
import {IRFLTaskPath, leaderboard} from '../app-routing.module';
import {NavbarComponent} from '../navbar/navbar/navbar.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReportFormComponent} from './report-form/report-form.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {LeaderboardComponent} from './leaderboard/leaderboard.component';
import {LeaderboardService} from '../services/leaderboard.service';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ChartModule} from 'primeng/chart';
import {AccordionModule} from 'primeng/accordion';
import {ImageClassificationBoardComponent} from '../image-classification-board/image-classification-board.component';
import {MturkImageClassificationTaskComponent} from './mturk-image-classification-task/mturk-image-classification-task.component';
import {MurkPersonalProfileComponent} from './mturk-personal-profile/murk-personal-profile.component';
import {MturkLeaderboardComponent} from './mturk leaderboard/mturk-leaderboard.component';

const routes: Routes = [
    {path: IRFLTaskPath, component: ExploreComponent},
    {path: 'explore', component: ExploreComponent},
    {path: leaderboard, component: LeaderboardComponent},
    {path: 'mturk/leaderboard', component: MturkLeaderboardComponent},
    {path: 'download', component: DownloadComponent},
    {path: 'mturk/image/:id', component: MturkImageClassificationTaskComponent},
    {path: 'mturk/task/:id', component: MturkSolveComponent},
    {path: '**', component: MainComponent},
]

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        MatDialogModule,
        ChartModule,
        AccordionModule,
        MatInputModule,
        RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}),
        BsDropdownModule.forRoot(),
        ProgressbarModule.forRoot(),
        TooltipModule.forRoot(),
        PopoverModule.forRoot(),
        CollapseModule.forRoot(),
        JwBootstrapSwitchNg2Module,
        TabsModule.forRoot(),
        PaginationModule.forRoot(),
        AlertModule.forRoot(),
        BsDatepickerModule.forRoot(),
        CarouselModule.forRoot(),
        ModalModule.forRoot(),
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatOptionModule,
        MatSelectModule,
        MatButtonModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatTooltipModule
    ],
    declarations: [
        MainComponent,
        NavbarComponent,
        TaskBoardComponent,
        ImageClassificationBoardComponent,
        ExploreComponent,
        DownloadComponent,
        MturkSolveComponent,
        PersonalDetailsFormComponent,
        ReportFormComponent,
        LeaderboardComponent,
        MturkImageClassificationTaskComponent,
        MurkPersonalProfileComponent,
        MturkLeaderboardComponent
    ],
    exports: [
        MainComponent,
        NavbarComponent,
        TaskBoardComponent,
        RouterModule
    ],
    providers: [
        LeaderboardService,
        {provide: APP_BASE_HREF, useValue: document.getElementsByTagName('base')[0].href}]
})
export class PagesModule {
    constructor(private leaderboardService: LeaderboardService) {
        this.leaderboardService.init();
    }
}
