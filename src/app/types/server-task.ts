import {IRFLFigureOfSpeechType} from './irfl-figure-of-speech.type';

export interface ServerTask {
    'ID': string,
    'IRFL_id': string,
    'context': object[],
    'definition': string,
    'definitions': object[],
    'image_name': string,
    'image_url': string,
    'literal': boolean,
    'phrase': string,
    'type': IRFLFigureOfSpeechType
}