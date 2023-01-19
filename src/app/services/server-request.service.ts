import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Candidate} from '../types/candidate';
import {Observable, of} from 'rxjs';
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

    getWorkerStats(id): Observable<any> {
        const url = `${serverURL}/statistics/${id}`
        return this.httpService.get<any>(url).pipe(map((task: any) => {
            return task
        }));
    }

    getWorkerSpacialAnswers(id): Observable<any> {
        const url = `${serverURL}/spacial-answers/${id}`
        return this.httpService.get<any>(url).pipe(map((serverTaskGroup: ServerTaskGroup) => {
            return serverTaskGroup.tasks.map((task: any) => {
                const irflImage: IRFLImage = new IRFLImage(task.image_url, task.image_name);
                return new ImageClassificationTask(
                    irflImage,
                    task.type,
                    task.phrase,
                    task.type === 'idiom' ? task.definitions.map((definition: any) => definition?.definition || definition)
                        .sort((a,b) => a.length - b.length) : [],
                    ImageCategoriesEnum.Default,
                    task.id,
                    task.category,
                    task.hint,
                    task,
                    serverTaskGroup.ID,
                    task.secondary_category,
                    task.correct_secondary_category
                );
            });
        }));
    }

    getIRFLTask(id, example: boolean=false): Observable<IRFLTask> {
        const url = `${serverURL}/task/${id}`
        return this.httpService.get<any>(url).pipe(map((task: any) => {
            return task
        }));
    }

    getIRFLTasks(id): Observable<IRFLTask[]> {
        const url = `${serverURL}/task/${id}`
        return this.httpService.get<any>(url).pipe(map((task: any) => {
            if (task['number_of_tasks'] === 200) {
                return task['tasks'].map((subTask: any) => {
                    return new IRFLTask(
                        subTask['type'],
                        subTask['candidates'].map(candidate => new Candidate(candidate['image'], candidate['name'], candidate['answer'])),
                        subTask['phrase'],
                        subTask['numOfSolution'],
                        subTask['definitions'] ? subTask['definitions'].sort((a,b) => a.length - b.length) : [],
                        task,
                        subTask['id']
                    )
                })
            } else {
                return [new IRFLTask(
                    task['type'],
                    task['candidates'].map(candidate => new Candidate(candidate['image'], candidate['name'], candidate['answer'])),
                    task['phrase'],
                    task['numOfSolution'],
                    task['definitions'] ? task['definitions'].sort((a,b) => a.length - b.length) : [],
                    task,
                    task['id']
                )]
            }
        }));
    }

    getIRFLImageClassificationTasks(id, example: boolean=false): Observable<ImageClassificationTask[]> {
        const url = `${serverURL}/task/image/${id}`
        return this.httpService.get<any>(url).pipe(map((serverTaskGroup: ServerTaskGroup) => {
            return serverTaskGroup.tasks.map((task: any) => {
                const irflImage: IRFLImage = new IRFLImage(task.image_url, task.image_name);
                return new ImageClassificationTask(
                    irflImage,
                    task.type,
                    task.phrase,
                    task.type === 'idiom' ? task.definitions.map((definition: any) => definition?.definition || definition)
                        .sort((a,b) => a.length - b.length) : [],
                    ImageCategoriesEnum.Default,
                    task.ID,
                    task.correct_category,
                    task.hint,
                    task,
                    serverTaskGroup.ID,
                    task.secondary_category,
                    task.correct_secondary_category
                );
            });
        }));
    }

    getMturkLeaderboard(): Observable<any> {
        const url = `${serverURL}/mturk/leaderboard`;
        return this.httpService.get<any>(url);
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
