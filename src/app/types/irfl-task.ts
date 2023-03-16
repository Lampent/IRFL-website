import {Candidate} from './candidate';
import {Jsonable} from './jsonable';
import {IRFLFigureOfSpeechType} from './irfl-figure-of-speech.type';
import {QUERIES_BLACKLIST} from '../../assets/constants';

export class IRFLTask implements Jsonable {
    id: string = '';
    candidates: Candidate[];
    phrase: string;
    numOfSolution: number;
    definitions: string[];
    serverData: any;
    type: IRFLFigureOfSpeechType;

    constructor(type: IRFLFigureOfSpeechType, candidates: Candidate[], phrase: string = '', numOfSolution: number = 0, definitions: string[] = [], serverData: any = {}, id = '') {
        this.type = type;
        this.id = id;
        this.candidates = candidates;
        this.phrase = phrase;
        this.definitions = definitions.filter((query: string) => !QUERIES_BLACKLIST.includes(query.toLowerCase())).map(this.capitalizeFirstLetter);
        this.numOfSolution = numOfSolution;
        this.serverData = serverData;
    }


    static clone(task: IRFLTask) {
        return new IRFLTask(task.type, JSON.parse(JSON.stringify(task.candidates)), task.phrase, task.numOfSolution, task.definitions, task.serverData, task.id)
    }

    static jaccard_similarity(list1: string[], list2: string[]): number {
        const intersection = list1.filter(item => list2.includes(item));
        return Number((((intersection.length) / (new Set([...list1, ...list2])).size) * 100).toFixed(0));
    }

    init() {
        this.clearCandidates()
    }

    capitalizeFirstLetter(sentence) {
        try {
            return sentence.charAt(0).toUpperCase() + sentence.slice(1);
        } catch (e) {
            return sentence
        }
    }

    isTaskSolved(mturk = false) {
        if (mturk) {
            return this.numberOfChosenCandidates() === this.numOfSolution;
        }
        return !this.candidates.map((candidate: Candidate) => candidate.userChoice === candidate.answer).includes(false)
    }

    getHint(game = false) {
        if (this.isTaskSolved()) {
            return '';
        } else {
            if (this.numberOfChosenCandidates() !== this.numOfSolution) {
                return 'Please choose ' + this.numOfSolution + ' candidates';
            } else if (!game) {
                return 'Candidates should visualize the figurative phrase ' + this.phrase;
            }
        }
    }

    clearCandidates() {
        this.candidates.forEach((candidate: Candidate) => candidate.userChoice = false);
    }

    numberOfChosenCandidates() {
        return this.candidates.map((candidate: Candidate) => candidate.userChoice).filter((elem) => elem).length;
    }

    getJSON() {
        return {...this};
    }

    getUserChoices() {
        return this.candidates.filter((candidate) => candidate.userChoice).map(candidate => candidate.name)
    }

    getLabels() {
        return this.candidates.filter(candidate => candidate.answer).map(candidate => candidate.name)
    }

    getSolveFormat() {
        const userChoice = this.getUserChoices();
        const labels = this.getLabels();
        return {
            association_id: this.id,
            associations: this.candidates.map(candidate => candidate.name),
            candidates: this.candidates.map(candidate => candidate.name),
            user_predictions: userChoice, // add
            labels, // add
            jaccard: IRFLTask.jaccard_similarity(userChoice, labels), // add
            cue: this.phrase, // add
            type: 'solve_game'
        }
    }
}