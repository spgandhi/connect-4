export const existsIn2DArray = (array: number[][], cellName: number[]) => {
  return array.find(
    (element) => element[0] === cellName[0] && element[1] === cellName[1]
  );
};