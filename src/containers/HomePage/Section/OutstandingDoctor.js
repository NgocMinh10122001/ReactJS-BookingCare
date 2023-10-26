import React, { Component } from "react";
import * as actions from "../../../store/actions";
import Slider from "react-slick";
import { LANGUAGES } from "../../../utils";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";

class OutstandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topDoctorHome: [],
    };
  }
  componentDidMount() {
    this.props.getTopDoctorHome(9);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorHome !== this.props.topDoctorHome) {
      // let usersArr = this.props.allUsers;
      let topDoctorHome = this.props.topDoctorHome;
      // console.log("check top doctor home", topDoctorHome);
      this.setState({
        topDoctorHome: [...topDoctorHome],
      });
    }
  }
  handleViewDetailDoctor = (doctor) => {
    // console.log("check id doctor", doctor);
    // console.log("check prop", this.props);
    this.props.history.push(`/detail-doctor/${doctor.id}`);
  };
  render() {
    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };
    let topDoctorHome = this.state.topDoctorHome;
    let { language } = this.props;
    // console.log("check docotr", topDoctorHome);
    return (
      <div className="section-specialty bg-white">
        <div className="section-container">
          <div className="section-header">
            <span className="section-header-title">
              <FormattedMessage id="outstanding-doctor.outstanding-doctor" />
            </span>
            <button className="section-header-btn">
              <FormattedMessage id="outstanding-doctor.btn-detail" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...settings}>
              {/* {console.log("check", topDoctorHome)} */}
              {topDoctorHome &&
                topDoctorHome.length > 0 &&
                topDoctorHome.map((item, index) => {
                  let nameVi = `${item.positionData.valueVi}, ${item.firstName} ${item.lastName}`;
                  let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                  let imageBase64 = "";
                  if (item.image) {
                    imageBase64 = new Buffer(item.image, "base64").toString(
                      "binary"
                    );
                  }
                  return (
                    <div
                      className="img-customize"
                      key={item.id}
                      onClick={() => this.handleViewDetailDoctor(item)}
                    >
                      <div className="img-display border-doctor">
                        <div
                          className="section-img bg-doctor bg-white"
                          style={{ backgroundImage: `url(${imageBase64})` }}
                        />
                        <div className="section-title text-center">
                          {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>
                        <div className="section-title-small text-center">
                          Nam học
                        </div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
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
    topDoctorHome: state.doctor.topDoctorHome,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTopDoctorHome: (limit) =>
      dispatch(actions.fetchTopDoctorHomeSuccess(limit)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor)
);
