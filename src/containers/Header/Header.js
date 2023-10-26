import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, doctorMenu } from "./menuApp";
import "./Header.scss";
import { LANGUAGES, ROLES } from "../../utils/constant";
import { FormattedMessage } from "react-intl";
import _ from "lodash";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuApp: [],
    };
  }
  handleChangeLang = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  componentDidMount() {
    // console.log("check userInfo", this.props.userInfo);
    let { userInfo } = this.props;
    let menu = [];
    if (userInfo && !_.isEmpty(userInfo)) {
      if (userInfo.roleId === ROLES.ADMIN) {
        menu = adminMenu;
      } else if (userInfo.roleId === ROLES.DOCTOR) {
        menu = doctorMenu;
      }
    }
    this.setState({
      menuApp: menu,
    });
  }
  render() {
    const { processLogout, language, userInfo } = this.props;
    let { menuApp } = this.state;
    // console.log(userInfo);
    // console.log(language);

    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={menuApp} />
        </div>
        <div className="languages">
          <span className="welcome me-3">
            <FormattedMessage id="home-header.welcome" />{" "}
            {userInfo && userInfo.firstName ? userInfo.firstName : ""}
          </span>
          <span
            className={
              language === LANGUAGES.VI
                ? "language-vi me-2 active"
                : "language-vi me-2"
            }
            onClick={() => {
              this.handleChangeLang(LANGUAGES.VI);
            }}
          >
            VN
          </span>
          <span
            className={
              language === LANGUAGES.EN
                ? "language-en me-3 active"
                : "language-en me-3"
            }
            onClick={() => {
              this.handleChangeLang(LANGUAGES.EN);
            }}
          >
            EN
          </span>
          <div
            className="btn btn-logout"
            onClick={processLogout}
            title="log out"
          >
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
        {/* nút logout */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) =>
      dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
