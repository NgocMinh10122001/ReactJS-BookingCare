import React, { Component } from "react";

import Slider from "react-slick";
export default class HandBook extends Component {
  render() {
    let settings = {
      //   dots: true,
      slidesToShow: 2,
      slidesToScroll: 2,
      infinite: false,
    };
    return (
      <div className=" section-specialty">
        <div className="section-container">
          <div className="section-header">
            <span className="section-header-title">Cẩm nang</span>
            <button className="section-header-btn">Xem thêm</button>
          </div>
          <Slider {...settings}>
            <div className="d-flex justify-content-between">
              <img src="http://placekitten.com/g/400/200" className="pe-3" />
              <b className="pt-2">Thực đơn 1 tuần cho người bị máu nhiễm mỡ</b>
            </div>
            <div className="d-flex justify-content-between">
              <img src="http://placekitten.com/g/400/200" className="pe-3" />
              <b className="pt-2">Thực đơn 1 tuần cho người bị máu nhiễm mỡ</b>
            </div>
            <div className="d-flex justify-content-between">
              <img src="http://placekitten.com/g/400/200" className="pe-3" />
              <b className="pt-2">Thực đơn 1 tuần cho người bị máu nhiễm mỡ</b>
            </div>
            <div className="d-flex justify-content-between">
              <img src="http://placekitten.com/g/400/200" className="pe-3" />
              <b className="pt-2">Thực đơn 1 tuần cho người bị máu nhiễm mỡ</b>
            </div>
          </Slider>
        </div>
      </div>
    );
  }
}
