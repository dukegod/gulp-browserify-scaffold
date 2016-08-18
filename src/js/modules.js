/**
 * Created by hui on 16/6/5.
 */

// export function
export function sum(num1, num2) {
  return num1 + num2;
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
export { multiply, subtract };



