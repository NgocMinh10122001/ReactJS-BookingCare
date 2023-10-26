import React, { Component } from "react";
import { connect } from "react-redux";
import vtv1 from "../../../assets/vtv1.png";

class About extends Component {
  render() {
    return (
      <div className=" section-specialty bg-white" style={{ height: "400px" }}>
        <div className="section-container section-about">
          <div className="section-header">
            <span className="section-header-title">
              Truyền thông nói về BookingCare
            </span>
            {/* <button className="section-header-btn">Xem thêm</button> */}
          </div>

          <div className="iframe ">
            <iframe
              className="video"
              src="https://www.youtube.com/embed/T12p1qxMpvw"
              title="TRUNG IVERN | CÓ VẤP NGÃ MỚI CÓ THÀNH CÔNG, TEAM NÀY VẤP NGÃ CHỈ NGHE NHỮNG TIẾNG CHỬI TỪ ĐỒNG ĐỘI"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            <div className="body-logos">
              <a href="#" className="logo-item"></a>
              <a href="#" className="logo-item"></a>
              <a href="#" className="logo-item"></a>
              <a href="#" className="logo-item"></a>
              <a href="#" className="logo-item"></a>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
