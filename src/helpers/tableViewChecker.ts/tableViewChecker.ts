export const isOneTable = (result: object): boolean => {
  let collectionOfLengths: number[] = [];
  for (const [key, value] of Object.entries(result)) {
    collectionOfLengths.push((value as []).length);
  }
  return collectionOfLengths.every((item) => item === collectionOfLengths[0]);
};

export const makeOneTable = (result: any): any[] => {
  let returnTable = [];
  const contentKey = Object.keys(result);
  for (let i = 0; i < result[contentKey[0]].length; i++) {
    let tempObj = {};
    for (let key of contentKey) {
      tempObj = { ...tempObj, ...result[key][i] };
    }
    returnTable.push(tempObj);
  }
  return returnTable;
};

export const areHeadersSame = (result: object[]): boolean => {
  if (result.length === 0) return false;
  const firstHeader = Object.keys(result[0]).sort();
  return result.every((item) => Object.keys(item).sort() === firstHeader);
};

export const convertFromArrObjToTwoDArray = (result: object[]) => {
  // if (!areHeadersSame(result)) return;
  let keys = Object.keys(result[0]).sort();
  let retArr = [[...keys]];
  for (let row of result) {
    let currRow: string[] = [];
    keys.forEach((item) => currRow.push((row as any)[item]));
    retArr.push(currRow);
  }
  return retArr;
};

export const convertToTwoDArray = (result: object): string[][] | undefined => {
  // if (!isOneTable(result)) return;
  let tableResult = makeOneTable(result);
  let returnArr = [Object.keys(tableResult[0]).sort()];
  for (let i = 0; i < tableResult.length; i++) {
    let row: string[] = [];
    for (let key of Object.keys(tableResult[0]).sort()) {
      row.push(tableResult[i][key as string]);
    }
    returnArr.push(row);
  }
  return returnArr;
};

export const jsonToTable = (result: object[]): string[][] => {
  let headers = Object.keys(result[0]).sort();
  let returnTable = [headers];
  for (let cnt = 1; cnt < result.length; cnt++) {
    let row = [];
    for (let cnt2 = 0; cnt2 < returnTable[0].length; cnt2++) {
      row.push((result[cnt] as any)[returnTable[0][cnt2]]);
    }
    returnTable.push(row);
  }

  return returnTable;
};
