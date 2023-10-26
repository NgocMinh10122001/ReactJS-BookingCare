import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ModalUser.scss";
class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phonenumber: "",
      gender: "",
      roleId: "",
    };
  }

  componentDidMount() {}

  // this.state.email === this.state['email']
  toggle = () => {
    this.props.toggleUserModal();
  };

  handleChangeInput = (event, name) => {
    // console.log(event.target.value);
    // bad code (modify state and clone state again)
    // handleChangeInput = (event,name) => {
    // this.state[name] = event.target.value
    // this.setState({
    //   ...this.state
    // })
    // good code
    let copyState = { ...this.state };
    // console.log("check name", copyState[name]);
    copyState[name] = event.target.value;

    this.setState({
      ...copyState,
    });

    // good code 2
    // let name = event.target.name;
    // let value = event.target.value;
    // this.setState({
    //   [name]: value,
    // });
    // console.log("check name", event.target.name);
  };

  handleValidateInput = () => {
    let isValid = true;
    let arrInput = [
      "email",
      "password",
      "firstName",
      "lastName",
      "address",
      "phonenumber",
      "gender",
      "roleId",
    ];

    for (let index = 0; index < arrInput.length; index++) {
      // console.log(this.state[arrInput[index]]);
      if (!this.state[arrInput[index]]) {
        isValid = false;
        alert("Missing parameter" + arrInput[index]);
        break;
      }
    }

    return isValid;
  };

  handleAddNewUser = () => {
    let isValid = this.handleValidateInput();
    if (isValid === true) {
      this.props.handleCreateUser(this.state);
    }
    this.props.toggleUserModal();
    // console.log("check state", this.state);
  };

  render() {
    // console.log("check props", this.props);
    // console.log("check prop isOpen", this.props.isOpen);
    return (
      <Modal
        // centered
        size="lg"
        isOpen={this.props.isOpen}
        toggle={() => this.toggle()}
      >
        <ModalHeader toggle={() => this.toggle()}>Create New User</ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="form-row">
              <div className="form-group col-6">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  onChange={(event) => {
                    this.handleChangeInput(event, "email");
                  }}
                  value={this.state.email}
                />
              </div>
              <div className="form-group col-6">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  onChange={(event) => {
                    this.handleChangeInput(event, "password");
                  }}
                  value={this.state.password}
                />
              </div>
            </div>
            <div className="form-group">
              <label>First Name :</label>
              <input
                type="text"
                className="form-control"
                placeholder="1234 Main St"
                name="firstName"
                onChange={(event) => {
                  this.handleChangeInput(event, "firstName");
                }}
                value={this.state.firstName}
              />
            </div>
            <div className="form-group">
              <label>Last Name :</label>
              <input
                type="text"
                className="form-control"
                placeholder="Apartment, studio, or floor"
                name="lastName"
                onChange={(event) => {
                  this.handleChangeInput(event, "lastName");
                }}
                value={this.state.lastName}
              />
            </div>
            <div className="form-group">
              <label>Address :</label>
              <input
                type="text"
                className="form-control"
                placeholder="Apartment, studio, or floor"
                name="address"
                onChange={(event) => {
                  this.handleChangeInput(event, "address");
                }}
                value={this.state.address}
              />
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Phone number :</label>
                <input
                  type="text"
                  className="form-control"
                  name="phonenumber"
                  onChange={(event) => {
                    this.handleChangeInput(event, "phonenumber");
                  }}
                  value={this.state.phonenumber}
                />
              </div>
              <div className="form-group col-md-4">
                <label>Sex :</label>
                <select
                  name="gender"
                  className="form-control"
                  onChange={(event) => {
                    this.handleChangeInput(event, "gender");
                  }}
                >
                  <option value="1">Male</option>
                  <option value="0">Female</option>
                </select>
              </div>
              <div className="form-group col-md-2">
                <label>Role : </label>
                <select
                  name="roleId"
                  className="form-control"
                  onChange={(event) => {
                    this.handleChangeInput(event, "roleId");
                  }}
                  value={this.state.roleId}
                >
                  <option value="1">Admin</option>
                  <option value="2">Doctor</option>
                  <option value="3">Patient</option>
                </select>
              </div>
            </div>
            <input type="text" name="id" hidden />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="btn-save"
            color="primary"
            onClick={() => this.handleAddNewUser()}
          >
            Save
          </Button>{" "}
          <Button
            className="btn-cancel"
            color="secondary"
            onClick={() => this.toggle()}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
