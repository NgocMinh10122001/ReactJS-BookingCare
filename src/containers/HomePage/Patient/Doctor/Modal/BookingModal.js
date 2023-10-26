import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import "./BookingModal.scss";
// import { LANGUAGES } from "../../../../utils/constant";
// import * as actions from "../../../../store/actions";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import * as actions from "../../../../../store/actions";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Col,
  Input,
  FormText,
  Form,
} from "reactstrap";
import ProfileDoctor from "../ProfileDoctor";
import { LANGUAGES } from "../../../../../utils/constant";
import DatePicker from "../../../../../components/Input/DatePicker";
import { forEach } from "lodash";
import { toast } from "react-toastify";

const formatterVi = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});
const formatterEn = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // currentDate: new Date().setHours(0, 0, 0, 0),
      scheduleModal: "",
      profileDoctor: "",
      fullName: "",
      phonenumber: "",
      birthday: "",
      email: "",
      address: "",
      description: "",
      genders: "",
      gender: "",
    };
  }
  async componentDidMount() {
    // console.log("chcek props", this.props.scheduleModal);
    this.props.getGenderStart();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.scheduleModal !== this.props.scheduleModal) {
      this.setState({
        scheduleModal: this.props.scheduleModal,
      });
    }
    if (prevProps.genders !== this.props.genders) {
      this.setState({
        genders: this.props.genders,
      });
    }
  }

  handleChange = (selectedOption) => {
    this.setState(
      { selectedOption }
      //       () =>
      //   console.log(`Option selected:`, this.state.selectedOption)
    );
  };
  getProfileToNest = (data) => {
    // console.log("chcek data", data);
    this.setState({
      profileDoctor: data,
    });
  };
  handleOnChangeInput = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    console.log("chcek value", value);
    this.setState({
      [name]: value,
    });
  };
  handleOnchangeDatePicker = (date) => {
    // console.log("check", date);

    this.setState({
      birthday: date[0],
    });
  };
  validInput = () => {
    let isValid = true;
    let arrVal = [
      "gender",
      "fullName",
      "phonenumber",
      "birthday",
      "email",
      "address",
      "description",
    ];

    // arrVal.forEach((item) => {
    //   if (this.state[item] !== "") {
    //     return (isValid = true);
    //   }
    //   return;
    // });
    for (let index = 0; index < arrVal.length; index++) {
      // const element = array[index];
      // console.log("check", this.state[arrValid[index]]);
      if (!this.state[arrVal[index]]) {
        isValid = false;
        toast.error(`Missing parameter ${arrVal[index]}`);
        break;
      }
    }
    return isValid;
  };
  handelSaveInfoPatient = () => {
    let { profileDoctor, scheduleModal } = this.state;
    let lang = this.state;
    // validate
    let doctorName = `${profileDoctor.firstName} ${profileDoctor.lastName}`;
    let isValid = this.validInput();

    if (isValid === true && profileDoctor && scheduleModal) {
      this.props.postBookingAppointment({
        fullName: this.state.fullName,
        phonenumber: this.state.phonenumber,
        birthday: this.state.birthday,
        email: this.state.email,
        address: this.state.address,
        description: this.state.description,
        doctorId: profileDoctor.id,
        gender: this.state.gender,
        timeType: scheduleModal.timeType,
        doctorName: doctorName,
        timeVi: scheduleModal.Allcode.valueVi,
        timeEn: scheduleModal.Allcode.valueEn,
        lang: lang,
      });
      setTimeout(() => {
        toast.success("success!");
        setTimeout(() => {
          this.props.handleToggleModal();
        }, 3000);
      }, 2000);
    }
  };
  render() {
    let { language, isOpen, handleToggleModal } = this.props;
    let {
      gender,
      selectedOption,
      scheduleModal,
      profileDoctor,
      fullName,
      phonenumber,
      birthday,
      email,
      address,
      description,
      genders,
    } = this.state;
    console.log("chcek state", profileDoctor);
    console.log("chcek state2", scheduleModal);

    return (
      <Modal
        isOpen={isOpen}
        centered
        size="lg"
        className="booking-modal-container"
      >
        <ModalHeader className="modal-header">
          <ProfileDoctor
            scheduleDoctor={scheduleModal ? scheduleModal : ""}
            getProfileToNest={this.getProfileToNest}
          />
        </ModalHeader>
        <ModalBody className="modal-body">
          <div className="booking-schedule-middle">
            {/* <div className="price-examination">400.000 d</div> */}
            <Form className="form">
              <FormGroup row className="price-examination">
                <Col sm={3}>
                  Gia kham :{" "}
                  {profileDoctor &&
                  profileDoctor.Doctor_info &&
                  profileDoctor.Doctor_info.priceData
                    ? language === LANGUAGES.VI
                      ? formatterVi.format(
                          profileDoctor.Doctor_info.priceData.valueVi
                        )
                      : formatterEn.format(
                          profileDoctor.Doctor_info.priceData.valueEn
                        )
                    : ""}
                </Col>
                <Col sm={7}>
                  Thoi gian :{" "}
                  {scheduleModal && scheduleModal.Allcode
                    ? language === LANGUAGES.VI
                      ? scheduleModal.Allcode.valueVi
                      : scheduleModal.Allcode.valueEn
                    : ""}
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={10}>
                  <Input
                    // id="exampleEmail"
                    value={fullName}
                    name="fullName"
                    placeholder="Ho ten benh nhan (Bat buoc)"
                    type="text"
                    onChange={(event) => this.handleOnChangeInput(event)}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={10}>
                  <Input
                    // id="exampleEmail"
                    value={phonenumber}
                    name="phonenumber"
                    placeholder="So dien thoai (bat buoc)"
                    type="number"
                    onChange={(event) => this.handleOnChangeInput(event)}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={10}>
                  <DatePicker
                    onChange={this.handleOnchangeDatePicker}
                    className="form-control"
                    value={birthday}
                    // minDate={new Date().setDate(new Date().getDate() - 1)}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={10}>
                  <Input
                    id="examplePassword"
                    value={email}
                    name="email"
                    placeholder="Email"
                    type="email"
                    onChange={(event) => this.handleOnChangeInput(event)}
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col sm={10}>
                  <Input
                    // id="exampleEmail"
                    value={address}
                    name="address"
                    placeholder="Dia chi"
                    type="text"
                    onChange={(event) => this.handleOnChangeInput(event)}
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                {/* <Label for="exampleText" sm={2}>
                  Text Area
                </Label> */}
                <Col sm={10}>
                  <Input
                    id="exampleText"
                    value={description}
                    name="description"
                    type="textarea"
                    onChange={(event) => this.handleOnChangeInput(event)}
                  />
                </Col>
              </FormGroup>

              <FormGroup row tag="fieldset">
                {/* <legend className="col-form-label col-sm-2">
                  Radio Buttons
                </legend> */}
                <Col sm={10}>
                  <FormGroup check className="d-flex ">
                    {genders &&
                      genders.length > 0 &&
                      genders.map((item, index) => {
                        return (
                          <div className="me-5" key={index}>
                            <Input
                              name="gender"
                              type="radio"
                              value={item.keyMap}
                              onChange={(event) =>
                                this.handleOnChangeInput(event)
                              }
                            />{" "}
                            <Label check>
                              {language === LANGUAGES.VI
                                ? item.valueVi
                                : item.valueEn}
                            </Label>
                          </div>
                        );
                      })}
                    {/* <div className="me-5">
                      <Input name="radio2" type="radio" />{" "}
                      <Label check>Nam</Label>
                    </div>
                    <div className="me-5">
                      <Input name="radio2" type="radio" />{" "}
                      <Label check>Nu</Label>
                    </div>
                    <div>
                      <Input name="radio2" type="radio" />{" "}
                      <Label check>Khac</Label>
                    </div> */}
                  </FormGroup>
                </Col>
              </FormGroup>
            </Form>
          </div>
        </ModalBody>
        <ModalFooter className="modal-footer">
          <Button
            color="primary"
            className="btn-modal-save"
            onClick={() => {
              this.handelSaveInfoPatient();
            }}
          >
            Save
          </Button>{" "}
          <Button
            color="secondary"
            className="btn-modal-cancel"
            onClick={handleToggleModal}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    // detailDoctor: state.user.detailDoctor,
    // scheduleOfDoctor: state.user.scheduleOfDoctor,
    genders: state.admin.genders,
    extraDoctorInfo: state.user.extraDoctorInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    postBookingAppointment: (data) =>
      dispatch(actions.postBookingAppointment(data)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BookingModal)
);
