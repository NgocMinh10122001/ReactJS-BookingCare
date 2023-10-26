import actionTypes from "./actionTypes";
import {
  getTopDoctorHome,
  getAllDoctors,
  postMarkdownDoctor,
  getDetailDoctor,
  getMarkdownDoctor,
  updateMarkdownDoctor,
} from "../../services/doctorService";
import { toast } from "react-toastify";
import { getAllCodeService } from "../../services/userService";

export const fetchTopDoctorHomeSuccess = (limit) => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHome(limit);
      //   console.log("check res doctor", res);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTOR_HOME_SUCCESS,
          data: res.data,
        });
      }
    } catch (error) {
      dispatch(fetchTopDoctorHomeFailed());
      console.log(error);
    }
  };
};

export const fetchTopDoctorHomeFailed = (limit) => {
  return {
    type: actionTypes.FETCH_TOP_DOCTOR_HOME_FAILED,
  };
};

// get all doctor by type

export const fetchAllDoctorHomeSuccess = (doctorType) => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctors(doctorType);
      // console.log("check res doctor", res);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
          data: res.data,
        });
      }
    } catch (error) {
      dispatch(fetchTopDoctorHomeFailed());
      console.log(error);
    }
  };
};

export const fetchAllDoctorHomeFailed = () => {
  return {
    type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
  };
};
export const saveMarkdownDoctor = (dataMarkDoc) => {
  // console.log("check data Mark", dataMarkDoc);
  return async (dispatch, getState) => {
    try {
      let res = await postMarkdownDoctor(dataMarkDoc);
      //  console.log("check res doctor", res);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.SAVE_MARK_DOCTOR_SUCCESS,
          //  data: res.data,
        });
      }
    } catch (error) {
      dispatch(saveMarkdownDoctorFailed());
      console.log(error);
    }
  };
};

export const saveMarkdownDoctorFailed = () => {
  return {
    type: actionTypes.SAVE_MARK_DOCTOR_FAILED,
  };
};

export const getMarkDoctor = (doctorId) => {
  return async (dispatch, getState) => {
    try {
      if (doctorId) {
        let res = await getMarkdownDoctor(doctorId);
        // console.log("check mark doctor", res);

        if (res && res.data) {
          dispatch({
            type: actionTypes.GET_MARKDOWN_DOCTOR_SUCCESS,
            data: res.data,
          });
        }
      }
    } catch (error) {
      // console.log("err get Markdown doctor", error);
      dispatch(getMarkdownDoctorFailed());
    }
  };
};

export const getMarkdownDoctorFailed = () => {
  return {
    type: actionTypes.GET_MARKDOWN_DOCTOR_FAILED,
  };
};

//  update markdown doctor
export const updateMarkDoctor = (doctor) => {
  return async (dispatch, getState) => {
    try {
      if (doctor) {
        let res = await updateMarkdownDoctor(doctor);
        // console.log("check mark doctor", res);

        if (res && res.data) {
          dispatch({
            type: actionTypes.UPDATE_MARKDOWN_DOCTOR_SUCCESS,
            data: res.data,
          });
        }
      }
    } catch (error) {
      // console.log("err get Markdown doctor", error);
      dispatch(updateMarkdownDoctorFailed());
    }
  };
};

export const updateMarkdownDoctorFailed = () => {
  return {
    type: actionTypes.UPDATE_MARKDOWN_DOCTOR_FAILED,
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
