// export data
export var color = "red";
export let name = "Nicholas";
export const magicNumber = 7;

// export function
export function sum(num1, num2) {
  return num1 + num2;
}

// export class
export class Rectangle {
  constructor(length, width) {
    this.length = length;
    this.width = width;
  }
}

// this function is private to the module
function subtract(num1, num2) {
  return num1 - num2;
}

// define a function...
function multiply(num1, num2) {
  return num1 * num2;
}

// ...and then export it later
export { multiply };