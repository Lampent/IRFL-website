import {Candidate} from './candidate';
import {Jsonable} from './jsonable';
import {TaskTypeEnum} from './task-type.enum';

export class IRFLTask implements Jsonable {
    id: string = '';
    candidates: Candidate[];
    phrase: string;
    numOfSolution: number;
    definitions: string[];

    constructor(candidates: Candidate[], phrase: string = '', numOfSolution: number = 0, definitions: string[] = [], id = '') {
        this.id = id;
        this.candidates = candidates;
        this.phrase = phrase;
        this.definitions = definitions;
        this.numOfSolution = numOfSolution;
    }


    static clone(task: IRFLTask) {
        return new IRFLTask(JSON.parse(JSON.stringify(task.candidates)), task.phrase, task.numOfSolution, task.definitions, task.id)
    }

    static jaccard_similarity(list1: string[], list2: string[]): number {
        const intersection = list1.filter(item => list2.includes(item));
        return Number((((intersection.length) / (new Set([...list1, ...list2])).size) * 100).toFixed(0));
    }

    init() {
        this.clearCandidates()
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

    getUUID() {
        return this.candidates.map(candidate => candidate.img).sort().join('-') + '-' + this.phrase;
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
        // "association_id": 1,
        //     "candidates": ["bear", "bee", "bride", "drums", "hockey"],
        //     "labels": ["bear", "bee"],
        //     "user_predictions": ["bride", "bee"],
        //     "jaccard": 33,
        //     "cue": "RONRONRON",
        //     "type": "solve_game"
    }
}