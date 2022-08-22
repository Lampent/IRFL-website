import {ServerTask} from './server-task';
import {IRFLFigureOfSpeechType} from './irfl-figure-of-speech.type';

export interface ServerTaskGroup {
    'ID': string,
    'number_of_tasks': number
    'tasks': ServerTask[]
    'type': IRFLFigureOfSpeechType
}