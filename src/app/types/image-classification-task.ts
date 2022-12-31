import {Jsonable} from './jsonable';
import {ImageCategoriesEnum, SimilesConceptsCategoriesEnum} from './image-categories-enum';
import {IRFLImage} from './IRFLImage';
import {IRFLFigureOfSpeechType} from './irfl-figure-of-speech.type';

export class ImageClassificationTask implements Jsonable {

    constructor(irflImage: IRFLImage, type: IRFLFigureOfSpeechType, phrase: string = '', definitions: string[] = [], category: ImageCategoriesEnum = ImageCategoriesEnum.Default,
                id = '', correctCategory: ImageCategoriesEnum = ImageCategoriesEnum.Default, hint = '', serverData: object = {}, groupID: string = '',
                secondaryCategory = SimilesConceptsCategoriesEnum.Default, correctSecondaryCategory = SimilesConceptsCategoriesEnum.Default) {
        this.type = 'simile';
        this.id = id;
        this.serverData = serverData;
        this.irflImage = irflImage;
        this.phrase = phrase;
        this.category = category;
        this.secondaryCategory = secondaryCategory;
        this.correctSecondaryCategory = correctSecondaryCategory;
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
    secondaryCategory: SimilesConceptsCategoriesEnum;
    correctSecondaryCategory: SimilesConceptsCategoriesEnum;
    category: ImageCategoriesEnum;
    correctCategory: ImageCategoriesEnum;
    hint: string;
    serverData: object;
    groupID: string = '';


    static clone(task: ImageClassificationTask) {
        return new ImageClassificationTask(JSON.parse(JSON.stringify(task.irflImage)), task.type, task.phrase, task.definitions,
            task.category, task.id, task.correctCategory, task.hint, task.serverData, task.groupID, task.secondaryCategory, task.correctSecondaryCategory)
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
        return this.type === 'simile' ? (this.category !== ImageCategoriesEnum.Default && this.secondaryCategory !== SimilesConceptsCategoriesEnum.Default)
            : this.category !== ImageCategoriesEnum.Default;
    }

    isClassifiedCorrect() {
        if (this.isClassified()){
            if (this.type === 'simile') {
                return this.category === this.correctCategory && this.secondaryCategory === this.correctSecondaryCategory;
            } else {
                return this.category === this.correctCategory;
            }
        }
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
        this.secondaryCategory = SimilesConceptsCategoriesEnum.Default;
    }

    getJSON() {
        return {...this};
    }

    getSolveFormat() {
        return this.getJSON();
    }
}