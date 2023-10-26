import React, { Component } from "react";

import Slider from "react-slick";
export default class MedicalFacility extends Component {
  render() {
    let settings = {
      dots: false,
      // infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      infinite: false,
    };
    return (
      <div className="section-specialty">
        <div className="section-container">
          <div className="section-header">
            <span className="section-header-title">Cơ sở y tế</span>
            <button className="section-header-btn">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...settings}>
              <div className="img-customize">
                <div className="img-display">
                  <div className="section-img bg-medical" />
                  <div className="section-title">
                    Trung tâm tham vấn, trị liệu Tâm lý MindCare Việt Nam
                  </div>
                </div>
              </div>
              <div className="img-customize">
                <div className="img-display">
                  <div className="section-img bg-medical" />
                  <div className="section-title">
                    Trung tâm tham vấn, trị liệu Tâm lý MindCare Việt Nam
                  </div>
                </div>
              </div>
              <div className="img-customize">
                <div className="img-display">
                  <div className="section-img bg-medical" />
                  <div className="section-title">
                    Trung tâm tham vấn, trị liệu Tâm lý MindCare Việt Nam
                  </div>
                </div>
              </div>
              <div className="img-customize">
                <div className="img-display ">
                  <div className="section-img bg-medical" />
                  <div className="section-title">
                    Trung tâm tham vấn, trị liệu Tâm lý MindCare Việt Nam
                  </div>
                </div>
              </div>
              <div className="img-customize">
                <div className="img-display">
                  <div className="section-img bg-medical" />
                  <div className="section-title">
                    Trung tâm tham vấn, trị liệu Tâm lý MindCare Việt Nam
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}
