import React, { Component } from "react";
import { connect } from "react-redux";
// import vtv1 from "../../../assets/vtv1.png";
import { withRouter } from "react-router";
import "./DoctorSchedule.scss";
import moment from "moment";
import localization from "moment/locale/vi";
import { LANGUAGES } from "../../../../utils/constant";
import * as actions from "../../../../store/actions";
import { FormattedMessage } from "react-intl";
import BookingModal from "./Modal/BookingModal";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataDoctor: {},
      arrDate: [],
      arrScheduleOfDoctor: [],
      isOpenModal: false,
      scheduleModal: {},
    };
  }
  async componentDidMount() {
    let { language } = this.props;
    // console.log("chekc lange vi", moment(new Date()).format("dddd - DD/MM"));
    // console.log(
    //   "check lang en",
    //   moment(new Date()).locale("en").format("ddd - DD/MM")
    // );
    let value = moment(new Date()).startOf("day").format("YYYY-MM-DD HH:mm:ss");

    this.conditionDate(language);
    await this.props.getDoctorSchedule(this.props.doctorId, value);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.language !== this.props.language) {
      this.conditionDate(this.props.language);
    }
    if (prevProps.scheduleOfDoctor !== this.props.scheduleOfDoctor) {
      let { scheduleOfDoctor } = this.props;
      this.setState({
        arrScheduleOfDoctor: scheduleOfDoctor,
      });
    }
  }
  conditionDate = (language) => {
    if (language === LANGUAGES.VI) {
      let arrDate = [];
      for (let index = 0; index < 7; index++) {
        let obj = {};
        if (index === 0) {
          let ddMM = moment(new Date()).format("DD/MM");
          let today = `Hôm nay - ${ddMM}`;
          obj.label = today;
        } else {
          obj.label = this.capitalizeFirstLetter(
            moment(new Date()).add(index, "days").format("dddd - DD/MM")
          );
        }
        obj.value = moment(new Date())
          .add(index, "days")
          .startOf("day")
          .format("YYYY-MM-DD HH:mm:ss");
        arrDate.push(obj);
      }
      this.setState({
        arrDate: [...arrDate],
      });
      // console.log("check arr", arrDate);
    } else {
      let arrDate = [];
      for (let index = 0; index < 7; index++) {
        let obj = {};
        if (index === 0) {
          let ddMM = moment(new Date()).format("DD/MM");
          let today = `Today - ${ddMM}`;
          obj.label = today;
        } else {
          obj.label = this.capitalizeFirstLetter(
            moment(new Date())
              .add(index, "days")
              .locale("en")
              .format("dddd - DD/MM")
          );
        }
        obj.value = moment(new Date())
          .add(index, "days")
          .startOf("day")
          // .valueOf();
          .format("YYYY-MM-DD HH:mm:ss");

        arrDate.push(obj);
      }
      this.setState({
        arrDate: [...arrDate],
      });
    }
  };
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  handleGetDoctorSchedule = async (event) => {
    // console.log("check date", event.target.value);
    // console.log("check doctorId", this.props.doctorId);

    await this.props.getDoctorSchedule(this.props.doctorId, event.target.value);
  };

  handleToggleModal = (item) => {
    this.setState({
      isOpenModal: !this.state.isOpenModal,
      scheduleModal: item,
    });
  };
  render() {
    let { arrDate, arrScheduleOfDoctor, isOpenModal, scheduleModal } =
      this.state;
    let { language } = this.props;
    // console.log("check state", scheduleModal);
    return (
      <>
        <div className="doctor-schedule-container">
          <div className="schedule-select">
            <select
              className="select"
              onChange={(event) => this.handleGetDoctorSchedule(event)}
            >
              {arrDate &&
                arrDate.length > 0 &&
                arrDate.map((item, index) => {
                  return (
                    <option value={item.value} key={index}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
            <div className="text-calendar">
              <div>
                <i className="fas fa-calendar-alt me-2"></i>
                <span>
                  <FormattedMessage id="patient.detail-doctor.schedule" />
                </span>
              </div>
            </div>
          </div>

          <div className="schedule-time">
            {arrScheduleOfDoctor && arrScheduleOfDoctor.length > 0 ? (
              <>
                <div className="schedule-time-btn">
                  {arrScheduleOfDoctor.map((item, index) => {
                    return (
                      <div
                        className="about-time"
                        key={index}
                        onClick={() => this.handleToggleModal(item)}
                      >
                        {language === LANGUAGES.VI
                          ? item.Allcode.valueVi
                          : item.Allcode.valueEn}
                      </div>
                    );
                  })}
                </div>
                <div className="book-free">
                  <span>
                    <FormattedMessage id="patient.detail-doctor.choose" />
                    <i className="far fa-hand-point-up"></i>
                    <FormattedMessage id="patient.detail-doctor.book-free" />
                  </span>
                </div>
              </>
            ) : (
              <div>
                <FormattedMessage id="patient.detail-doctor.no-schedule" />
              </div>
            )}
          </div>
        </div>
        <BookingModal
          isOpen={isOpenModal}
          scheduleModal={scheduleModal}
          handleToggleModal={this.handleToggleModal}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    detailDoctor: state.user.detailDoctor,
    scheduleOfDoctor: state.user.scheduleOfDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // getDetailDoctor: (idDoctor) => dispatch(actions.detailDoctor(idDoctor)),
    getDoctorSchedule: (doctorId, date) =>
      dispatch(actions.fetchDoctorSchedule(doctorId, date)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule)
);
