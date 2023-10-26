import React, { Component } from "react";
import "./Specialty.scss";

import Slider from "react-slick";
import specialty from "../../../assets/specialty.jpeg";
export default class Specialty extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
    };
    return (
      <div className="section-specialty">
        <div className="sepicalty-container">
          <div className="specialty-header">
            <span className="specialty-header-title">Chuyên khoa phổ biến</span>
            <button className="specialty-header-btn">Xem thêm</button>
          </div>
          <div className="specialty-body">
            <Slider {...settings}>
              <div className="img-customize">
                <div className="img-display">
                  <div className="speacialty-img" />
                  <div className="speccialty-title">Chuyên khoa y tế</div>
                </div>
              </div>
              <div className="img-customize">
                <div className="img-display">
                  <div className="speacialty-img" />
                  <div className="speccialty-title">Chuyên khoa y tế</div>
                </div>
              </div>
              <div className="img-customize">
                <div className="img-display">
                  <div className="speacialty-img" />
                  <div className="speccialty-title">Chuyên khoa y tế</div>
                </div>
              </div>
              <div className="img-customize">
                <div className="img-display ">
                  <div className="speacialty-img " />
                  <div className="speccialty-title">Chuyên khoa y tế</div>
                </div>
              </div>
              <div className="img-customize">
                <div className="img-display">
                  <div className="speacialty-img" />
                  <div className="speccialty-title">Chuyên khoa y tế</div>
                </div>
              </div>
              <div className="img-customize">
                <div className="img-display">
                  <div className="speacialty-img" />
                  <div className="speccialty-title">Chuyên khoa y tế</div>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}
