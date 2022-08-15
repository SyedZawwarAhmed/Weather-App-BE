const date = new Date();
const hours = date.getHours();
const remainder = hours % 3;
const result = remainder === 0 ? hours : remainder === 1 ? hours - 1 : hours + 1;
console.log("🚀 ~ file: test.js ~ line 6 ~ result", result)
