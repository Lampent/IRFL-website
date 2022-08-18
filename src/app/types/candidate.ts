import {IRFLImage} from './IRFLImage';

export class Candidate extends IRFLImage {
    answer: boolean;
    userChoice: boolean;

    constructor(image: string, name, answer: boolean = false, userChoice: boolean = false) {
        super(image, name);
        this.answer = answer;
        this.userChoice = userChoice;
    }
}
