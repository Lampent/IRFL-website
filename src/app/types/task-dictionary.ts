import {Candidate} from './candidate';
import {IRFLTask} from './irfl-task';

const guessTheAssociationsDictionary: Map<string, IRFLTask> = new Map<string, IRFLTask>()
const assetsImgPath = '/assets/img/';
const defaultCue = 'example-1';


export const createQualificationIndexIDMap = new Map();
createQualificationIndexIDMap.set(1, 'ablation_1');
createQualificationIndexIDMap.set(2, 'ablation_2');
createQualificationIndexIDMap.set(3, 'ablation_3');
createQualificationIndexIDMap.set(4, 'ablation_4');
createQualificationIndexIDMap.set(5, 'ablation_5');
createQualificationIndexIDMap.set(6, 'ablation_6');
createQualificationIndexIDMap.set(7, 'ablation_7');
createQualificationIndexIDMap.set(8, 'ablation_8');
createQualificationIndexIDMap.set(9, 'ablation_9');
createQualificationIndexIDMap.set(10, 'ablation_10');

export const solveQualificationIndexIDMap = new Map();
solveQualificationIndexIDMap.set(1, '16');
solveQualificationIndexIDMap.set(2, '11');
solveQualificationIndexIDMap.set(3, '18');
solveQualificationIndexIDMap.set(4, '8');
solveQualificationIndexIDMap.set(5, '1');
solveQualificationIndexIDMap.set(6, '24');
solveQualificationIndexIDMap.set(7, '25');
solveQualificationIndexIDMap.set(8, '30');
solveQualificationIndexIDMap.set(9, '37');
solveQualificationIndexIDMap.set(10, '39');

export const createExampleIndexIDMap = new Map();



export const irflExampleIndexIDMap = new Map();




export function getIRFLTask(figurativePhrase): IRFLTask {
    if (guessTheAssociationsDictionary.has(figurativePhrase)) {
        console.log(`Loading ${figurativePhrase} task`)
        return IRFLTask.clone(guessTheAssociationsDictionary.get(figurativePhrase));
    }
    return IRFLTask.clone(guessTheAssociationsDictionary.get(defaultCue))
}

// Guess the associations

// examples

guessTheAssociationsDictionary.set('example-1', new IRFLTask([
    new Candidate(assetsImgPath + 'very-hot.jpeg','random_1'),
        new Candidate(assetsImgPath + 'round-item.jpeg', 'random_2'),
        new Candidate(assetsImgPath + 'slow-snail.jpeg', 'answer_1', true),
        new Candidate(assetsImgPath + 'man-riding-horse.jpeg', 'random_3'),
        new Candidate(assetsImgPath + 'speed-limit.jpeg', 'answer_2', true),
    ],
    'as slow as snail', 2))
