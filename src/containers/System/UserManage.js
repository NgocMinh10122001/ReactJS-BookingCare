import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { handleRenderUsers } from "../../services/userService";
import {
  getAllUsers,
  createNewUserService,
  deleteUserService,
  updateUserService,
} from "../../services/userService";
import "./UserManage.scss";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";

class UserManage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: "",
      arrUsers: "",
      isOpenModalUser: false,
      isOpenModalEditUser: false,
      userUpdate: {},
    };
  }

  async componentDidMount() {
    await this.getAllUsersFromReact();
  }

  getAllUsersFromReact = async () => {
    let response = await getAllUsers("All");
    console.log("data node js", response);
    if (response && response.errCode === 0) {
      this.setState(
        {
          arrUsers: response.users,
        }
        // () => {
        //   console.log(this.state.arrUsers);
        // }
      );
    }
  };

  // add user
  handleAddNewUser = () => {
    // alert("minh dz added!");
    this.setState({
      isOpenModalUser: true,
    });
  };
  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
      // isOpenModalEditUser: !this.state.isOpenModalUser,
    });
  };
  toggleUserModalEdit = () => {
    this.setState({
      // isOpenModalUser: !this.state.isOpenModalUser,
      isOpenModalEditUser: !this.state.isOpenModalEditUser,
    });
  };

  handleCreateUser = async (user) => {
    try {
      console.log(user);
      let response = await createNewUserService(user);
      // console.log(response);
      if (response && response.errCode !== 0) {
        alert("sai r");
      } else {
        await this.getAllUsersFromReact();
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleDeleteUser = async (user) => {
    try {
      let res = await deleteUserService(user.id);
      //  console.log(res);
      if (res && res.errCode !== 0) {
        alert("Missing parameter id!");
      } else {
        await this.getAllUsersFromReact();
      }
    } catch (e) {
      console.log(e);
    }
  };
  handleEditUser = (user) => {
    this.setState({
      isOpenModalEditUser: true,
      userUpdate: user,
    });
  };

  handleUpdateUser = async (user) => {
    // console.log(user);
    try {
      // console.log(user);
      let response = await updateUserService(user);
      console.log(response);
      if (response && response.errCode !== 0) {
        alert("sai r");
      } else {
        await this.getAllUsersFromReact();
      }
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    // console.log(this.state);
    let { arrUsers } = this.state;
    // console.log(arrUsers);
    return (
      <div className="user-container">
        {this.state.isOpenModalUser ? (
          <ModalUser
            isOpen={this.state.isOpenModalUser}
            toggleUserModal={this.toggleUserModal}
            handleCreateUser={this.handleCreateUser}
          />
        ) : (
          ""
        )}
        {this.state.isOpenModalEditUser ? (
          <ModalEditUser
            isOpen={this.state.isOpenModalEditUser}
            toggleUserModal={this.toggleUserModalEdit}
            updateUser={this.state.userUpdate}
            // handleCreateUser={this.handleCreateUser}
            handleUpdateUser={this.handleUpdateUser}
          />
        ) : (
          ""
        )}
        <div
          className="text-center mt-3 mb-3"
          style={{ fontSize: "20px", fontWeight: 600 }}
        >
          Manage users
        </div>
        <div className="mb-4 add-user">
          <button
            className="btn btn-primary add-user-btn"
            onClick={() => this.handleAddNewUser()}
          >
            <i className="fas fa-plus "></i>
            <span>Add New User</span>
          </button>
        </div>
        <div>
          <table id="customers">
            <thead>
              <tr>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* {console.log(arrUsers)} */}
              {arrUsers && arrUsers.length > 0
                ? arrUsers.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.email}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.address}</td>
                        <td className="d-flex justify-content-around">
                          <button
                            className="btn btn-warning"
                            style={{ width: "40%" }}
                            onClick={() => {
                              this.handleEditUser(item);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger"
                            style={{ width: "40%" }}
                            onClick={() => this.handleDeleteUser(item)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
