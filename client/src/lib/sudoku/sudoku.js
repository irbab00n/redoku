// const checkGrid = (grid) => {
//   const _UNIQUE_NUMBERS = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
//   /* 
//     Did the solution pass valid rules of Sudoku?
//     NOTE: Will show true if not completed but entered solution passes rules of Sudoku
//   */
//   let testResult = true; 
//   /*
//     Did the user solve the puzzle?
//     NOTE: Because the testResult can produce a false-positive, we need to also know
//           if the user completed the puzzle
//   */
//   let completed = true; 
  
//   /* Test the horizontal entries for validity */
//   const testRows = () => {
//     /* For each row in the grid */
//     grid.forEach(row => {
//       /* Create a new set to compare against */
//       let requiredNumbers = new Set(_UNIQUE_NUMBERS);
//       /* Iterate through every entry in the row */
//       for (let i = 0; i < row.length; i++) {
//         /* If the entry is empty */
//         if (row[i] === '') {
//           /* The puzzle is not complete */
//           completed = false;
//           continue;
//         } else {
//           /* If not empty, check if the required numbers set still has the current entry  */
//           if (requiredNumbers.has(row[i])) {
//             /* If so, delete it from the required numbers set */
//             requiredNumbers.delete(row[i]);
//           } else {
//             /* 
//               If the required numbers set doesn't have the current entry,
//               it has already been deleted and we have found a duplicate entry
//             */
//             testResult = false;
//           }
//         }
//       }
//     });
//   };

//   /* Test the vertical columns of the grid */
//   const testColumns = (gridToTest) => {
//     /**
//      * Set a size limit equal to the size of the passed in grid
//      * @todo - Remove this variable
//      */
//     let size = grid.length;
//     /**
//      * Set a default column size to 0
//      */
//     let column = 0;

//     /**
//      * While we haven't iterated past the total number of columns in the grix
//      * @todo - Refactor size to gridToTest
//      */
//     while (column < size) {

//       /**
//        * Create a new Set using the global _UNIQUE_NUMBERS
//        */
//       let requiredNumbers = new Set(_UNIQUE_NUMBERS);

//       /**
//        * Create a new Set using the global _UNIQUE_NUMBERS
//        */
//       for (let row = 0; row < size; row++) {
//         /**
//          * Because we need to select the column 
//          * @todo - Refactor grid to gridToTest
//          */
//         let entry = grid[row][column];
//         if (entry === '') {
//           completed = false;
//           continue;
//         } else {
//           if (requiredNumbers.has(entry) === true) {
//             requiredNumbers.delete(entry);
//           } else {
//             testResult = false;
//             column = size;
//           }
//         }
//       }
//       column++;
//     }

//     testRows();
//     testColumns();
//     testGrids(cutGridsFromBlocks(cutBlocksFromGrid()));
//     return {testResult, completed};
//   };

//   const cutBlocksFromGrid = () => {
//     let blocks = [];
//     for (let i = 0; i < grid.length; i+=3) {
//       let block = [];
//       block.push(grid[i]);
//       block.push(grid[i + 1]);
//       block.push(grid[i + 2]);
//       blocks.push(block);
//     }
//     return blocks;
//   };

//   const cutGridsFromBlocks = (blocks) => {
//     let grids = [];
//     const cut = (rBlocks) => {
//       if (rBlocks[0].length === 0) {
//         return;
//       }
//       let rGrid = [];
//       rGrid[0] = rBlocks[0].splice(0, 3);
//       rGrid[1] = rBlocks[1].splice(0, 3);
//       rGrid[2] = rBlocks[2].splice(0, 3);
//       grids.push(rGrid);
//       cut(rBlocks);
//     };
//     blocks.forEach(block => {
//       cut(block);
//     });
//     return grids;
//   };

//   const testGrids = (grids) => {
//     grids.forEach(threeGrid => {
//       let set = new Set(_UNIQUE_NUMBERS);
//       let size = threeGrid.length;
//       let column = 0;
//       while(column < size) {
//         for (let i = 0; i < size; i++) {
//           if (threeGrid[i][column] === '') {
//             completed = false;
//             continue;
//           } else {
//             if (set.has(threeGrid[i][column])) {
//               set.delete(threeGrid[i][column]);
//             } else {
//               testResult = false;
//               column = size;
//             }
//           }
//         }
//         column++;
//       }
//     });
//   };

//   testRows();
//   testColumns();
//   testGrids(cutGridsFromBlocks(cutBlocksFromGrid()));
//   return {testResult, completed};
// }

// module.exports.checkGrid = checkGrid;

const checkGrid = (grid) => {
  let range = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  let testResult = true;
  let completed = true;
  
  const testRows = () => {
    grid.forEach(row => {
      let set = new Set(range);
      for (let i = 0; i < row.length; i++) {
        if (row[i] === '') {
          completed = false;
          continue;
        } else {
          if (set.has(row[i])) {
            set.delete(row[i]);
          } else {
            testResult = false;
          }
        }
      }
    });
  };

  const testColumns = () => {
    let size = grid.length;
    let column = 0;
    while(column < size) {
      let set = new Set(range);
      for (let i = 0; i < size; i++) {
        if (grid[i][column] === '') {
          completed = false;
          continue;
        } else {
          if (set.has(grid[i][column]) === true) {
            set.delete(grid[i][column]);
          } else {
            testResult = false;
            column = size;
          }
        }
      }
      column++;
    }
  };

  const cutBlocksFromGrid = () => {
    let blocks = [];
    for (let i = 0; i < grid.length; i+=3) {
      let block = [];
      block.push(grid[i]);
      block.push(grid[i + 1]);
      block.push(grid[i + 2]);
      blocks.push(block);
    }
    return blocks;
  };

  const cutGridsFromBlocks = (blocks) => {
    let grids = [];
    const cut = (rBlocks) => {
      if (rBlocks[0].length === 0) {
        return;
      }
      let rGrid = [];
      rGrid[0] = rBlocks[0].splice(0, 3);
      rGrid[1] = rBlocks[1].splice(0, 3);
      rGrid[2] = rBlocks[2].splice(0, 3);
      grids.push(rGrid);
      cut(rBlocks);
    };
    blocks.forEach(block => {
      cut(block);
    });
    return grids;
  };

  const testGrids = (grids) => {
    grids.forEach(threeGrid => {
      let set = new Set(range);
      let size = threeGrid.length;
      let column = 0;
      while(column < size) {
        for (let i = 0; i < size; i++) {
          if (threeGrid[i][column] === '') {
            completed = false;
            continue;
          } else {
            if (set.has(threeGrid[i][column])) {
              set.delete(threeGrid[i][column]);
            } else {
              testResult = false;
              column = size;
            }
          }
        }
        column++;
      }
    });
  };

  testRows();
  testColumns();
  testGrids(cutGridsFromBlocks(cutBlocksFromGrid()));
  return {testResult, completed};
}

module.exports.checkGrid = checkGrid;