import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Candidate} from '../types/candidate';
import {Observable, of} from 'rxjs';
import {GiveTheCueTask} from '../types/give-the-cue-task';
import {IRFLTask} from '../types/irfl-task';
import {map} from 'rxjs/operators';
import {UserStats} from '../types/user-stats';
import {ImageClassificationTask} from '../types/image-classification-task';
import {getIRFLTask} from '../types/task-dictionary';
import {IRFLImage} from '../types/IRFLImage';
import {ServerTask} from '../types/server-task';
import {ImageCategoriesEnum} from '../types/image-categories-enum';
import {ServerTaskGroup} from '../types/server-task-group';

// mock

function getMock(task: GiveTheCueTask): {score: number, prediction: string[]} {
    const shuffle = [...task.candidates[0]].sort(() => 0.5 - Math.random()).map(candidate => candidate.img)
    const selected = shuffle.slice(0, task.numberOfChosenCandidates(0))
    const userChoice = task.candidates[0].filter((candidate: Candidate) => candidate.userChoice).map((candidate: Candidate) => candidate.img)
    return {score: GiveTheCueTask.jaccard_similarity(selected, userChoice), prediction: selected}
}

const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json'
});

function getImagePath(imgName: string) {
    // return awsURL+imgName+'.jpg';
    return imgName
}
// https://irfl-app.herokuapp.com/
// http://127t.0.0.1:1235

// const serverURL: string = 'http://127.0.0.1:1235'
const serverURL: string = 'https://irfl-app.herokuapp.com/'
@Injectable()
export class ServerRequestService {

    constructor(private httpService: HttpClient) {
    }

    getRandomIRFLTask(id, example: boolean=false): Observable<IRFLTask> {
        // const url = example ? `https://gvlab-backend.herokuapp.com/task/example/solve/${id}` : `https://gvlab-backend.herokuapp.com/task/mturk/solve/${id}`
        const url = `${serverURL}/task/mturk/solve_create/${id}`
        // return this.httpService.get<any>(url).pipe(map((task) => {
        //     return this.createNewGuessTheAssociationsTask(task);
        // }));
        return of(getIRFLTask('idiom'))
    }

    getIRFLTask(id, example: boolean=false): Observable<IRFLTask> {
        // const url = example ? `https://gvlab-backend.herokuapp.com/task/example/solve/${id}` : `https://gvlab-backend.herokuapp.com/task/mturk/solve/${id}`
        const url = `${serverURL}/task/mturk/solve_create/${id}`
        // return this.httpService.get<any>(url).pipe(map((task) => {
        //     return this.createNewGuessTheAssociationsTask(task);
        // }));
        return of(getIRFLTask('idiom'))
    }

    getIRFLImageClassificationTask(id, example: boolean=false): Observable<ImageClassificationTask> {
        const url = `${serverURL}/task/image/${id}`
        return this.httpService.get<any>(url).pipe(map((task: ServerTask) => {
            const irflImage: IRFLImage = new IRFLImage(task.image_url, task.image_name);
            return new ImageClassificationTask(
                irflImage,
                task.type,
                task.phrase,
                task.type === 'idiom' ? task.definitions.map((definition: any) => definition.definition) : [],
                ImageCategoriesEnum.Default,
                task.ID,
                task
            );
        }));
    }

    getIRFLImageClassificationTasks(id, example: boolean=false): Observable<ImageClassificationTask[]> {
        const url = `${serverURL}/task/image/${id}`
        return this.httpService.get<any>(url).pipe(map((serverTaskGroup: ServerTaskGroup) => {
            return serverTaskGroup.tasks.map((task) => {
                const irflImage: IRFLImage = new IRFLImage(task.image_url, task.image_name);
                return new ImageClassificationTask(
                    irflImage,
                    task.type,
                    task.phrase,
                    task.type === 'idiom' ? task.definitions.map((definition: any) => definition.definition) : [],
                    ImageCategoriesEnum.Default,
                    task.ID,
                    task,
                    serverTaskGroup.ID
                );
            });
        }));
    }

    sendReportForm(data: object) {
        this.httpService.post('https://gvlab-backend.herokuapp.com/report', JSON.stringify(data), {headers}).subscribe((response: any) => {
            console.log('Report form was sent')
        })
    }

    getLeaderboard(): Observable<UserStats[]> {
        // const url = `https://gvlab-backend.herokuapp.com/leaderboard`
        // return this.httpService.get<any>(url).pipe(map((leaderboard: any[]) => {
        //     return leaderboard.map(((serverUserDetails, index) => new UserStats(index+1, serverUserDetails?.player_username, serverUserDetails['fool-the-ai'], serverUserDetails['solvable-by-humans'], serverUserDetails['solving-existing-associations'])));
        // }));
        return of([])
    }
}
