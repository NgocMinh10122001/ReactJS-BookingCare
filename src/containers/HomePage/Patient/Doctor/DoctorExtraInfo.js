import React, { Component } from "react";
import { connect } from "react-redux";
// import vtv1 from "../../../assets/vtv1.png";
import { withRouter } from "react-router";
import "./DoctorExtraInfo.scss";
import moment from "moment";
// import localization from "moment/locale/vi";
import { LANGUAGES } from "../../../../utils/constant";
import * as actions from "../../../../store/actions";
import { FormattedMessage } from "react-intl";
const formatterVi = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});
const formatterEn = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

class DoctorExtraInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowHide: true,
      extraDoctorInfo: "",
    };
  }
  async componentDidMount() {
    this.props.fetchExtraDoctorInfo(this.props.doctorId);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.extraDoctorInfo !== this.props.extraDoctorInfo) {
      let extraDoctorInfo = this.props.extraDoctorInfo;
      if (extraDoctorInfo) {
        this.setState({
          extraDoctorInfo: extraDoctorInfo,
        });
      }
    }
  }
  handleShowHide = () => {
    this.setState({
      isShowHide: !this.state.isShowHide,
    });
  };

  // setValueLang = (data) => {
  //   let value = data.find(item => )
  // }

  render() {
    let { isShowHide, extraDoctorInfo } = this.state;
    // console.log(
    //   "chcek extra",
    //   extraDoctorInfo ? this.state.extraDoctorInfo.provinceData.valueVi : ""
    // );
    let { language } = this.props;
    return (
      <div className="doctor-extra-container">
        <div className="address-clinic">
          <div className="address-title">
            <FormattedMessage id="patient.detail-doctor.address-clinic" />
          </div>
          <div className="address-detail">
            <div className="tit">{extraDoctorInfo.nameClinic}</div>
            <div className="address">
              {extraDoctorInfo.addressClinic}{" "}
              {extraDoctorInfo
                ? language === LANGUAGES.VI
                  ? extraDoctorInfo.provinceData.valueVi
                  : extraDoctorInfo.provinceData.valueEn
                : ""}
            </div>
          </div>
        </div>
        <div className="price">
          <span className="title-price">
            <FormattedMessage id="patient.detail-doctor.price-examination" /> :{" "}
          </span>
          <span className="short-price">
            {/* {console.log("check", extraDoctorInfo.priceData)} */}
            {extraDoctorInfo
              ? language === LANGUAGES.VI
                ? formatterVi.format(extraDoctorInfo.priceData.valueVi)
                : formatterEn.format(extraDoctorInfo.priceData.valueEn)
              : ""}
          </span>
          {isShowHide ? (
            ""
          ) : (
            <div className="detail-price">
              Gia kham duoc uu tien kham truoc khi dat qua booking care. Gia
              kham cho nguoi nuoc ngoai la <span className="US">{}</span>{" "}
              <span className="VN">{}</span> Nguoi benh co the thanh toan chi
              phi bang{" "}
              {extraDoctorInfo
                ? language === LANGUAGES.VI
                  ? extraDoctorInfo.paymentData.valueVi
                  : extraDoctorInfo.paymentData.valueEn
                : ""}{" "}
              hinh thuc
            </div>
          )}
        </div>
        {isShowHide ? (
          <div
            className="btn-detail-price"
            onClick={() => this.handleShowHide()}
          >
            <FormattedMessage id="patient.detail-doctor.show" />
          </div>
        ) : (
          <div
            className="btn-hidden-detail-price"
            onClick={() => this.handleShowHide()}
          >
            <FormattedMessage id="patient.detail-doctor.hidden" />
          </div>
        )}
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
    extraDoctorInfo: state.user.extraDoctorInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // getDetailDoctor: (idDoctor) => dispatch(actions.detailDoctor(idDoctor)),
    // getDoctorSchedule: (doctorId, date) =>
    //   dispatch(actions.fetchDoctorSchedule(doctorId, date)),
    fetchExtraDoctorInfo: (doctorId) =>
      dispatch(actions.fetchExtraDoctorInfo(doctorId)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo)
);
