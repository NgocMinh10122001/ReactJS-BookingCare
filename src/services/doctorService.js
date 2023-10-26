import axios from "../axios";
// import axios from "../axios";

const getTopDoctorHome = (limit) => {
  // if (!limit) limit = 10;
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

const getAllDoctors = (doctorType) => {
  return axios.get(`/api/get-all-doctor?doctorType=${doctorType}`);
};

const postMarkdownDoctor = (dataMarkDoc) => {
  //   console.log("check mark 2", dataMarkDoc);
  return axios.post("/api/save-markdown-doctor", { dataMarkDoc });
};

const getMarkdownDoctor = (doctorId) => {
  // console.log("check id", doctorId);

  if (doctorId) {
    return axios.get(`/api/get-markdown-doctor?doctorId=${doctorId}`);
  }
};

const updateMarkdownDoctor = (doctor) => {
  return axios.put("/api/update-markdown-doctor", { doctor });
};

const postScheduleDoctor = (data) => {
  return axios.post("/api/create-schedule-doctor", {
    data,
  });
};

export {
  getTopDoctorHome,
  getAllDoctors,
  postMarkdownDoctor,
  getMarkdownDoctor,
  updateMarkdownDoctor,
  postScheduleDoctor,
};
