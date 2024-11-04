let runningTotal = 0;
let buffer = "";
let previousOperator = null;
const screen = document.querySelector("#screen");

const buttonClick = (value) => {
  if (isNaN(parseInt(value)) && value !== ".") {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  screen.innerText = buffer || "0";
};

const handleSymbol = (symbol) => {
  switch (symbol) {
    case "C":
      buffer = "";
      runningTotal = 0;
      previousOperator = null;
      break;
    case "DEL":
      if (buffer.length === 1) {
        buffer = "";
      } else {
        buffer = buffer.slice(0, -1);
      }
      break;
    case "=":
      if (previousOperator === null) return;
      flushOperation(parseFloat(buffer));
      previousOperator = null;
      buffer = String(runningTotal);
      runningTotal = 0;
      break;
    case "+":
    case "−":
    case "×":
    case "÷":
      handleMath(symbol);
      break;
  }
};

const handleMath = (symbol) => {
  if (buffer === "") return;

  const floatBuffer = parseFloat(buffer);
  if (runningTotal === 0) {
    runningTotal = floatBuffer;
  } else {
    flushOperation(floatBuffer);
  }
  previousOperator = symbol;
  buffer = "";
};

const flushOperation = (floatBuffer) => {
  if (previousOperator === "+") {
    runningTotal += floatBuffer;
  } else if (previousOperator === "−") {
    runningTotal -= floatBuffer;
  } else if (previousOperator === "×") {
    runningTotal *= floatBuffer;
  } else if (previousOperator === "÷") {
    runningTotal /= floatBuffer;
  }
};

const handleNumber = (numberString) => {
  if (numberString === "." && buffer.includes(".")) return;

  if (buffer === "" && numberString !== ".") {
    buffer = numberString;
  } else {
    buffer += numberString;
  }
};

const init = () => {
  document
    .querySelector(".buttons")
    .addEventListener("click", function (event) {
      if (event.target.tagName === "BUTTON") {
        buttonClick(event.target.innerText);
      }
    });
};

init();
