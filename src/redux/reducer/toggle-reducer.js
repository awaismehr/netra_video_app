import * as types from "../constants";
// import { stat } from "fs/promises";
const initialState = {
  toggle: false
};

export const toggleReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TOGGLE:
      return { toggle: !state.toggle };
    default:
      return state;
  }
};
