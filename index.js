let board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]];
let range = {
    rangeOne: [0, 1, 2],
    rangeTwo: [3, 4, 5],
    rangeThree: [6, 7, 8]
};
const asd = function() {
    for(let i=0; i<board.length;i++) {
        if(i+2 < 9) {
            if(i == 0 || i % 3 == 0) {
                logic(i, i+1, i+2);
                logic(i, i+2, i+1);
                logic(i+1, i+2, i);
                // logic(3, 5, 4);
            }
        }
    }
    console.log('board', board);
};

function logic(x, y, z) {
    let duplicate = findCommonElements(board[x], board[y]);
    duplicate.firstElementIndex = `${x}${duplicate.a}`;
    duplicate.secondElementIndex = `${y}${duplicate.b}`;
    if(duplicate && duplicate.result) {
        // console.log('duplicate', duplicate);
        let possibilities = getRangeForC(duplicate);
        let indexes = range[possibilities];

        // check if element present in row
        let alreadyPresentInRow = false;
        for(j=0;j<=8;j++) {
            if(board[z][j] === duplicate.value) {
                alreadyPresentInRow = true;
            }
        }

        if(!alreadyPresentInRow) {
            let temp = {};
            indexes.forEach((item) => {
                temp[item] = '.';
                if(board[z][item] === '.') {
                    for(j=0;j<9;j++) {
                        if(board[j][item] == duplicate.value) {
                            temp[item] = '*';
                        }
                    }
                } else {
                    temp[item] = '*';
                }
            });
            // console.log('temp', temp);
            let count = 0, indexToSave = 0;
            for(let key in temp) {
                if(temp[key] == '*') {
                    count++;
                } else {
                    indexToSave = key;
                }
            }
            if(count == 2) {
                console.log('x', x);
                console.log('y', y);
                console.log('z', z);
                console.log('added ', duplicate.value, 'in ', `${z}${indexToSave}`);
                board[z][indexToSave] = duplicate.value;
            }
        }
        return;
    }
}

function getRangeForC({a, b}) {
    let checkRange = {
        rangeOne: false,
        rangeTwo: false,
        rangeThree: false 
    };
    if(a < 3 || b < 3) {
        checkRange.rangeOne = true;
    } 
    if(a >= 3 && a < 6 || b >= 3 && b < 6) {
        checkRange.rangeTwo = true;
    } 
    if(a >= 6 && a < 9 || b >= 6 && b < 9) {
        checkRange.rangeThree = true;
    }
    for(var i in checkRange) {
        if(checkRange[i] === false) {
            return i;
        }
    }
};

function findCommonElements(arr1, arr2) {
    let obj = {}; 
    if(arr1  !== undefined && arr2 !== undefined) {
        for (let i = 0; i < arr1.length; i++) { 
            if(!isNaN(arr1[i]) && !obj[arr1[i]]) { 
                const element = arr1[i]; 
                obj[element] = {
                    result: true,
                    value: element,
                    index: i
                }; 
            } 
        } 
        for (let j = 0; j < arr2.length ; j++) { 
            if(obj[arr2[j]] && obj[arr2[j]].result) { 
                return {
                    result: true,
                    value: obj[arr2[j]].value,
                    a: obj[arr2[j]].index,
                    b: j,
                }; 
            } 
        } 
        return {
            result: false,
            value: null,
        }; 
    }
}

asd();


function combo() {
}