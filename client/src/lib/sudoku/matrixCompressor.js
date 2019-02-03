const _ROW_KEY = 'row';
const _VALUE_SEPARATOR = ',';

module.exports.compress = (matrix) => {
  // create storage for the compressed matrix
  let compressedMatrix = '';

  // iterate through each row in the matrix
  matrix.forEach((row, index) => {
    // create storage for the compressed row
    let compressedRow = '';

    // for each value in the row
    row.forEach(value => {
      if (value === '') {
        compressedRow += _VALUE_SEPARATOR;
      } else {
        compressedRow += value + _VALUE_SEPARATOR;
      }
    });
    // add the compressed row with the 
    compressedMatrix += compressedRow + _ROW_KEY;
  });

  // return the compressed matrix string
  return compressedMatrix;
};

module.exports.decompress = (compressedMatrix) => {
  let splitCompressed = compressedMatrix.split(`${_VALUE_SEPARATOR}${_ROW_KEY}`);

  let decompressedMatrix = splitCompressed.map((row, index) => {
    if (index === splitCompressed.length - 1) {
      let endSplitValue = row.split(_VALUE_SEPARATOR).slice(0, -1);
      console.log('decompressing last row: ', endSplitValue);
      return endSplitValue;
    }
    return row.split(_VALUE_SEPARATOR);
  });

  return decompressedMatrix;
};

// function compressMatrix(matrix, key) {
//   let compressedMatrix = '';
//   matrix.forEach((row, index) => {
//     let compressedRow = '';
//     let compressedEnd = index === matrix.length - 1 ? '' : 'row';
//     row.forEach((value, column) => {
//       if (value === '') {
//         compressedRow += key;
//       } else {
//         compressedRow += value + key;
//       }
//     });
//     compressedMatrix += compressedRow + compressedEnd;
//   })
//   return compressedMatrix;
// }

// function decompressMatrix(compressedMatrix, key) {
//   let splitCompressed = compressedMatrix.split(',row');
//   console.log(splitCompressed);
//   let decompressedMatrix = splitCompressed.map((row, index) => {
//     if (index === splitCompressed.length - 1) {
//       return row.split(key).slice(0, -1);
//     }
//     return row.split(key);
//   });
//   return decompressedMatrix;
// }

// var easy = [
//   ['', '', '', '', '', '8', '', '', '4'],
//   ['', '8', '4', '', '1', '6', '', '', ''],
//   ['', '', '', '5', '', '', '1', '', ''],
//   ['1', '', '3', '8', '', '', '9', '', ''],
//   ['6', '', '8', '', '', '', '4', '', '3'],
//   ['', '', '2', '', '', '9', '5', '', '1'],
//   ['', '', '7', '', '', '2', '', '', ''],
//   ['', '', '', '7', '8', '', '2', '6', ''],
//   ['2', '', '', '3', '', '', '', '', '']
// ];

// var easyResult = compressMatrix(easy, ',');

// console.log('easyResult: ', easyResult);

// var medium = [
//   ['', '', '', '', '9', '', '', '1', '3'],
//   ['', '', '', '5', '', '3', '', '4', ''],
//   ['9', '4', '', '', '', '', '7', '', '2'],
//   ['', '', '4', '8', '', '', '', '', ''],
//   ['6', '', '', '9', '', '2', '', '', '8'],
//   ['', '', '', '', '', '6', '4', '', ''],
//   ['3', '', '5', '', '', '', '', '2', '7'],
//   ['', '7', '', '3', '', '8', '', '', ''],
//   ['4', '6', '', '', '5', '', '', '', '']
// ];

// var mediumResult = compressMatrix(medium, ',');

// console.log('mediumResult: ', mediumResult);

// var hard = [
//   ['4', '', '5', '', '', '8', '', '2', ''],
//   ['', '', '', '1', '', '', '', '', ''],
//   ['', '2', '', '', '6', '7', '', '9', ''],
//   ['', '', '8', '', '', '', '', '3', ''],
//   ['5', '', '6', '', '', '', '2', '', '1'],
//   ['', '1', '', '', '', '', '4', '', ''],
//   ['', '8', '', '9', '7', '', '', '6', ''],
//   ['', '', '', '', '', '1', '', '', ''],
//   ['', '9', '', '8', '', '', '5', '', '7']
// ];

// var hardResult = compressMatrix(hard, ',');

// console.log('hardResult: ', hardResult);

