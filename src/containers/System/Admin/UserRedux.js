import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllCodeService } from "../../../services/userService";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import TableManageUser from "./TableManageUser";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positions: [],
      roles: [],
      previewImgURL: "",
      isOpen: false,
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phonenumber: "",
      address: "",
      gender: "",
      position: "",
      role: "",
      avatar: "",
    };
  }

  async componentDidMount() {
    // this.props.dispatch(actions.fetchGenderStart())
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
    // try {
    //   let res = await getAllCodeService("gender");
    //   // console.log("check gender", res);
    //   this.setState({
    //     gender: res.data,
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.genderRedux !== this.props.genderRedux
      // prevProps.positions !== this.props.positions
    ) {
      let arrGender = this.props.genderRedux;
      this.setState({
        genderArr: arrGender,
        gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : "",
        // positions: this.props.positions,
      });
    }
    if (prevProps.positions !== this.props.positions) {
      let arrPosition = this.props.positions;
      // console.log("check pos", arrPosition);

      this.setState({
        positions: arrPosition,
        position:
          arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : "",
      });
    }
    if (prevProps.roles !== this.props.roles) {
      let arrroles = this.props.roles;

      // console.log("check pros role", this.props.roles);
      this.setState({
        roles: arrroles,
        role: arrroles && arrroles.length > 0 ? arrroles[0].keyMap : "",
      });
    }
    if (prevProps.allUsers !== this.props.allUsers) {
      // let usersArr = this.props.allUsers;
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phonenumber: "",
        address: "",
        // gender: "",
        // position: "",
        // role: "",
        avatar: "",
        previewImgURL: "",
      });
    }
    if (prevProps.user !== this.props.user) {
      // let usersArr = this.props.allUsers;
      let user = this.props.user;
      let imageBase64 = "";
      //  let { avatar } = this.state;
      if (user.image) {
        imageBase64 = new Buffer(user.image, "base64").toString("binary");
      }
      console.log("check user", user);
      this.setState({
        email: user.email,
        // password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        phonenumber: user.phonenumber,
        address: user.address,
        gender: user.gender,
        position: user.positionId,
        role: user.roleId,
        avatar: user.image,
        previewImgURL: imageBase64,
      });
    }
    if (prevProps.isCancelUU !== this.props.isCancelUU) {
      // let usersArr = this.props.allUsers;
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phonenumber: "",
        address: "",
        gender: "",
        position: "",
        role: "",
        avatar: "",
        previewImgURL: "",
      });
    }
  }
  handleOnchangeImg = async (event) => {
    let data = event.target.files;
    let file = data[0];
    console.log("check file", file);
    if (file) {
      let objURL = URL.createObjectURL(file);
      let base64 = await CommonUtils.getBase64(file);
      console.log("check base64", base64);
      this.setState({
        previewImgURL: objURL,
        avatar: base64,
      });
    }
    // console.log("check avatar", this.state.avatar);
  };
  openPreviewImg = () => {
    this.setState({
      isOpen: true,
    });
  };
  checkValidateInput = () => {
    let isVald = true;
    let arrValInp = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phonenumber",
      "address",
      "gender",
      "position",
      "role",
      "avatar",
    ];
    for (let index = 0; index < arrValInp.length; index++) {
      if (!this.state[arrValInp[index]]) {
        isVald = false;
        alert(
          `Missing parameter ${arrValInp[index]}, please fill in the blank!`
        );
        break;
      }
    }
    return isVald;
  };
  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;

    // fire redux action

    // console.log("check state", this.state);
    this.props.createNewUser({
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      phonenumber: this.state.phonenumber,
      gender: this.state.gender,
      //   image: DataTypes.STRING,
      roleId: this.state.role,
      positionId: this.state.position,
      avatar: this.state.avatar,
    });
    // alert("add new user success!");
  };
  onChangeInput = (event) => {
    // event.preventDefault();
    // truyen them tham so id
    // copyState[id] = event.target.value
    let name = event.target.name;
    let value = event.target.value;
    this.setState(
      {
        [name]: value,
      }
      // () => {
      //   console.log("check state", this.state);
      // }
    );
  };

  handleUpdateUser = () => {
    // let isValid = this.checkValidateInput();
    // if (isValid === false) return;
    // fire redux action
    console.log("check state", this.state.avatar);
    this.props.updateUser({
      id: this.props.user.id,
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      phonenumber: this.state.phonenumber,
      gender: this.state.gender,
      // image: DataTypes.STRING,
      avatar: this.state.avatar,
      roleId: this.state.role,
      positionId: this.state.position,
    });
  };

  handelCancelUpdateUser = () => {
    this.props.cancelUpdateUser();
  };
  render() {
    let genders = this.state.genderArr;
    let positions = this.state.positions;
    let roles = this.state.roles;

    let { language, isLoading, isEdited } = this.props;
    // console.log("check isEdit", isEdited);

    let {
      email,
      password,
      firstName,
      lastName,
      phonenumber,
      address,
      gender,
      position,
      role,
    } = this.state;
    return (
      <div className="user-redux-container">
        {/* <div>{isLoading === true ? "Mihdz loadiung ...." : ""} </div> */}
        <div className="title">
          {/* Create User With Redux */}
          <FormattedMessage id="manage-user.add" />
        </div>
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-3">
                <label>
                  {/* Email */}
                  <FormattedMessage id="manage-user.email" />
                </label>
                {isEdited ? (
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(event) => {
                      this.onChangeInput(event);
                    }}
                    disabled
                  />
                ) : (
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(event) => {
                      this.onChangeInput(event);
                    }}
                  />
                )}
              </div>
              <div className="col-3">
                <label>
                  {/* Password */}
                  <FormattedMessage id="manage-user.password" />
                </label>
                {isEdited ? (
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(event) => {
                      this.onChangeInput(event);
                    }}
                    disabled
                  />
                ) : (
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(event) => {
                      this.onChangeInput(event);
                    }}
                  />
                )}
              </div>
              <div className="col-3">
                <label>
                  {/* First Name */}
                  <FormattedMessage id="manage-user.first-name" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={(event) => {
                    this.onChangeInput(event);
                  }}
                />
              </div>
              <div className="col-3">
                <label>
                  {/* Last Name */}
                  <FormattedMessage id="manage-user.last-name" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={(event) => {
                    this.onChangeInput(event);
                  }}
                />
              </div>
              {/* <div className="btn btn-primary">minh dz</div> */}
              <div className="col-3">
                <label>
                  {/* Address */}
                  <FormattedMessage id="manage-user.address" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="address"
                  value={address}
                  onChange={(event) => {
                    this.onChangeInput(event);
                  }}
                />
              </div>
              <div className="col-3">
                <label>
                  {/* Sex */}
                  <FormattedMessage id="manage-user.gender" />
                </label>
                <select
                  id="inputState"
                  className="form-control"
                  name="gender"
                  onChange={(event) => {
                    this.onChangeInput(event);
                  }}
                  value={gender}
                >
                  {genders &&
                    genders.length &&
                    genders.map((item, index) => {
                      return (
                        // <>
                        //   {gender === item.keyMap ? (
                        //     <option key={index} defaultValue>
                        //       {language === LANGUAGES.VI
                        //         ? item.valueVi
                        //         : item.valueEn}
                        //     </option>
                        //   ) : (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                        //   )}
                        // </>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>
                  {/* Role */}
                  <FormattedMessage id="manage-user.role" />
                </label>
                <select
                  className="form-control"
                  name="role"
                  onChange={(event) => {
                    this.onChangeInput(event);
                  }}
                  value={role}
                >
                  {roles &&
                    roles.length &&
                    roles.map((item, index) => {
                      // console.log("check role", roles);

                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>
                  {/* Phone Number */}
                  <FormattedMessage id="manage-user.phone-number" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="phonenumber"
                  value={phonenumber}
                  onChange={(event) => {
                    this.onChangeInput(event);
                  }}
                />
              </div>
              <div className="col-3">
                <label>
                  {/* Position */}
                  <FormattedMessage id="manage-user.position" />
                </label>
                <select
                  className="form-control"
                  name="position"
                  onChange={(event) => {
                    this.onChangeInput(event);
                  }}
                  value={position}
                >
                  {/* {console.log("check pos", positions)} */}
                  {positions &&
                    positions.length &&
                    positions.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.img" />
                </label>
                <div className="mt-1">
                  <input
                    id="preview-img"
                    className="form-control"
                    type="file"
                    hidden
                    onChange={(event) => {
                      this.handleOnchangeImg(event);
                    }}
                  />
                  <label htmlFor="preview-img">
                    <span
                      className="upload-text text-primary border-bottom border-primary"
                      style={{ cursor: "pointer" }}
                    >
                      <FormattedMessage id="manage-user.upload-img" />
                    </span>
                    <i className="fas fa-upload ms-2" />
                  </label>
                  <div
                    className="preview-img border border-primary mt-1"
                    style={{
                      width: "100%",
                      height: "100px",
                      backgroundImage: `url(${this.state.previewImgURL})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center center",
                      backgroundRepeat: "no-repeat",
                    }}
                    onClick={() => {
                      this.openPreviewImg();
                    }}
                  ></div>
                </div>
              </div>
              {isEdited === false ? (
                <div className="col-12 d-flex justify-content-center mt-4">
                  <button
                    className="btn btn-primary col-2 "
                    onClick={() => {
                      this.handleSaveUser();
                    }}
                  >
                    {/* Create New User */}
                    <FormattedMessage id="manage-user.add" />
                  </button>
                </div>
              ) : (
                ""
              )}
              {isEdited === true ? (
                <div className="col-12 d-flex justify-content-center mt-4">
                  <button
                    className="btn-save btn btn-info me-2"
                    onClick={(event) => {
                      this.handleUpdateUser(event);
                    }}
                  >
                    <FormattedMessage id="manage-user.save" />
                  </button>
                  <button
                    className="btn-save btn btn-info"
                    onClick={() => this.handelCancelUpdateUser()}
                  >
                    <FormattedMessage id="manage-user.cancel" />
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          {this.state.isOpen === true && (
            <Lightbox
              mainSrc={this.state.previewImgURL}
              onCloseRequest={() => this.setState({ isOpen: false })}
            />
          )}
        </div>
        <div className="user-redux-table mt-5 mb-5">
          <TableManageUser />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    isLoading: state.admin.isLoading,
    positions: state.admin.positions,
    roles: state.admin.roles,
    allUsers: state.admin.allUsers,
    user: state.admin.user,
    isEdited: state.admin.isEdit,
    isCancelUU: state.admin.isCancelUU,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionSuccess()),
    getRoleStart: () => dispatch(actions.fetchRoleSuccess()),
    createNewUser: (dataUser) =>
      dispatch(actions.createNewUserSuccess(dataUser)),
    getAllUsers: (data) => dispatch(actions.fetchAllUserSuccess(data)),
    updateUser: (userUpdate) => dispatch(actions.updateUser(userUpdate)),
    cancelUpdateUser: () => dispatch(actions.cancelUpdateUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
