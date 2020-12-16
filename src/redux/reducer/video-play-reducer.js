import * as TYPES from "../constants";

const initialState = {
  isLoading: false,
  data: [],
  error: null,
  html: "",
  title: "",
  time: "",
  description: "",
  subreddit : "",
  thumb_title: ""
 
};

export const videoPlayReducer = (state = initialState, action) => {
  switch (action.type) {
    case "HTML":{
      return { ...state, ...action.payload };
    }
     

    default:
      return state;
  }
};
