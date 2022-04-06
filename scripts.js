const numberBtn = document.querySelectorAll('[data-number]');
const operatorBtn = document.querySelectorAll('[data-operator]');
const equalBtn = document.querySelector('[data-equals]');
const clearBtn = document.querySelector('[data-all-clear]');
const deleteBtn = document.querySelector('[data-delete]');
const previousOperandTxt = document.querySelector('[data-previous-operand]');
const currentOperandTxt = document.querySelector('[data-current-operand]');
let displayCurrent = '';
let displayPrev = '';
let currentOperator = '';

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}
function round(number) {
  return Math.round(number * 1000) / 1000;
}

function operate(operator, num1, num2) {
  const numA = Number(num1);
  const numB = Number(num2);
  if (operator === '+') {
    return add(numA, numB);
  } if (operator === '-') {
    return subtract(numA, numB);
  } if (operator === '*') {
    return multiply(numA, numB);
  } if (operator === '÷') {
    return divide(numA, numB);
  }
  return null;
}

function result() {
  if (!currentOperator) return;
  if (currentOperator === '÷' && currentOperandTxt.textContent === '0') {
    alert('Error! Cant divide by 0!');
    return;
  }
  const num1 = currentOperandTxt.textContent;
  const num2 = displayPrev;
  displayCurrent = round(operate(currentOperator, num2, num1));
  previousOperandTxt.textContent = `${num2} ${currentOperator} ${num1}`;
  currentOperandTxt.textContent = displayCurrent;
}

function disableDot() {
  document.getElementById('dot-button').disabled = true;
}

function getNumber(number) {
  if (displayCurrent.includes('.')) {
    disableDot();
  }
  displayCurrent += number;
  currentOperandTxt.textContent = displayCurrent;
}

numberBtn.forEach((button) => {
  button.addEventListener('click', (e) => {
    getNumber(e.target.textContent);
  });
});

function getOperator(operator) {
  if (currentOperator) result();
  currentOperator = operator;
  displayPrev = displayCurrent;
  previousOperandTxt.textContent = `${displayPrev} ${currentOperator}`;
  displayCurrent = '';
  currentOperandTxt.textContent = '';
}

operatorBtn.forEach((opBtn) => {
  opBtn.addEventListener('click', (e) => {
    getOperator(e.target.textContent);
  });
});
equalBtn.addEventListener('click', result);

function clear() {
  currentOperator = '';
  displayCurrent = '';
  displayPrev = '';
  previousOperandTxt.textContent = '';
  currentOperandTxt.textContent = '';
}

clearBtn.addEventListener('click', clear);

function del() {
  displayCurrent = displayCurrent.toString().slice(0, -1);
  currentOperandTxt.textContent = displayCurrent;
}

deleteBtn.addEventListener('click', del);
