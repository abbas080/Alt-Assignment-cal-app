import React from "react";
import { useReducer } from "react";
import OperationBtn from "./OperationBtn";
import DigitBtn from "./DigitBtn";

export const ACTIONS = {
  CHOOSE_DIGIT: "choose-digit",
  OPERATION_SIGN: "operation-sign",
  CLEAR: "clear",
  DELETE: "delete",
  RESULT: "result",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.CHOOSE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      } else if (payload.digit === "0" && state.currentOperand === "0") {
        return state;
      } else if (
        payload.digit === "." &&
        state.currentOperand.includes === "."
      ) {
        return state;
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };
    case ACTIONS.OPERATION_SIGN:
      if (state.currentOperand == null && state.prevOperand === null) {
        return state;
      } else if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      } else if (state.prevOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          prevOperand: state.currentOperand,
          currentOperand: null,
        };
      }

      return {
        ...state,
        prevOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };
    case ACTIONS.CLEAR:
      return {};
    case ACTIONS.DELETE:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };
      } else if (state.currentOperand == null) return state;
      else if (state.currentOperand.length === 1) {
        return {
          ...state,
          currentOperand: null,
        };
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
    case ACTIONS.RESULT:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.prevOperand == null
      ) {
        return state;
      }
  }
  return {
    ...state,
    overwrite: true,
    prevOperand: null,
    operation: null,
    currentOperand: evaluate(state),
  };
}

function evaluate({ currentOperand, prevOperand, operation }) {
  const prev = parseFloat(prevOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return "";
  let evaluation = "";
  switch (operation) {
    case "+":
      evaluation = prev + current;
      break;
    case "-":
      evaluation = prev - current;
      break;
    case "*":
      evaluation = prev * current;
      break;
    case "/":
      evaluation = prev / current;
      break;
  }
  return evaluation.toString();
}

const FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});

function formatOperand(operand) {
  if (operand == null) return;
  const [integer, decimal] = operand.split(".");
  if (decimal == null) return FORMATTER.format(integer);
  return `${FORMATTER.format(integer)}.${decimal}`;
}

function App() {
  const [{ currentOperand, prevOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <div className="cal-grid">
      <div className="data">
        <div className="prev-operand">
          {formatOperand(prevOperand)}
          {operation}
        </div>
        <div className="current-operand">{formatOperand(currentOperand)}</div>
      </div>
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}>
        C
      </button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE })}>DEL</button>
      <OperationBtn operation="/" dispatch={dispatch} />
      <DigitBtn digit="7" dispatch={dispatch} />
      <DigitBtn digit="8" dispatch={dispatch} />
      <DigitBtn digit="9" dispatch={dispatch} />
      <OperationBtn operation="*" dispatch={dispatch} />
      <DigitBtn digit="4" dispatch={dispatch} />
      <DigitBtn digit="5" dispatch={dispatch} />
      <DigitBtn digit="6" dispatch={dispatch} />
      <OperationBtn operation="-" dispatch={dispatch} />
      <DigitBtn digit="1" dispatch={dispatch} />
      <DigitBtn digit="2" dispatch={dispatch} />
      <DigitBtn digit="3" dispatch={dispatch} />
      <OperationBtn operation="+" dispatch={dispatch} />
      <DigitBtn digit="0" dispatch={dispatch} />
      <DigitBtn digit="." dispatch={dispatch} />
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.RESULT })}>
        =
      </button>
    </div>
  );
}

export default App;
