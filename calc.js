
const calculator = {
   displayValue: "0",
   firstOperand: null,
   waitingForSecondOperand: false,
   operator: null,
};

//console.log('START');
//console.log(calculator);

function inputDigit(digit) {
   const { displayValue, waitingForSecondOperand } = calculator;

   if (waitingForSecondOperand === true) {
       calculator.displayValue = digit;
       calculator.waitingForSecondOperand = false;
   } else {
       calculator.displayValue = displayValue === "0" ? digit : displayValue + digit;
   }
}

function inputDecimal(dot) {
   if (calculator.waitingForSecondOperand === true) {
       calculator.displayValue = "0.";
       calculator.waitingForSecondOperand = false;
       return;
   }

   if (!calculator.displayValue.includes(dot)) {
       calculator.displayValue += dot;
   }
}

function handleOperator(nextOperator) {
   const { firstOperand, displayValue, operator } = calculator;
   const inputValue = parseFloat(displayValue);

   if (operator && calculator.waitingForSecondOperand) {
       calculator.operator = nextOperator;
       return;
   }

   if (firstOperand == null && !isNaN(inputValue)) {
       calculator.firstOperand = inputValue;
   } else if (operator) {
       const result = calculate(firstOperand, inputValue, operator);

       calculator.displayValue = String(result);
       calculator.firstOperand = result;
   }

   calculator.waitingForSecondOperand = true;
   calculator.operator = nextOperator;
}

function calculate(firstOperand, secondOperand, operator) {
   if (operator === "+") {
       return firstOperand + secondOperand;
   } else if (operator === "-") {
       return firstOperand - secondOperand;
   } else if (operator === "*") {
       return firstOperand * secondOperand;
   } else if (operator === "/") {
       return firstOperand / secondOperand;
   } else if (operator === "^") {
       return Math.pow(firstOperand, secondOperand);
   } else if (operator === "sqrt") {
       return Math.sqrt(firstOperand);
   }

   return secondOperand;
}

function handleFunction(func) {
   const { displayValue } = calculator;
   const inputValue = parseFloat(displayValue);

   let result;
   if (func === "sin") {
       result = Math.sin((inputValue * Math.PI) / 180); // Convert degrees to radians
   } else if (func === "cos") {
       result = Math.cos((inputValue * Math.PI) / 180); // Convert degrees to radians
   } else if (func === "tan") {
       result = Math.tan((inputValue * Math.PI) / 180); // Convert degrees to radians
   } else if (func === "log") {
       result = Math.log10(inputValue);
   } else if (func === "ln") {
       result = Math.log(inputValue);
   }

   calculator.displayValue = result !== undefined ? String(result) : "Error";
   calculator.waitingForSecondOperand = true;
}

function resetCalculator() {
   calculator.displayValue = "0";
   calculator.firstOperand = null;
   calculator.waitingForSecondOperand = false;
   calculator.operator = null;
}

function updateDisplay() {
   const display = document.querySelector("#main-screen");
   display.value = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector(".calculator-keys");
keys.addEventListener("click", (event) => {
   const { target } = event;

   if (!target.matches("button")) {
       return;
   }

   if (target.classList.contains("operator")) {
       // Special handling for square root function
       if (target.value === "sqrt") {
           const result = calculate(parseFloat(calculator.displayValue), null, "sqrt");
           calculator.displayValue = String(result);
           calculator.waitingForSecondOperand = true;
           updateDisplay();
           return;
       }

       handleOperator(target.value);
       updateDisplay();
       return;
   }

   if (target.classList.contains("function")) {
       handleFunction(target.value);
       updateDisplay();
       return;
   }

   if (target.classList.contains("decimal")) {
       inputDecimal(target.value);
       updateDisplay();
       return;
   }

   if (target.classList.contains("all-clear")) {
       resetCalculator();
       updateDisplay();
       return;
   }

   inputDigit(target.value);
   updateDisplay();
});

