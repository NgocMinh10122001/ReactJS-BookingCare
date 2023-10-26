import axios from "../axios";
// import axios from "../axios";

const handleLoginApi = async (email, password) => {
  //   return axios.post("/api/login");
  return await axios.post("/api/login", {
    email,
    password,
  });
  // .then(function (response) {
  //   console.log(response);
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });
};

// const handleRenderUsers = () => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let dataUsers = await axios.get("/api/get-all-users");
//       // console.log(dataUsers.users);
//       if (dataUsers && dataUsers.users) {
//         resolve(dataUsers.users);
//       } else {
//         resolve([]);
//       }
//     } catch (e) {
//       reject(e);
//     }
//   });
//   // return await axios.get("/api/get-all-users");
// };

const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};

const createNewUserService = (user) => {
  console.log("check user", user);
  return axios.post("/api/create-new-user", user);
};

const deleteUserService = (userId) => {
  console.log("check id", userId);
  // return axios.delete("/api/delete-new-user", userId);
  return axios({
    method: "DELETE",
    url: "/api/delete-new-user",
    data: {
      userId,
    },
  });
};

const updateUserService = (user) => {
  // console.log(user);
  // return axios({
  //   method: "PUT",
  //   url: "/api/update-new-user",
  //   data: {
  //     user,
  //   },
  // });
  return axios.put("/api/update-new-user", user);
};

const getAllCodeService = (inputData) => {
  return axios.get(`/api/allcode?type=${inputData}`);
};

const getTopDoctorHome = (limit) => {
  // if (!limit) limit = 10;
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

const getDetailDoctor = (idDoctor) => {
  // console.log("check id 2", idDoctor);
  return axios.get(`/api/detail-doctor?idDoctor=${idDoctor}`);
};
const getDoctorSchedule = (doctorId, date) => {
  return axios.get(
    `/api/get-doctor-schedule?doctorId=${doctorId}&&date=${date}`
  );
};

const getExtraDoctorInfo = (doctorId) => {
  return axios.get(`/api/get-extra-doctor-info?doctorId=${doctorId}`);
};

const getProfileDoctorById = (doctorId) => {
  return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};

const handleBookingAppointment = (data) => {
  // console.log("chcek body", data);
  return axios.post("/api/patient-book-appointment", { data });
};

const confirmBookingService = (token, doctorId) => {
  return axios.put("/api/confirm-update-booking-success", { token, doctorId });
};
export {
  handleLoginApi,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  updateUserService,
  getAllCodeService,
  getTopDoctorHome,
  getDetailDoctor,
  getDoctorSchedule,
  getExtraDoctorInfo,
  getProfileDoctorById,
  handleBookingAppointment,
  confirmBookingService,
};
