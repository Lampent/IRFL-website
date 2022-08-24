import {Jsonable} from './jsonable';
import {ImageCategoriesEnum} from './image-categories-enum';
import {IRFLImage} from './IRFLImage';
import {IRFLFigureOfSpeechType} from './irfl-figure-of-speech.type';

export class ImageClassificationTask implements Jsonable {
    id: string = '';
    irflImage: IRFLImage;
    phrase: string;
    type: IRFLFigureOfSpeechType
    definitions: string[];
    category: ImageCategoriesEnum;
    serverData: object;
    groupID: string = '';

    constructor(irflImage: IRFLImage, type: IRFLFigureOfSpeechType, phrase: string = '', definitions: string[] = [], category: ImageCategoriesEnum = ImageCategoriesEnum.Default,
                id = '', serverData: object = {}, groupID: string ='') {
        this.type = type;
        this.id = id;
        this.serverData = serverData;
        this.irflImage = irflImage;
        this.phrase = phrase;
        this.category = category;
        this.definitions = definitions.map(this.capitalizeFirstLetter);
        this.groupID = groupID;
    }

    capitalizeFirstLetter(sentence) {
        try {
            return sentence.charAt(0).toUpperCase() + sentence.slice(1);
        } catch (e) {
            return sentence
        }
    }


    static clone(task: ImageClassificationTask) {
        return new ImageClassificationTask(JSON.parse(JSON.stringify(task.irflImage)), task.type, task.phrase, task.definitions, task.category, task.id, task.serverData, task.groupID)
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