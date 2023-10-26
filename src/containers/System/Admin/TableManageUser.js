import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "../UserManage.scss";

class TableManageUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usersRedux: [],
    };
  }
  componentDidMount() {
    this.props.getAllUsers("All");
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.allUsers !== this.props.allUsers
      // prevProps.positions !== this.props.positions
    ) {
      let usersArr = this.props.allUsers;
      this.setState({
        usersRedux: usersArr,
        // gender: arrGender && arrGender.length > 0 ? arrGender[0].key : "",
        // positions: this.props.positions,
      });
    }
  }
  handleDeleteUser = (userDlt) => {
    this.props.deleteUser(userDlt);
    // this.props.toastify("")
  };

  handleEdit = (userId) => {
    // console.log("check id", userId);
    this.props.editUser(userId);
  };

  render() {
    let { usersRedux } = this.state;
    // console.log("check users", usersRedux);
    return (
      <>
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
            {/* {console.log(usersRedux)} */}
            {usersRedux && usersRedux.length > 0
              ? usersRedux.map((item, index) => {
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
                          onClick={() => this.handleEdit(item.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          style={{ width: "40%" }}
                          onClick={() => this.handleDeleteUser(item.id)}
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
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allUsers: state.admin.allUsers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsers: (data) => dispatch(actions.fetchAllUserSuccess(data)),
    deleteUser: (userDlt) => dispatch(actions.deleteUser(userDlt)),
    toastify: (toastData) => dispatch(actions.toastify(toastData)),
    editUser: (userId) => dispatch(actions.editUser(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
