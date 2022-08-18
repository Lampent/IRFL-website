import {Jsonable} from './jsonable';
import {ImageCategoriesEnum} from './image-categories-enum';
import {IRFLImage} from './IRFLImage';
import {IRFLFigureOfSpeechType} from './irfl-figure-of-speech.type';

export class ImageClassificationTask implements Jsonable {
    id: string = '';
    image: IRFLImage;
    phrase: string;
    type: IRFLFigureOfSpeechType
    definitions: string[];
    category: ImageCategoriesEnum;

    constructor(image: IRFLImage, type: IRFLFigureOfSpeechType, phrase: string = '', definitions: string[] = [], category: ImageCategoriesEnum = ImageCategoriesEnum.Default, id = '') {
        this.type = type;
        this.id = id;
        this.image = image;
        this.phrase = phrase;
        this.category = category;
        this.definitions = definitions;
    }


    static clone(task: ImageClassificationTask) {
        return new ImageClassificationTask(JSON.parse(JSON.stringify(task.image)), task.type, task.phrase, task.definitions, task.category, task.id)
    }

    init() {
        this.clear()
    }

    isClassified() {
        return this.category !== ImageCategoriesEnum.Default;
    }

    getHint() {
        if (this.isClassified()) {
            return '';
        } else {
            return 'Please choose one of the categories';
        }
    }

    clear() {
        this.category = ImageCategoriesEnum.Default;
    }

    getJSON() {
        return {...this};
    }

    getSolveFormat() {
        return this.getJSON();
    }
}