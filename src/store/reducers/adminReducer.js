import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoading: false,
  genders: [],
  roles: [],
  positions: [],
  allUsers: [],
  user: {},
  userDlted: "",
  isEdit: false,
  isCancelUU: false,
  allScheduleTime: [],
  allDoctorInfo: {},
  detailDoctor: {},
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      let copyState = { ...state };
      copyState.isLoading = true;
      //   console.log("check action", action);
      return {
        ...copyState,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      //   let copyState = { ...state };
      state.genders = action.data;
      state.isLoading = false;

      //   console.log("check action reducer", action);
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FALSE:
      state.isLoading = false;
      state.genders = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_POSITION_SUCCESS:
      state.positions = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FALSE:
      state.roles = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roles = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FALSE:
      state.roles = [];
      return {
        ...state,
      };
    case actionTypes.SAVE_USER_SUCCESS:
      return {
        ...state,
      };
    case actionTypes.SAVE_USER_FAILED:
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USER_SUCCESS:
      state.allUsers = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USER_FAILED:
      state.allUsers = [];
      return {
        ...state,
      };
    case actionTypes.DELETE_USER_SUCCESS:
      state.userDlted = action.errCode;
      return {
        ...state,
      };
    case actionTypes.DELETE_USER_FAILED:
      state.userDlted = action.errCode;
      return {
        ...state,
      };
    case actionTypes.INCREMENT:
      return {
        ...state,
      };
    case actionTypes.DECREASE:
      return {
        ...state,
      };
    case actionTypes.EDIT_USER_SUCCESS:
      state.user = action.user;
      state.isEdit = true;
      return {
        ...state,
      };
    case actionTypes.EDIT_USER_FAILED:
      state.user = {};
      return {
        ...state,
      };
    case actionTypes.UPDATE_USER_SUCCESS:
      state.isEdit = false;
      return {
        ...state,
      };
    case actionTypes.UPDATE_USER_FAILED:
      return {
        ...state,
      };
    case actionTypes.CANCEL_UPDATE_USERS:
      state.isEdit = false;
      state.isCancelUU = !state.isCancelUU;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALLCODE_SCHEDULE_HOUR_SUCCESS:
      state.allScheduleTime = action.dataTime;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALLCODE_SCHEDULE_HOUR_FAILED:
      state.allScheduleTime = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS:
      // console.log("check doctorInfo", action);
      state.allDoctorInfo = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED:
      state.allDoctorInfo = {};
      return {
        ...state,
      };
    case actionTypes.DETAIL_DOCTOR_SUCCESS:
      // console.log("check adata", action);
      state.detailDoctor = action.data;
      return {
        ...state,
      };
    case actionTypes.DETAIL_DOCTOR_FAILED:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default adminReducer;
