import React, { Component } from "react";
import { connect } from "react-redux";
// import vtv1 from "../../../assets/vtv1.png";
import { withRouter } from "react-router";
import HomeHeader from "../../HomeHeader";
import "./DetailDoctor.scss";
import * as actions from "../../../../store/actions";
import { getDetailDoctor } from "../../../../services/userService";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfo from "./DoctorExtraInfo";

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataDoctor: {},
    };
  }
  async componentDidMount() {
    // console.log("check param", this.props);
    // console.log("check param", this.props.match.params.idDoctor);
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.idDoctor
    ) {
      await this.props.getDetailDoctor(this.props.match.params.idDoctor);
      // console.log("check res", res);
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.detailDoctor !== this.props.detailDoctor
      // prevProps.positions !== this.props.positions
    ) {
      let doctor = this.props.detailDoctor;
      if (doctor) {
        this.setState({
          dataDoctor: doctor,
          // gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : "",
          // positions: this.props.positions,
        });
      }
    }
  }
  render() {
    let { dataDoctor } = this.state;
    // console.log(" check id param", dataDoctor);
    return (
      <>
        <HomeHeader isBanner={false} />
        <div className="detail-doctor-containner">
          <div className="des-top-doctor">
            <div
              className="img-doctor"
              style={
                dataDoctor &&
                dataDoctor.image && {
                  backgroundImage: `url(${dataDoctor.image})`,
                }
              }
            ></div>
            <div className="des-doctor">
              {dataDoctor &&
                dataDoctor.Markdown &&
                dataDoctor.Markdown.description &&
                dataDoctor.Markdown.description}
            </div>
          </div>
          <div className="detail-schedule-doctor ">
            <div className="content-left">
              <DoctorSchedule
                doctorId={
                  this.props.match &&
                  this.props.match.params &&
                  this.props.match.params.idDoctor
                }
              />
            </div>
            <div className="content-right">
              <DoctorExtraInfo
                doctorId={
                  this.props.match &&
                  this.props.match.params &&
                  this.props.match.params.idDoctor
                }
              />
            </div>
          </div>
          <div
            className="detal-doctor-content"
            dangerouslySetInnerHTML={
              dataDoctor &&
              dataDoctor.Markdown &&
              dataDoctor.Markdown.contentHTML && {
                __html: dataDoctor.Markdown.contentHTML,
              }
            }
          >
            {/* {dataDoctor &&
              dataDoctor.Markdown &&
              dataDoctor.Markdown.contentHTML &&
              dataDoctor.Markdown.contentHTML} */}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    detailDoctor: state.user.detailDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDetailDoctor: (idDoctor) => dispatch(actions.detailDoctor(idDoctor)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DetailDoctor)
);
