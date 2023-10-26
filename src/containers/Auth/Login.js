import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
// import * as actions from "../store/actions";
import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { handleLoginApi } from "../../services/userService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      isShowPassword: true,
      errMessage: "",
    };
  }
  handleChangeUserName = (event) => {
    console.log(event.target.value);
    this.setState({
      userName: event.target.value,
    });
  };
  handleChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });
    try {
      let data = await handleLoginApi(this.state.userName, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errCode === 0) {
        // console.log("login success!");
        // action.userLoginSuccess(data.user);
        this.props.userLoginSuccess(data.user);
      }
    } catch (e) {
      // console.log(e);
      if (e.response) {
        if (e.response.data) {
          this.setState({
            errMessage: e.response.data.message,
          });
        }
      }
    }

    // handleLoginApi();
  };
  handleShowHidePassword = () => {
    // alert("click me");
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };
  handleKeyDown = (event) => {
    if ((event.key = "Enter" || event.keyCode === 13)) {
      this.handleLogin();
    }
  };
  render() {
    //   JSX
    return (
      <div className="login-bg">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-login">Login</div>
            <div className="col-12 form-group login-input">
              <label>User Name :</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your User Name"
                value={this.state.userName}
                onChange={(event) => this.handleChangeUserName(event)}
              />
            </div>
            <div className="col-12 form-group login-input">
              <label>Password :</label>
              <div className="custom-input-password">
                <input
                  type={this.state.isShowPassword ? "password" : "text"}
                  className="form-control"
                  placeholder="Enter your Password"
                  onChange={(event) => this.handleChangePassword(event)}
                  onKeyDown={(event) => this.handleKeyDown(event)}
                />
                <span onClick={() => this.handleShowHidePassword()}>
                  <i
                    className={
                      this.state.isShowPassword
                        ? "far fa-eye"
                        : "far fa-eye-slash"
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div className="col-12" style={{ color: "red" }}>
              {this.state.errMessage}
            </div>
            <div className="col-12">
              <button
                type="button"
                className="btn-login"
                onClick={() => this.handleLogin()}
              >
                Log in
              </button>
            </div>
            <div className="col-12 ">
              <span className="forgot-password">Forgot your password ?</span>
            </div>
            <div className="col-12 text-center other-login">
              <span className="text-other-login">Or Login with :</span>
            </div>
            <div className="col-12 social-login">
              <i className="fab fa-google-plus-g google"></i>
              <i className="fab fa-facebook-f facebook"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
