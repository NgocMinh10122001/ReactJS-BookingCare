import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoggedIn: false,
  userInfo: null,
  detailDoctor: {},
  scheduleOfDoctor: [],
  markdownDoctor1: {},
  extraDoctorInfo: {},
  profileDoctor: {},
  linkConfirmBookingAppointment: "",
  bookinged: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        userInfo: action.userInfo,
      };
    case actionTypes.USER_LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        userInfo: null,
      };
    case actionTypes.PROCESS_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        userInfo: null,
      };
    case actionTypes.DETAIL_DOCTOR_SUCCESS:
      // console.log("check adata", action);
      state.detailDoctor = action.data;
      state.markdownDoctor1 = action.data;
      return {
        ...state,
      };
    case actionTypes.DETAIL_DOCTOR_FAILED:
      return {
        ...state,
      };
    case actionTypes.FETCH_SCHEDULE_DOCTOR_SUCCESS:
      // console.log("check adata", action);
      state.scheduleOfDoctor = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_SCHEDULE_DOCTOR_FAILED:
      state.scheduleOfDoctor = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_EXTRA_DOCTOR_INFO_SUCCESS:
      // console.log("check adata", action);
      state.extraDoctorInfo = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_EXTRA_DOCTOR_INFO_FAILED:
      state.extraDoctorInfo = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_PROFILE_DOCTOR_BY_ID_SUCCESS:
      // console.log("check adata", action);
      state.profileDoctor = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_PROFILE_DOCTOR_BY_ID_FAILED:
      state.profileDoctor = {};
      return {
        ...state,
      };
    case actionTypes.POST_BOOKING_APPOINTMENT_SUCCESS:
      // console.log("check adata", action);
      // state.profileDoctor = action.data;
      state.linkConfirmBookingAppointment = action.data;
      return {
        ...state,
      };
    case actionTypes.POST_BOOKING_APPOINTMENT_FAILED:
      // state.profileDoctor = {};
      state.linkConfirmBookingAppointment = "";
      return {
        ...state,
      };
    case actionTypes.CONFIRM_BOOKING_APPOINTMENT_SUCCESS:
      // console.log("check adata", action);
      // state.profileDoctor = action.data;
      state.bookinged = action.data;
      return {
        ...state,
      };
    case actionTypes.CONFIRM_BOOKING_APPOINTMENT_FAILED:
      // state.profileDoctor = {};
      state.bookinged = false;
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default appReducer;
