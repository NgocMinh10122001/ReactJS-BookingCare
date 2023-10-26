import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
// import "./ConfirmAppointment.scss";
// import { LANGUAGES } from "../../../../utils/constant";
import * as actions from "../../../../store/actions";
import { FormattedMessage } from "react-intl";
// import localization from "moment/locale/vi";

import { LANGUAGES, path } from "../../../../utils/constant";
import moment from "moment";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
// import { useSearchParams } from "react-router-dom";
// import { useSearchParams } from "react-router-dom";

class ConfirmAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookinged: false,
    };
  }
  async componentDidMount() {
    let urlParams = new URLSearchParams(this.props.location.search);
    let token = urlParams.get("token");
    let doctorId = urlParams.get("doctorId");
    console.log("check link1", token);
    console.log("check link1", doctorId);
    if (!token && !doctorId) {
      toast.error("Confirm failure!");
    } else {
      this.props.confirmBookingSuccess(token, doctorId);
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.bookinged !== this.props.bookinged) {
      this.setState({
        bookinged: this.props.bookinged,
      });
      toast.success("Confirm Booking Success!");
    }
  }

  render() {
    return (
      <div className="confirm-booking-appointment-container">
        Xac nhan thanh cong
        <Link to={path.HOMEPAGE}>Go home</Link>
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
    bookinged: state.user.bookinged,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProfileDoctorById: (doctorId) =>
      dispatch(actions.fetchProfileDoctorById(doctorId)),
    confirmBookingSuccess: (token, doctorId) =>
      dispatch(actions.confirmBooking(token, doctorId)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ConfirmAppointment)
);
