import React, { Component } from "react";
import { connect } from "react-redux";

class HomeFooter extends Component {
  render() {
    return (
      <div className="home-footer">
        <div className="home-container d-flex justify-content-between">
          <p className="footer-text">
            &copy; 2021 Tìm hiểu thêm về mình. <a href="#">More infomation</a>
          </p>
          <div className="footer-logo">
            <i className="fab fa-facebook-square face"></i>
            <i className="fab fa-youtube youtobe"></i>
          </div>
        </div>
      </div>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
