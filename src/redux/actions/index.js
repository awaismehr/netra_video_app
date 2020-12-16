import randomWords from "random-words";
import * as TYPES from "../constants";
import axios from "axios";

export const access_modal = (data) => ({
  type: TYPES.ACCESS_MODAL,
  payload: data,
});
export const contact_us = (data) => ({
  type: TYPES.CONTACT_US_MODAL,
  payload: data,
});

export const isClear = data => ({
  type: "IS_CLEAR",
  payload: data
});
export const clearChecks = () => ({
  type: TYPES.CLEAR_CHECKS,
});

 export const deleteRecentVideo = data => ({
   type: TYPES.DELETE_RECENT_VIDEO,
   payload: data
 });

export const delete_history = () => ({
  type: TYPES.DELETE_HISTORY,
});

export const updateInput = (data) => ({
  type: TYPES.UPDATE_INPUT,
  payload: data,
});

export const responseGoogle = (data) => ({
  type: TYPES.GOOGLE_LOGIN,
  payload: data,
});

export const responseFb = (data) => ({
  type: TYPES.FB_LOGIN,
  payload: data,
});

export const logout = () => ({
  type: TYPES.LOGOUT,
});

export const updateHistory = (data) => ({
  type: TYPES.UPDATE_HISTORY,
  payload: data,
});

export const updateFav = data => ({
  type: TYPES.UPDATE_FAV,
  payload: data
});

export const updateInputWithHooks = (data) => ({
  type: TYPES.UPDATE_INPUT_WITH_HOOKS,
  payload: data,
});

export const toggle = (data) => ({
  type: TYPES.TOGGLE,
  payload: { open: true },
});

export const handleImageError = (index) => ({
  type: "THUMBNAIL_EXPIRE",
  payload: index,
});

export const fetchVideoAttempt = () => ({
  type: TYPES.FETCH_VIDEO_ATTEMPT,
});

export const fetchVideoSuccess = (data) => ({
  type: TYPES.FETCH_VIDEO_SUCCESS,
  payload: data,
});
export const fetchMoreVideoSuccess = (data) => ({
  type: "LOAD_MORE",
  payload: data,
});
export const fetchVideoFail = (err) => ({
  type: TYPES.FETCH_VIDEO_FAIL,
  payload: err,
});
 

export const modal =(formCond,contCond)=>({
  type:TYPES.MODAL,
  formCond:formCond,
  contCond:contCond,
})

export const updateHtml_ = (
  html,
  title,
  time,
  description,
  thumb_title,
  subreddit
) => ({
  type: "HTML",
  payload: { html, title, time, description, subreddit },
});

export const updateSearch = (value) => ({
  type: "INPUT",
  payload: value,
});

export const showRecommendations = (data) => ({
  type: "SHOW",
  payload: data,
});

export const mutltiSearch = (payload) => ({
  type: "MULTI_SEARCH",
  payload,
});
export const updateQuery = (payload) => ({
  type: "UPDATE_QUERY",
  payload,
});
export const logoClick = (title) => {
  const thunk = async (dispatch) => {
    try {
      dispatch(fetchVideoAttempt());
      // var title = await randomWords({ exactly: 5, join: " " });
      var things = [
        "of",
        "are",
        "now",
        "later",
        "this",
        "sports",
        "news",
        "trump",
        "joebiden",
      ];
      var thing = things[Math.floor(Math.random() * things.length)];
      title = thing;
      const res = await axios.post(
        "http://95.216.70.189:4400/search_title",
        {
          title: title ? title : "of",
          from: 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(fetchVideoSuccess(res.data));
      dispatch(updateQuery(title ? title : "of"));
    } catch (err) {
      dispatch(fetchVideoFail(err));
    }
  };
  return thunk;
};
export const loadMore = (title, from) => {
  const thunk = async (dispatch) => {
    try {
      // dispatch(fetchVideoAttempt());
      const res = await axios.post(
        "http://95.216.70.189:4400/search_title",
        {
          title: title ? title : "of",
          from: from,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(fetchMoreVideoSuccess(res.data));
      // console.log(res.data)
    } catch (err) {
      dispatch(fetchVideoFail(err));
    }
  };
  return thunk;
};

export const updateHtml = (
  html,
  title,
  time,
  description,
  thumb_title,
  subreddit
) => {
  const thunk = async (dispatch) => {
    try {
      dispatch(fetchVideoAttempt());
      dispatch(
        updateHtml_(html, title, time, description, thumb_title, subreddit)
      );
      const res = await axios.post(
        "http://95.216.70.189:4400/recommend_search",
        {
          title: title ? title : "of",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(fetchVideoSuccess(res.data));
    } catch (err) {
      dispatch(fetchVideoFail(err));
    }
  };
  return thunk;
};

export const fetchvideoFromElastic = (title) => {
  const thunk = async (dispatch) => {
    try {
      dispatch(fetchVideoAttempt());
      const res = await axios.post(
        "http://95.216.70.189:4400/search_title",
        {
          title: title,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(fetchVideoSuccess(res.data));
      dispatch(updateQuery(title));
    } catch (err) {
      console.log("no result");
      dispatch(fetchVideoFail(err));
    }
  };
  return thunk;
};

export const timeSearch = (time) => {
  const thunk = async (dispatch) => {
    try {
      dispatch(fetchVideoAttempt());
      const res = await axios.post(
        "http://95.216.70.189:4400/time_search",
        {
          time: time ? time : "1year",
          title: "is",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(fetchVideoSuccess(res.data));
    } catch (err) {
      dispatch(fetchVideoFail(err));
    }
  };
  return thunk;
};

export const multiSearchVideos = (title) => {
  const thunk = async (dispatch) => {
    try {
      dispatch(fetchVideoAttempt());
      const res = await axios.post(
        "http://95.216.70.189:4400/id_search",
        {
          video_ids: title ? title : ["is"],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(fetchVideoSuccess(res.data));
    } catch (err) {
      dispatch(fetchVideoFail(err));
    }
  };
  return thunk;
};

export const showDelBtn = () => ({
  type: TYPES.SHOW_DEL_BUTTON,
});

export const addFav = (data) => ({
  type: TYPES.ADD_FAV,
  data: data,
});

// export const fav = (video) => ({
//   type: TYPES.FAV,
//   video: video,
// });
// export const notRecent = (id) => ({
//   type: TYPES.NOT_RECENT,
//   id: id,
// });
// export const notFav = (id) => ({
//   type: TYPES.NOT_FAV,
//   id: id,
// });
export const recent = (data) => ({
  type: TYPES.RECENT,
  payload: data,
});
export const checkIsFav = (checked) => ({
  type: TYPES.CHECK_IS_FAV,
  checked: checked,
});

 export const delRecent=(id)=>({
 type:TYPES.DEL_RECENT,
 id:id
 })
 export const delFav=(id)=>({
 type:TYPES.DEL_FAV,
 id:id
 })



export const reset = () => ({
  type: TYPES.RESET,
});

export const resetFav=()=>({
  type:TYPES.RESETFAV
})
// export const handleImageError = index => {
//   const thunk = async dispatch => {
//     try {
//       dispatch(fetchVideoAttempt());

//       dispatch(handleImageError_(index));
//     } catch (err) {
//       dispatch(fetchVideoFail(err));
//     }
//   };
//   return thunk;
// };
