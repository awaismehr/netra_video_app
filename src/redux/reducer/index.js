import { combineReducers } from "redux";
import { testReducer } from "./test-reducer";
import { inputReducer } from "./input-reducer";
import { videoReducer } from "./video-reducer";
import { toggleReducer } from "./toggle-reducer";
import { videoPlayReducer } from "./video-play-reducer";
export const rootReducer = combineReducers({
  testReducer,
  inputReducer,
  toggleReducer,
  videoReducer,
  videoPlayReducer
});
