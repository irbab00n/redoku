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