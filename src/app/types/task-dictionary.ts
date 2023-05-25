import {Candidate} from './candidate';
import {IRFLTask} from './irfl-task';
import {ImageClassificationTask} from './image-classification-task';
import {IRFLImage} from './IRFLImage';

const guessTheAssociationsDictionary: Map<string, IRFLTask> = new Map<string, IRFLTask>()
const assetsImgPath = '/assets/img/';
const defaultCue = 'idiom';
export const imageClassificationExampleTask = new ImageClassificationTask(new IRFLImage(assetsImgPath + 'slow-snail.jpeg', 'slow-snail'),'simile',
    'as slow as snail');

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

guessTheAssociationsDictionary.set('metaphor', new IRFLTask('simile', [
        new Candidate('https://d3f6n9ckq6wheg.cloudfront.net/36744670862470155497506491464655066946444157754124231517934597776014629841407.jpeg','answer_1', true),
        new Candidate('https://d3f6n9ckq6wheg.cloudfront.net/52288967107188279750550127343755254242956664383648015428849282822431101617588.jpeg', 'random_1'),
        new Candidate('https://d3f6n9ckq6wheg.cloudfront.net/111273200017433720975817290298617695688707084380559820045777847633001713148558.jpeg', 'random_3'),
        new Candidate('https://d3f6n9ckq6wheg.cloudfront.net/1449179304419101242365574356623624414168632003493781599709689619578193643031.jpeg', 'random_2'),
    ],
    'Heart of gold', 1))

guessTheAssociationsDictionary.set('simile', new IRFLTask('simile', [
    new Candidate('https://d3f6n9ckq6wheg.cloudfront.net/105794735729343558758791773159209313980420667188564839483272499642914406345873.jpeg','random_1'),
        new Candidate('https://d3f6n9ckq6wheg.cloudfront.net/70943955354752672470954323413718219290641183553464951812863941201688356128994.jpeg', 'random_2'),
        new Candidate('https://d3f6n9ckq6wheg.cloudfront.net/35585095411820107275112939303214814215267273998842620789697502632451909082380.jpeg', 'random_3'),
        new Candidate('https://d3f6n9ckq6wheg.cloudfront.net/4430939744430221964616925504651660373662400747811679665458586737286802240835.jpeg', 'answer_2', true),
    ],
    'The car is as fast as a cheetah', 1))

guessTheAssociationsDictionary.set('idiom', new IRFLTask('idiom', [
        new Candidate('https://d3f6n9ckq6wheg.cloudfront.net/66020487709109997092215777699719991374741530395205454421118838028195257364402.jpeg', 'random_1'),
        new Candidate('https://d3f6n9ckq6wheg.cloudfront.net/24885222685426153086889657229090037687514005093093887827369836047343411742552.jpeg','random_2'),
        new Candidate('https://d3f6n9ckq6wheg.cloudfront.net/43961378535185985650180900584580673046708862632076695614527595777841577655561.jpeg','answer_1', true),
        new Candidate('https://d3f6n9ckq6wheg.cloudfront.net/87000359395187297123922380769873951446814264510785151267015015874517313800304.jpeg', 'random_3'),
    ],
    'Up a tree', 1, ['Cornered', 'At a loss', 'In or into a disadvantaged or difficult situation']));
