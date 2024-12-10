export const subString = (str) => {
  let firstStr = str?.substring(0, 5);
  let lastStr = str?.substring(str.length - 5);
  let res = firstStr + "....." + lastStr;
  return res;
};
