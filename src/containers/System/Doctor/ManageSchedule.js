import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManageSchedule.scss";
import Select from "react-select";
import * as actions from "../../../store/actions";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import { FormattedDate } from "../../../components/Formating/FormattedDate";
import { dateFormat, LANGUAGES } from "../../../utils";
import { toast } from "react-toastify";
import { postScheduleDoctor } from "../../../services/doctorService";

class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDoctor: "",
      doctorId: "",
      options: [{ value: "", label: "" }],
      currentDate: new Date().setHours(0, 0, 0, 0),
      rangeTime: [],
    };
  }
  async componentDidMount() {
    await this.props.getAllDoctors("All");
    await this.props.fetchAllScheduleTime();
    // console.log("check props", this.props.allDoctors);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
      let data = this.props.allScheduleTime;
      if (
        data &&
        data.length > 0 &&
        data.map((item) => {
          item.isSelected = false;
          return item;
        })
      )
        this.setState({
          rangeTime: data,
        });
    }
  }
  handleChange = (selectedDoctor) => {
    // this.setState({ selectedOption }, () =>
    // console.log(`Option selected:`, selectedDoctor);
    // );
    this.setState({
      selectedDoctor,
      doctorId: selectedDoctor.id,
    });
  };
  handleOnchangeDatePicker = (date) => {
    // console.log("check", date);

    this.setState({
      currentDate: date[0],
    });
  };
  handleIsSelected = async (rangeTime2) => {
    // console.log("check select", isSelected);
    // console.log("check key", keyMap2);

    let rangeTime = this.state.rangeTime;
    let copyRangeTime = [...rangeTime];
    if (copyRangeTime && copyRangeTime.length > 0) {
      copyRangeTime = copyRangeTime.map((item) => {
        if (item.keyMap === rangeTime2.keyMap) {
          return (item.isSelected = !rangeTime2.isSelected);
        }
        this.setState({
          rangeTime: [...copyRangeTime],
        });
      });
    }
    // for (let index = 0; index < copyRangeTime.length; index++) {
    //   // console.log("check range", rangeTime1[index].keyMap);
    //   // const element = array[index];
    //   if (copyRangeTime[index].keyMap === keyMap2) {
    //     return (copyRangeTime[index].isSelected = !isSelected);
    //   }
    //   this.setState({
    //     rangeTime: [...copyRangeTime],
    //   });
    // }

    // () => {
    //   console.log("check rang", this.state.rangeTime);
    // }
  };
  handleSaveSchedule = async () => {
    let { selectedDoctor, rangeTime, currentDate } = this.state;
    // currentDate = currentDate.setHours(0, 0, 0, 0);
    // console.log("check crr Date", );
    if (!selectedDoctor) {
      toast.error("Invalid Selected Doctor!");
      return;
    }
    if (!currentDate) {
      toast.error("Invalid Selected Date!");
      return;
    }
    let result = [];
    // let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => {
        if (item.isSelected === true) {
          return item;
        }
      });
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((item) => {
          let obj = {};
          obj.doctorId = selectedDoctor.id;
          // obj.date = formatedDate;
          obj.date = currentDate;
          // obj.date.setHours(0, 0, 0, 0);
          obj.timeType = item.keyMap;
          result.push(obj);
        });
      }
      // console.log("check result", result);
    }

    let res = await postScheduleDoctor(
      {
        data: result,
      }
      // () => {
      //   toast.success("Success");
      // }
    );
    // console.log("check res", res);
    if (res && res.errCode === 0) {
      toast.success("success!");
    }
  };
  render() {
    const { selectedDoctor, currentDate, rangeTime } = this.state;
    let { allDoctors, language } = this.props;
    return (
      <div className="manage-schedule-container">
        <div className="m-s-title">
          <FormattedMessage id="manage-schedule-doctor.manage-schedule-doctor" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-6 form-group">
              <label>
                {" "}
                <FormattedMessage id="manage-schedule-doctor.select-doctor" />
              </label>
              {/* <input className="form-control" placeholder="Chon bac si" /> */}
              <Select
                value={selectedDoctor}
                onChange={this.handleChange}
                options={allDoctors.map((item, index) => {
                  return {
                    id: item.id,
                    value: item.firstName + " " + item.lastName,
                    label: item.firstName + " " + item.lastName,
                  };
                })}
              />
            </div>
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="manage-schedule-doctor.date-picker" />
              </label>
              {/* <input className="form-control" placeholder="Chon ngay" /> */}
              <DatePicker
                onChange={this.handleOnchangeDatePicker}
                className="form-control"
                value={currentDate}
                minDate={new Date().setDate(new Date().getDate() - 1)}
              />
            </div>
            <div className="col-12 pick-hour-container ">
              {/* {console.log("check item", rangeTime)} */}
              {rangeTime &&
                rangeTime.length > 0 &&
                rangeTime.map((item, index) => {
                  return (
                    <button
                      key={item.id}
                      className={
                        item.isSelected === false
                          ? "btn-pick-hour btn btn-warning"
                          : "btn-pick-hour btn btn-primary "
                      }
                      onClick={() => {
                        this.handleIsSelected(item);
                        // item.isSelected = !item.isSelected;
                      }}
                    >
                      {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                    </button>
                  );
                })}
            </div>
            <div className="d-flex justify-content-center col-12">
              <button
                className="btn btn-primary "
                onClick={() => this.handleSaveSchedule()}
              >
                <FormattedMessage id="manage-schedule-doctor.btn-save" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    allDoctors: state.doctor.allDoctors,
    allScheduleTime: state.admin.allScheduleTime,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctors: (doctorType) =>
      dispatch(actions.fetchAllDoctorHomeSuccess(doctorType)),
    fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
