import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils/constant";
import { changeLanguageApp } from "../../store/actions/appActions";
import { withRouter } from "react-router";

class HomeHeader extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
    // alert(language);
    // fire redux event : actions
  };
  handleBackHome = () => {
    this.props.history.push("/home");
  };
  render() {
    let language = this.props.language;
    // console.log("check isBanner", this.props.isBanner);
    // console.log(language);
    // console.log(this.props);
    // let searchInput = <FormattedMessage id="home-header.specialist" />;
    // console.log(searchInput);
    return (
      <>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars"></i>
              <div
                className="header-logo"
                onClick={() => this.handleBackHome()}
              ></div>
            </div>
            <div className="center-content">
              <div className="child-content">
                <div>
                  <b>
                    {/* Chuyên khoa */}
                    <FormattedMessage id="home-header.specialist" />
                  </b>
                </div>
                <div className="sub-title">
                  {/* Tìm bác sĩ theo chuyên khoa */}
                  <FormattedMessage id="home-header.search-doctor" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    {/* Cơ sở y tế */}
                    <FormattedMessage id="home-header.health-facilities" />
                  </b>
                </div>
                <div className="sub-title">
                  {/* Chọn bệnh viện phòng khám */}
                  <FormattedMessage id="home-header.choose-hospital-clinic" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    {/* Bác sĩ */}
                    <FormattedMessage id="home-header.doctor" />
                  </b>
                </div>
                <div className="sub-title">
                  {/* Chọn bác sĩ giỏi */}
                  <FormattedMessage id="home-header.choose-a-good-doctor" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    {/* Gói khám */}
                    <FormattedMessage id="home-header.checkup-package" />
                  </b>
                </div>
                <div className="sub-title">
                  {/* Khám sức khoẻ tổng quát */}
                  <FormattedMessage id="home-header.general-health-check" />
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <i className="fas fa-question-circle"></i>
                <span>
                  {/* Hỗ trợ */}
                  <FormattedMessage id="home-header.support" />
                </span>
              </div>
              <div
                className={
                  language === LANGUAGES.VI
                    ? "language-vi active"
                    : "language-vi"
                }
              >
                {/* VN */}
                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                  <FormattedMessage id="home-header.language-vi" />
                </span>
              </div>
              <div
                className={
                  language === LANGUAGES.EN
                    ? "language-en active"
                    : "language-en"
                }
              >
                {/* EN */}
                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                  <FormattedMessage id="home-header.language-en" />
                </span>
              </div>
            </div>
          </div>
        </div>
        {this.props.isBanner !== false ? (
          <div className="home-header-banner">
            <div className="content-up">
              <div className="title1">
                {/* NỀN TẢNG Y TẾ */}
                <FormattedMessage id="banner.medical-background" />
              </div>
              <div className="title2">
                {/* CHĂM SÓC SỨC KHỎE TOÀN DIỆN */}
                <FormattedMessage id="banner.comprehensive-health-care" />
              </div>
              <div className="search">
                <i className="fas fa-search"></i>
                <input type="text" placeholder="Tìm một chuyên khoa y tế" />
              </div>
            </div>

            <div className="content-down">
              <div className="options">
                <div className="option-child">
                  <div className="icon-child">
                    <i className="far fa-hospital"></i>
                  </div>
                  <div className="text-child">
                    {/* Khám chuyên khoa */}
                    <FormattedMessage id="banner.specialist-examination" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-mobile-alt"></i>
                  </div>
                  <div className="text-child">
                    {/* Khám từ xa */}
                    <FormattedMessage id="banner.remote-examination" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-procedures"></i>
                  </div>
                  <div className="text-child">
                    {/* Khám tổng quát */}
                    <FormattedMessage id="banner.general-examination" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fa fa-search" aria-hidden="true"></i>
                  </div>
                  <div className="text-child">
                    {/* Xét nghiệm y học */}
                    <FormattedMessage id="banner.medical-test" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-user-md"></i>
                  </div>
                  <div className="text-child">
                    {/* Sức khoẻ tinh thần */}
                    <FormattedMessage id="banner.mental-health" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fa fa-flask" aria-hidden="true"></i>
                  </div>
                  <div className="text-child">
                    {/* Khám nha khoa */}
                    <FormattedMessage id="banner.dental-examination" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
