import actionTypes from "./actionTypes";
import {
  getDetailDoctor,
  getDoctorSchedule,
  getExtraDoctorInfo,
  getProfileDoctorById,
  handleBookingAppointment,
  confirmBookingService,
} from "../../services/userService";

export const addUserSuccess = () => ({
  type: actionTypes.ADD_USER_SUCCESS,
});

export const userLoginSuccess = (userInfo) => ({
  type: actionTypes.USER_LOGIN_SUCCESS,
  userInfo: userInfo,
});

export const userLoginFail = () => ({
  type: actionTypes.USER_LOGIN_FAIL,
});

export const processLogout = () => ({
  type: actionTypes.PROCESS_LOGOUT,
});

//  get detail DOctor

// export const detailDoctor = async (idDoctor) => {

//   try {
//     if (idDoctor) {
//       console.log("check id", idDoctor);

//       let res = await getDetailDoctor(idDoctor);
//       console.log("check res", res);
//       return {
//         type: actionTypes.DETAIL_DOCTOR_SUCCESS,
//         data: res.data,
//       };
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

export const detailDoctorFailed = () => {
  return {
    type: actionTypes.DETAIL_DOCTOR_FAILED,
  };
};

export const detailDoctor = (idDoctor) => {
  // console.log("check data Mark", dataMarkDoc);
  return async (dispatch, getState) => {
    try {
      let res = await getDetailDoctor(idDoctor);
      //  console.log("check res doctor", res);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.DETAIL_DOCTOR_SUCCESS,
          data: res.data,
        });
      }
    } catch (error) {
      dispatch(detailDoctorFailed());
      console.log(error);
    }
  };
};
export const fetchDoctorSchedule = (doctorId, date) => {
  return async (dispatch, getState) => {
    try {
      if (doctorId && date) {
        let res = await getDoctorSchedule(doctorId, date);
        // console.log("check res", res);
        if (res && res.data) {
          dispatch({
            type: actionTypes.FETCH_SCHEDULE_DOCTOR_SUCCESS,
            data: res.data,
          });
        }
      }
    } catch (error) {
      console.log("Error from action User");
      dispatch(fetchDoctorScheduleFailed());
    }
  };
};
export const fetchDoctorScheduleFailed = () => {
  return {
    type: actionTypes.FETCH_SCHEDULE_DOCTOR_FAILED,
  };
};

export const fetchExtraDoctorInfo = (doctorId) => {
  return async (dispatch, getState) => {
    try {
      if (doctorId) {
        let res = await getExtraDoctorInfo(doctorId);
        // console.log("check res", res);
        if (res && res.errCode === 0) {
          dispatch(fetchExtraDoctorInfoSuccess(res.data));
        }
      }
    } catch (error) {
      dispatch(fetchExtraDoctorInfoFailed());
    }
  };
};

export const fetchExtraDoctorInfoSuccess = (data) => {
  // console.log("check data", data);
  return {
    type: actionTypes.FETCH_EXTRA_DOCTOR_INFO_SUCCESS,
    data: data,
  };
};

export const fetchExtraDoctorInfoFailed = () => {
  return {
    type: actionTypes.FETCH_EXTRA_DOCTOR_INFO_FAILED,
  };
};

export const fetchProfileDoctorById = (doctorId) => {
  return async (dispatch, getState) => {
    try {
      if (doctorId) {
        let res = await getProfileDoctorById(doctorId);
        // console.log("check res", res);
        if (res && res.errCode === 0) {
          dispatch(fetchProfileDoctorByIdSuccess(res.data));
        }
      }
    } catch (error) {
      dispatch(fetchProfileDoctorByIdFailed());
    }
  };
};

export const fetchProfileDoctorByIdSuccess = (data) => {
  // console.log("check data", data);
  return {
    type: actionTypes.FETCH_PROFILE_DOCTOR_BY_ID_SUCCESS,
    data: data,
  };
};

export const fetchProfileDoctorByIdFailed = () => {
  return {
    type: actionTypes.FETCH_PROFILE_DOCTOR_BY_ID_FAILED,
  };
};

export const postBookingAppointment = (data) => {
  return async (dispatch, getState) => {
    try {
      if (data) {
        let res = await handleBookingAppointment(data);
        // console.log("check res", res);
        if (res && res.errCode === 0) {
          dispatch(postBookingAppointmentSuccess(res.data));
        }
      }
    } catch (error) {
      dispatch(postBookingAppointmentFailed());
    }
  };
};

export const postBookingAppointmentSuccess = (data) => {
  // console.log("check data", data);
  return {
    type: actionTypes.POST_BOOKING_APPOINTMENT_SUCCESS,
    data: data,
  };
};

export const postBookingAppointmentFailed = () => {
  return {
    type: actionTypes.POST_BOOKING_APPOINTMENT_FAILED,
  };
};

export const confirmBooking = (token, doctorId) => {
  return async (dispatch, getState) => {
    try {
      if (token && doctorId) {
        let res = await confirmBookingService(token, doctorId);
        if (res && res.errCode === 0) {
          dispatch(confirmBookingSuccess(true));
        }
      } else {
        dispatch(confirmBookingFailed());
      }
    } catch (error) {
      dispatch(confirmBookingFailed());
    }
  };
};

export const confirmBookingSuccess = (data) => {
  // console.log("check data", data);
  return {
    type: actionTypes.CONFIRM_BOOKING_APPOINTMENT_SUCCESS,
    data: data,
  };
};

export const confirmBookingFailed = () => {
  return {
    type: actionTypes.CONFIRM_BOOKING_APPOINTMENT_FAILED,
  };
};
