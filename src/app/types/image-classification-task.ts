import {Jsonable} from './jsonable';
import {ImageCategoriesEnum} from './image-categories-enum';
import {IRFLImage} from './IRFLImage';
import {IRFLFigureOfSpeechType} from './irfl-figure-of-speech.type';

export class ImageClassificationTask implements Jsonable {

    constructor(irflImage: IRFLImage, type: IRFLFigureOfSpeechType, phrase: string = '', definitions: string[] = [], category: ImageCategoriesEnum = ImageCategoriesEnum.Default,
                id = '', correctCategory: ImageCategoriesEnum = ImageCategoriesEnum.Default, hint = '', serverData: object = {}, groupID: string = '') {
        this.type = type;
        this.id = id;
        this.serverData = serverData;
        this.irflImage = irflImage;
        this.phrase = phrase;
        this.category = category;
        this.correctCategory = correctCategory;
        this.hint = hint;
        this.definitions = definitions.map(this.capitalizeFirstLetter);
        this.groupID = groupID;
    }
    id: string = '';
    irflImage: IRFLImage;
    phrase: string;
    type: IRFLFigureOfSpeechType
    definitions: string[];
    category: ImageCategoriesEnum;
    correctCategory: ImageCategoriesEnum;
    hint: string;
    serverData: object;
    groupID: string = '';


    static clone(task: ImageClassificationTask) {
        return new ImageClassificationTask(JSON.parse(JSON.stringify(task.irflImage)), task.type, task.phrase, task.definitions,
            task.category, task.id, task.correctCategory, task.hint, task.serverData, task.groupID)
    }

    capitalizeFirstLetter(sentence) {
        try {
            return sentence.charAt(0).toUpperCase() + sentence.slice(1);
        } catch (e) {
            return sentence
        }
    }

    init() {
        this.clear()
    }

    isClassified() {
        return this.category !== ImageCategoriesEnum.Default;
    }

    isClassifiedCorrect() {
        return this.category !== ImageCategoriesEnum.Default && this.category === this.correctCategory;
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