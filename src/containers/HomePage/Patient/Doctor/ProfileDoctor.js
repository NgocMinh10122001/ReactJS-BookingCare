import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import "./ProfileDoctor.scss";
// import { LANGUAGES } from "../../../../utils/constant";
import * as actions from "../../../../store/actions";
import { FormattedMessage } from "react-intl";
// import localization from "moment/locale/vi";

import { LANGUAGES } from "../../../../utils/constant";
import moment from "moment";

class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileDoctor: {},
      scheduleDoctor: {},
    };
  }
  async componentDidMount() {
    let { scheduleDoctor } = this.props;
    // console.log("chcsk e", scheduleDoctor);
    let doctorId = scheduleDoctor.doctorId;
    await this.props.getProfileDoctorById(doctorId);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.profileDoctor !== this.props.profileDoctor) {
      let { profileDoctor, scheduleDoctor } = this.props;
      this.setState({
        profileDoctor: profileDoctor,
        scheduleDoctor: scheduleDoctor,
      });
      this.props.getProfileToNest(profileDoctor);
    }
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    let { profileDoctor, scheduleDoctor } = this.state;
    let { language } = this.props;
    // console.log("chcek schedule", scheduleDoctor);
    // console.log("chcek pro", profileDoctor);
    return (
      <div className="booking-schedule-header">
        <div
          className="doctor-image"
          style={
            profileDoctor &&
            profileDoctor.image && {
              backgroundImage: `url(${profileDoctor.image})`,
            }
          }
        ></div>
        <div className="doctor-intro">
          <div>Dat lich kham</div>
          <div>
            {profileDoctor && profileDoctor.positionData
              ? language === LANGUAGES.VI
                ? profileDoctor.positionData.valueVi +
                  " " +
                  profileDoctor.firstName +
                  " " +
                  profileDoctor.lastName
                : profileDoctor.positionData.valueEn +
                  " " +
                  profileDoctor.firstName +
                  " " +
                  profileDoctor.lastName
              : ""}
          </div>
          <div>
            {scheduleDoctor && scheduleDoctor.date
              ? language === LANGUAGES.VI
                ? this.capitalizeFirstLetter(
                    moment(scheduleDoctor.date).format("dddd - MM/DD/YYYY")
                  )
                : moment(scheduleDoctor.date)
                    .locale("en")
                    .format("dddd - DD/MM/YYYY")
              : ""}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    // detailDoctor: state.user.detailDoctor,
    // scheduleOfDoctor: state.user.scheduleOfDoctor,
    profileDoctor: state.user.profileDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProfileDoctorById: (doctorId) =>
      dispatch(actions.fetchProfileDoctorById(doctorId)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor)
);
