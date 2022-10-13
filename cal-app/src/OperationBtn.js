import { ACTIONS } from "./App";

export default function OperationBtn({ dispatch, operation }) {
  return (
    <button
      onClick={() =>
        dispatch({ type: ACTIONS.OPERATION_SIGN, payload: { operation } })
      }>
      {operation}
    </button>
  );
}
