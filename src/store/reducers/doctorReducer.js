import actionTypes from "../actions/actionTypes";

const initialState = {
  //   isLoading: false,
  //   genders: [],
  //   roles: [],
  //   positions: [],
  //   allUsers: [],
  //   user: {},
  //   userDlted: "",
  //   isEdit: false,
  //   isCancelUU: false,
  topDoctorHome: [],
  allDoctors: [],
  markdownDoctor: {},
};

const doctorReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TOP_DOCTOR_HOME_SUCCESS:
      console.log("check doctor", action.data);
      let copyState = { ...state };
      copyState.topDoctorHome = action.data;
      //   console.log("check action", action);
      return {
        ...copyState,
      };
    case actionTypes.FETCH_TOP_DOCTOR_HOME_FAILED:
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
      state.allDoctors = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTOR_FAILED:
      return {
        ...state,
      };
    case actionTypes.SAVE_MARK_DOCTOR_SUCCESS:
      return {
        ...state,
      };
    case actionTypes.SAVE_MARK_DOCTOR_FAILED:
      return {
        ...state,
      };
    case actionTypes.GET_MARKDOWN_DOCTOR_SUCCESS:
      // console.log("check doctor s", action.data);
      state.markdownDoctor = action.data;
      return {
        ...state,
      };
    case actionTypes.GET_MARKDOWN_DOCTOR_FAILED:
      // console.log("check doctor f", action.data);

      state.markdownDoctor = {};
      return {
        ...state,
      };
    case actionTypes.UPDATE_MARKDOWN_DOCTOR_SUCCESS:
      return {
        ...state,
      };
    case actionTypes.UPDATE_MARKDOWN_DOCTOR_FAILED:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default doctorReducer;
