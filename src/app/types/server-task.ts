import {IRFLFigureOfSpeechType} from './irfl-figure-of-speech.type';
import {ImageCategoriesEnum} from './image-categories-enum';

export interface ServerTask {
    'ID': string,
    'IRFL_id': string,
    'context': object[],
    'definition': string,
    'definitions': object[],
    'image_name': string,
    'image_url': string,
    'correct_category': ImageCategoriesEnum,
    'hint': string,
    'literal': boolean,
    'phrase': string,
    'type': IRFLFigureOfSpeechType
}