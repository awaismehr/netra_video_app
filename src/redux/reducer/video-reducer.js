import * as TYPES from "../constants";
/*global FB*/

const initialState = {
  isLoading: false,
  data: [],
  error: null,
  value: "",
  checked: [],
  list_query: [],
  count: 0,
  from: 0,
  favArray: [],
  recentArray: [],
  isFav: false,
  showFav: false,
  showDelBtn: false,
  openContactModal: false,
  openFormModal: false,
  favorite: [],
  showRecommended: false,
  isGoogleLoggedIn: false,
  isFbLoggedIn: false,
  gUserInfo: null,
  FbUserInfo: null,
  clear: false,

  query: ["is", "of", "here"][Math.floor(Math.random() * 3)],
  access: false,
  contactUs: false,
  isError: false,
};

export const videoReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.FETCH_VIDEO_ATTEMPT:
      return {
        ...state,
        isLoading: true,
        count: 0,
        checked: [],
        list_query: [],
      };
    case TYPES.MODAL:
      return {
        ...state,
        openContactModal: action.contCond,
        openFormModal: action.formCond,
      };

    case TYPES.ACCESS_MODAL:
      return { ...state, access: action.payload, contactUs: false };
    case TYPES.CONTACT_US_MODAL:
      return { ...state, contactUs: action.payload, access: false };
    case "IS_CLEAR":
      return { ...state, clear: action.payload };
    case "SHOW":
      return { ...state, showRecommended: action.payload };
    case "INPUT":
      return { ...state, value: action.payload };
    case "THUMBNAIL_EXPIRE": {
      let newdata = [...state.data];
      let index = action.payload;
      if (newdata[index]._source.media.oembed) {
        newdata[index]._source.media.oembed.thumbnail_url =
          "https://i.ytimg.com/vi/ZPgZhnbw5UE/hqdefault.jpg";
      }
      if (newdata[index]._source.thumbnail) {
        newdata[index]._source.thumbnail =
          "https://i.ytimg.com/vi/ZPgZhnbw5UE/hqdefault.jpg";
      }
      return { ...state, data: newdata };
    }

    case "MULTI_SEARCH":
      return { ...state, ...action.payload };
    case "UPDATE_QUERY":
      return { ...state, query: action.payload };
    case TYPES.CLEAR_CHECKS:
      return {
        ...state,
        value: "",
        checked: [],
        list_query: [],
        count: 0,
        clear: true,
      };

    case TYPES.ADD_FAV:
      return {
        ...state,
        favArray: action.data,
      };
      case TYPES.RESETFAV:
        const emptyFavArray = [];
        return { ...state, favArray: emptyFavArray };

    case TYPES.RESET:
      const emptyArray = [];
      return { ...state, recentArray: emptyArray };

    case "UPDATE_HISTORY": {
      let oldData = state.history;
      for (var i = 0; i < oldData.length; i++) {
        if (oldData[i]._id === action.payload._id) {
          return state;
        }
      }
      let newData = oldData.concat(action.payload);
      return { ...state, history: newData };
    }
    case TYPES.DELETE_HISTORY:
      return { ...state, history: [] };
    case TYPES.DELETE_RECENT_VIDEO: {
      let oldData = [...state.history];
      oldData.splice(action.payload, 1);
      return { ...state, history: oldData };
    }
    case TYPES.DEL_RECENT:
      const delArray = state.recentArray.filter((v, i) => {
        return v._id !== action.id;
      });
      return { ...state, recentArray: delArray };
    case TYPES.DEL_FAV:
      const delFavArray = state.favArray.filter((v, i) => {
        return v._id !== action.id;
      });
      return { ...state, favArray: delFavArray };

    case "UPDATE_FAV":
      return { ...state, favorite: action.payload };
    case TYPES.FETCH_VIDEO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        value: "",
        from: 30,
        isError: false,
      };
    case "LOAD_MORE":
      return {
        ...state,
        isLoading: false,
        data: [...state.data, ...action.payload],
        value: "",
        from: state.from + 30,
      };
      return { ...state, isLoading: false, data: action.payload, value: "" };
    case TYPES.GOOGLE_LOGIN:
      return { ...state, ...action.payload };
    case TYPES.FB_LOGIN:
      return { ...state, ...action.payload };
    case TYPES.LOGOUT:
      return { ...state, isGoogleLoggedIn: false, isFbLoggedIn: false };
    case TYPES.FETCH_VIDEO_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        isError: true,
      };
    case "FAVOURITE":
      return { ...state, favourite: action.payload };
    // case TYPES.GOOGLE_LOGIN: {
    //   return {
    //     ...state,
    //     image_: action.payload.profileObj.imageUrl,
    //     name_: action.payload.profileObj.name,
    //     email_: action.payload.profileObj.email,
    //     isLoggedIn: true,
    //     Google_logout_bol: true,
    //   };
    // }
    case "FACEBOOK_LOGIN": {
      return {
        ...state,
        name_: action.payload.name,
        email_: action.payload.email,
        image_: action.payload.picture.data.url,
        isLoggedIn: true,
      };
    }

    case TYPES.RECENT:
      return {
        ...state,
        recentArray: action.payload,
        showFav: true,
      };

    case "LOGOUT":
      return state.Google_logout_bol
        ? {
            ...state,
            Google_logout_bol: false,
            isLoggedIn: false,
            name_: "",
            email_: "",
            image_: "",
          }
        : {
            ...state,
            isLoggedIn: false,
            name_: "",
            email_: "",
            image_: "",
          };
    default:
      return state;
  }
};
