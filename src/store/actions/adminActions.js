import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createNewUserService,
  getAllUsers,
  deleteUserService,
  updateUserService,
  getTopDoctorHome,
  getDetailDoctor,
} from "../../services/userService";
import { toast } from "react-toastify";

// start doing end

// export const fetchGenderStart = () => ({
//   type: actionTypes.FETCH_GENDER_START,
// });

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GENDER_START,
      });
      let res = await getAllCodeService("GENDER");
      if (res && res.errCode === 0) {
        // console.log("check data", getState);
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFalse());
      }
    } catch (error) {
      dispatch(fetchGenderFalse());
      console.log("fetchGenderStart", error);
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFalse = () => ({
  type: actionTypes.FETCH_GENDER_FALSE,
});

export const fetchPositionSuccess = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("POSITION");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_POSITION_SUCCESS,
          data: res.data,
        });
      }
    } catch (error) {
      dispatch(fetchPositionFalse());
      console.log(error);
    }
  };
};

export const fetchPositionFalse = () => ({
  type: actionTypes.FETCH_POSITION_FALSE,
});

export const fetchRoleSuccess = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("ROLE");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ROLE_SUCCESS,
          data: res.data,
        });
      }
    } catch (error) {
      dispatch(fetchRoleFalse());
      console.log(error);
    }
  };
};

export const fetchRoleFalse = () => ({
  type: actionTypes.FETCH_ROLE_FALSE,
});

export const createNewUserSuccess = (dataUser) => {
  // console.log("check dataUser", dataUser);
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(dataUser);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.SAVE_USER_SUCCESS,
          // data: res.data,
        });
        dispatch(fetchAllUserSuccess("All"));
      }
    } catch (error) {
      dispatch(createNewUserFailded());
      console.log(error);
    }
  };
};

export const createNewUserFailded = () => ({
  type: actionTypes.SAVE_USER_FAILED,
});

export const fetchAllUserSuccess = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers(data);
      // console.log("check res doctor", res1);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_USER_SUCCESS,
          data: res.users,
        });
      }
    } catch (error) {
      dispatch(fetchAllUserFailed());
      console.log(error);
    }
  };
};

export const fetchAllUserFailed = () => ({
  type: actionTypes.FETCH_ALL_USER_FAILED,
});

export const deleteUser = (userDlt) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(userDlt);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.DELETE_USER_SUCCESS,
          errCode: res.errCode,
        });
        dispatch(fetchAllUserSuccess("All"));
        dispatch(toastify("success"));
      } else {
        dispatch(deleteUserFailed(res.errCode));
        dispatch(toastify("failure"));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteUserFailed = (data) => {
  return {
    type: actionTypes.DELETE_USER_FAILED,
    errCode: data,
  };
};

export const editUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers(userId);
      console.log("check user res", res);
      dispatch({
        type: actionTypes.EDIT_USER_SUCCESS,
        user: res.users,
      });
    } catch (error) {
      dispatch(editUserFailed());
      console.log(error);
    }
  };
};

export const editUserFailed = () => {
  return {
    type: actionTypes.EDIT_USER_FAILED,
  };
};

export const updateUser = (dataUser) => {
  console.log("check data", dataUser);
  return async (dispatch, getState) => {
    try {
      let res = await updateUserService(dataUser);
      console.log("check user res", res);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.UPDATE_USER_SUCCESS,
        });
      }
      dispatch(fetchAllUserSuccess("All"));
    } catch (error) {
      dispatch(editUserFailed());
      console.log(error);
    }
  };
};

export const updateUserFailed = () => {
  return {
    type: actionTypes.UPDATE_USER_FAILED,
  };
};

export const cancelUpdateUser = () => {
  return async (dispatch, getState) => {
    try {
      // let res = await updateUserService(dataUser);
      // console.log("check user res", res);
      // if (res && res.errCode === 0) {
      dispatch({
        type: actionTypes.CANCEL_UPDATE_USERS,
      });
      // }
      // dispatch(fetchAllUserSuccess("All"));
    } catch (error) {
      console.log(error);
    }
  };
};

// toastify
export const toastify = (dataToast) => {
  return async (dispatch, getState) => {
    try {
      if (dataToast && dataToast === "success") {
        dispatch({
          type: actionTypes.INCREMENT,
          data: dataToast,
        });
        toast.success("MY SUCCESS");
      } else {
        dispatch({
          type: actionTypes.DECREASE,
          data: dataToast,
        });
        toast.warn("DECREASE");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// let res1 = await getTopDoctorHome(3);

//  get time doctor
export const fetchAllScheduleTime = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("TIME");
      // console.log("check mark doctor", res);

      if (res && res.data) {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_HOUR_SUCCESS,
          dataTime: res.data,
        });
      }
    } catch (error) {
      // console.log("err get Markdown doctor", error);
      dispatch(fetchAllScheduleTimeFailed());
    }
  };
};

export const fetchAllScheduleTimeFailed = () => {
  return {
    type: actionTypes.FETCH_ALLCODE_SCHEDULE_HOUR_FAILED,
  };
};

export const toggleRangeTimeSchedule = (isSelected) => {
  return async (dispatch, getState) => {
    try {
    } catch (error) {}
  };
};

export const getRequiredDoctorInfo = () => {
  return async (dispatch, getState) => {
    try {
      let resPrice = await getAllCodeService("PRICE");
      let resProvince = await getAllCodeService("PROVINCE");
      let resPayment = await getAllCodeService("PAYMENT");
      // let resAddressClinic = await getAllCodeService("");
      // let resNameClinic = await getAllCodeService("");
      // let resNote = await getAllCodeService("");
      // console.log("check doctorInfo", resPrice);
      // console.log("check doctorInfo", resProvince);
      // console.log("check doctorInfo", resPayment);
      if (
        resPrice &&
        resPrice.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0 &&
        resPayment &&
        resPayment.errCode === 0
      ) {
        let data = {
          Price: resPrice.data,
          Province: resProvince.data,
          Payment: resPayment.data,
        };
        dispatch(getRequiredDoctorInfoSuccess(data));
      }
    } catch (error) {
      dispatch(getRequiredDoctorInfoFailed());
    }
  };
};
export const getRequiredDoctorInfoSuccess = (data) => {
  // console.log("check data", data);
  return {
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS,
    data: data,
  };
};
export const getRequiredDoctorInfoFailed = () => {
  return {
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED,
  };
};

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
