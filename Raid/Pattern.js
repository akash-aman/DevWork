const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');
const random = require('random');
const FILE_PATH = './data.json';


const msg = "developer".toLowerCase();

const pattern = new Map([
    ['d',(x,y)=>([

        [x+0,y], [x+0,y+1], 
        [x+1,y],          [x+1,y+2],
        [x+2,y],          [x+2,y+2],
        [x+3,y],          [x+3,y+2],
        [x+4,y], [x+4,y+1]

    ])],


    ['e',(x,y)=>([
        
        [x+0,y+0], [x+0,y+1], [x+0,y+2],
        [x+1,y+0], 
        [x+2,y+0], [x+2,y+1], [x+2,y+2],
        [x+3,y+0], 
        [x+4,y+0], [x+4,y+1], [x+4,y+2]

    ])],
    
    ['v',(x,y)=>([
        
        [x+0,y+0],            [x+0,y+2],
        [x+1,y+0],            [x+1,y+2],
        [x+2,y+0],            [x+2,y+2],
        [x+3,y+0],            [x+3,y+2],
                   [x+4,y+1]

    ])],

    ['l',(x,y)=>([
        
        [x+0,y+0], 
        [x+1,y+0], 
        [x+2,y+0], 
        [x+3,y+0], 
        [x+4,y+0], [x+4,y+1], [x+4,y+2]

    ])],
    ['o',(x,y)=>([
        
                   [x+0,y+1], 
        [x+1,y+0],            [x+1,y+2],
        [x+2,y+0],            [x+2,y+2],
        [x+3,y+0],            [x+3,y+2],
                   [x+4,y+1]

    ])],

    ['p',(x,y)=>([
        
        [x+0,y+0], [x+0,y+1], [x+0,y+2],
        [x+1,y+0],            [x+1,y+2],
        [x+2,y+0], [x+2,y+1], [x+2,y+2],
        [x+3,y+0], 
        [x+4,y+0], 

    ])],
    ['r',(x,y)=>([

        [x+0,y+0], [x+0,y+1], 
        [x+1,y+0],            [x+1,y+2],
        [x+2,y+0], [x+2,y+1], 
        [x+3,y+0],            [x+3,y+2],
        [x+4,y+0],            [x+4,y+2]

    ])]

])

let finalSet = [] 


const patternGenerator = (msg) => {

    if(msg.length > 13){
        return
    } 
    let start = Math.floor( 27 - (msg.length * 2 )) - 1
    const end = Math.ceil( 27 + (msg.length * 2 )) - 1
    const letters = [...msg] 
    let i = 0; 
    while(start < end){
        wordWritter(start,letters[i]);
        i += 1;
        start += 4;
    }

}

const wordWritter = (start,letter) => {
    markArray = pattern.get(`${letter}`)(3,start);
    //console.log(markArray);
    let m = 0;
    while(m < markArray.length){
        finalSet.push([markArray[m][1],markArray[m][0]]);
        //makeCommit(markArray[m][1],markArray[m][0],letter);
        m+=1;
        
    }
    //console.log('set 1')
  return
}
patternGenerator(msg);

//console.log(finalSet);
const recursionTime = finalSet.length;


const makeCommit = (n) => {
    if (n == 0) return simpleGit().push();

    const x = finalSet[finalSet.length-n][0];
    const y = finalSet[finalSet.length-n][1];
    const DATE = moment().add(1, 'd').add(x, 'w').add(y, 'd').format();


    const data = {
        date: DATE
    }

    console.log(`x : ${x} & y : ${y} `)
    console.log(DATE);
    jsonfile.writeFile(FILE_PATH, data, () => {
        simpleGit().add([FILE_PATH]).commit(DATE, { '--date': DATE }, makeCommit.bind(this, --n));   
    });
}

makeCommit(recursionTime);
