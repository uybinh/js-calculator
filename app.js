// Display of the calculator
const displayTextContent = document.querySelector('#display-text')

// Initial value
let previousNumber
let currentNumber = 0
let operator
let result = 0
let isEqualClicked
// Buttons
const numberButtons = document.querySelectorAll('.number')
const operatorButtons = document.querySelectorAll('.operator.function')
const equalButton = document.querySelector('#equal')
const dotButton = document.querySelector('#dot')
const clearButton = document.querySelector('#clear')
const altClearButton = document.querySelector('#alt-clear')

// Show number on display and get currentNumber when click button
for (let i = 0; i < numberButtons.length; i++) {
  let button = numberButtons[i]
  button.addEventListener('click', event => {
    if (isEqualClicked) return
    currentNumber += event.target.textContent
    currentNumber = Number(currentNumber)
    displayTextContent.textContent = currentNumber
  })
}

// Other buttons
equalButton.addEventListener('click', showResult)
clearButton.addEventListener('click', clear)
altClearButton.addEventListener('click', altClear)
dotButton.addEventListener('click', event => {
  if (Math.floor(currentNumber) === currentNumber) {
    currentNumber += event.target.textContent
    displayTextContent.textContent = currentNumber
  }
})
// Set type of operator and set previousNumber
for (let i = 0; i < operatorButtons.length; i++) {
  operatorButtons[i].addEventListener('click', registerOperator)
}

function registerOperator (event) {
  if (operator) {
    result = calculate(operator, previousNumber, currentNumber)
    displayTextContent.textContent = (Math.floor(result) === result) ? result : result.toFixed(2)
    currentNumber = result
  }
  operator = event.target.dataset.key
  previousNumber = currentNumber
  currentNumber = 0
  isEqualClicked = false
}

// Show number on display when press number on keyboard
addEventListener('keydown', event => {
  if (event.key.search(/[0-9]/) !== -1) {
    currentNumber += event.key
    currentNumber = Number(currentNumber)
    displayTextContent.textContent = currentNumber
  }
})

function calculate (operator, num1, num2) {
  switch (true) {
    case operator === 'plus':
      return add(num1, num2)
    case operator === 'subtract':
      return subtract(num1, num2)
    case operator === 'multiply':
      return multiply(num1, num2)
    case operator === 'devide':
      return devide(num1, num2)
  }
}

function add (a, b) {
  return a + b
}

function subtract (a, b) {
  return a - b
}

function multiply (a, b) {
  return a * b
}

function devide (a, b) {
  if (b === 0) return 'ERROR!'
  return a / b
}

function showResult () {
  result = calculate(operator, previousNumber, currentNumber)
  if (!result) result = Number(displayTextContent.textContent)
  if (typeof result !== 'string') {
    displayTextContent.textContent = (Math.floor(result) === result) ? result : result.toFixed(2)
    currentNumber = result
  } else {
    displayTextContent.textContent = result
    previousNumber = 0
    currentNumber = 0
  }
  operator = null
  isEqualClicked = true
}

function clear () {
  currentNumber = 0
  displayTextContent.textContent = 0
  isEqualClicked = false
}

function altClear () {
  previousNumber = 0
  currentNumber = 0
  operator = null
  displayTextContent.textContent = 0
  isEqualClicked = false
}
