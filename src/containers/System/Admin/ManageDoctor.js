import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "../UserManage.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import Select from "react-select";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import { LANGUAGES } from "../../../utils/constant";
import { toast } from "react-toastify";
import { detailDoctor } from "../../../store/actions";

const mdParser = new MarkdownIt(/* Markdown-it options */);
// const options = [
//   { value: "chocolate", label: "Chocolate" },
//   { value: "strawberry", label: "Strawberry" },
//   { value: "vanilla", label: "Vanilla" },
// ];
class ManageDoctor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDoctor: "",
      contentMarkdown: "",
      contentHTML: "",
      description: "",
      doctorId: "",
      options: [{ value: "", label: "" }],
      isMarkdown: false,
      allDoctorInfo: {},
      allDoctors: [],
      listPrice: [],
      listProvince: [],
      listPayment: [],
      selectedPrice: "",
      selectedProvince: "",
      selectedPayment: "",
      addressClinic: "",
      nameClinic: "",
      note: "",
    };
  }

  componentDidMount() {
    this.props.getAllDoctors("All");
    this.props.getRequiredDoctorInfo();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.detailDoctor !== this.props.detailDoctor) {
      console.log("check api", this.props.detailDoctor);
      let { detailDoctor } = this.props;
      let markdown = detailDoctor.Markdown;
      let doctorInfo = detailDoctor.Doctor_info;
      let { listPrice, listProvince, listPayment } = this.state;
      // console.log("check state", listProvince);

      if (
        detailDoctor &&
        markdown &&
        doctorInfo &&
        listPrice &&
        listProvince &&
        listPayment
      ) {
        let priceFilter = listPrice.find(
          (item) => item.value === doctorInfo.priceId
        );
        let provinceFilter = listProvince.find(
          (item) => item.value === doctorInfo.provinceId
        );
        let paymentFilter = listPayment.find(
          (item) => item.value === doctorInfo.paymentId
        );
        // console.log("check price", );
        this.setState({
          contentMarkdown: markdown.contentMarkdown,
          contentHTML: markdown.contentHTML,
          description: markdown.description,
          selectedPrice: priceFilter,
          selectedProvince: provinceFilter,
          selectedPayment: paymentFilter,
          addressClinic: doctorInfo.addressClinic,
          nameClinic: doctorInfo.nameClinic,
          note: doctorInfo.note,
          // detailDoctor: detailDoctor.doctorId,
          isMarkdown: true,
        });
      } else {
        this.setState({
          contentMarkdown: "",
          contentHTML: "",
          description: "",
          selectedPrice: "",
          selectedProvince: "",
          selectedPayment: "",
          addressClinic: "",
          nameClinic: "",
          note: "",
          isMarkdown: false,
        });
      }
    }
    if (prevProps.allDoctors !== this.props.allDoctors) {
      this.setState({
        allDoctors: this.buildDataInputSelect(this.props.allDoctors, "USER"),
      });
    }
    if (prevProps.allDoctorInfo !== this.props.allDoctorInfo) {
      let { allDoctorInfo } = this.props;
      // console.log("check doctor info", allDoctorInfo);
      this.setState({
        listPrice: this.buildDataInputSelect(allDoctorInfo.Price, "PRICE"),
        listProvince: this.buildDataInputSelect(
          allDoctorInfo.Province,
          "PROVINCE"
        ),
        listPayment: this.buildDataInputSelect(
          allDoctorInfo.Payment,
          "PAYMENT"
        ),
      });
    }
    if (prevProps.language !== this.props.language) {
      let { allDoctorInfo, detailDoctor } = this.props;
      let markdown = detailDoctor.Markdown;
      let doctorInfo = detailDoctor.Doctor_info;
      // let { listPrice, listProvince, listPayment } = this.state;
      let listPrice = this.buildDataInputSelect(allDoctorInfo.Price, "PRICE");
      let listProvince = this.buildDataInputSelect(
        allDoctorInfo.Province,
        "PROVINCE"
      );
      let listPayment = this.buildDataInputSelect(
        allDoctorInfo.Payment,
        "PAYMENT"
      );

      let priceFilter = listPrice.find(
        (item) => item.value === doctorInfo.priceId
      );
      let provinceFilter = listProvince.find(
        (item) => item.value === doctorInfo.provinceId
      );
      let paymentFilter = listPayment.find(
        (item) => item.value === doctorInfo.paymentId
      );
      this.setState({
        listPrice: listPrice,
        listProvince: listProvince,
        listPayment: listPayment,
        selectedPrice: priceFilter,
        selectedProvince: provinceFilter,
        selectedPayment: paymentFilter,
      });
    }
  }

  buildDataInputSelect = (inputData, type) => {
    let { language } = this.props;
    let arrayData = [];
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        if (type === "USER") {
          let obj = {};
          let labelVi = `${item.firstName} ${item.lastName}`;

          let labelEn = `${item.firstName} ${item.lastName}`;

          obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
          obj.value = item.id;
          arrayData.push(obj);
        } else if (type === "PRICE") {
          let obj = {};
          let labelVi = `${item.valueVi} `;
          let labelEn = `${item.valueEn} $`;
          obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
          obj.value = item.keyMap;
          arrayData.push(obj);
        } else if (type === "PROVINCE" || type === "PAYMENT") {
          let obj = {};
          let labelVi = `${item.valueVi}`;
          let labelEn = `${item.valueEn}`;
          obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
          obj.value = item.keyMap;
          arrayData.push(obj);
        } else {
        }
      });
    }
    return arrayData;
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  validateInput = (name) => {
    let isVald = true;
    let arrValid = [
      "doctorId",
      "description",
      "selectedPrice",
      "selectedProvince",
      "selectedPayment",
      "addressClinic",
      "nameClinic",
      "note",
      "contentMarkdown",
    ];
    for (let index = 0; index < arrValid.length; index++) {
      // const element = array[index];
      // console.log("check", this.state[arrValid[index]]);
      if (!this.state[arrValid[index]]) {
        isVald = false;
        toast.error(`Missing parameter ${arrValid[index]}`);
        break;
      }
    }
    return isVald;
  };

  handleSaveContentMarkdown = () => {
    let isVald = this.validateInput();
    // console.log("check", this.validateInput());

    let {
      contentMarkdown,
      contentHTML,
      description,
      doctorId,
      selectedPrice,
      selectedProvince,
      selectedPayment,
      addressClinic,
      nameClinic,
      note,
    } = this.state;
    // console.log("check state", this.state);
    if (isVald === true) {
      this.props.saveMarkdownDoctor({
        // selectedDoctor: "",
        contentMarkdown: contentMarkdown,
        contentHTML: contentHTML,
        description: description,
        doctorId: doctorId,
        selectedPrice: selectedPrice.value,
        selectedProvince: selectedProvince.value,
        selectedPayment: selectedPayment.value,
        addressClinic: addressClinic,
        nameClinic: nameClinic,
        note: note,
      });

      toast.success("Save Doctor Info Success!");

      this.setState({
        contentMarkdown: "",
        contentHTML: "",
        description: "",
        doctorId: "",
        selectedPrice: "",
        selectedProvince: "",
        selectedPayment: "",
        addressClinic: "",
        nameClinic: "",
        note: "",
      });
    } else {
      return;
    }
  };
  handleChange = (selectedDoctor) => {
    // console.log("check slecel", selectedDoctor);
    this.setState(
      {
        selectedDoctor,
        doctorId: selectedDoctor.value,
      }

      // () => console.log(`Option selected:`, this.state.selectedDoctor
      // )
    );
    // console.log("id doctor", selectedDoctor.id);

    this.props.getDetailDoctor(selectedDoctor.value);
  };
  handleOnChangeDes = (event) => {
    this.setState({
      description: event.target.value,
    });
  };
  handleUpdateContentMarkdown = () => {
    let {
      contentMarkdown,
      contentHTML,
      description,
      doctorId,
      selectedPrice,
      selectedProvince,
      selectedPayment,
      addressClinic,
      nameClinic,
      note,
    } = this.state;
    // console.log("check state", this.state);
    this.props.updateMarkdownDoctor({
      // selectedDoctor: "",
      contentMarkdown: contentMarkdown,
      contentHTML: contentHTML,
      description: description,
      doctorId: doctorId,
      selectedPrice: selectedPrice.value,
      selectedProvince: selectedProvince.value,
      selectedPayment: selectedPayment.value,
      addressClinic: addressClinic,
      nameClinic: nameClinic,
      note: note,
    });
    alert("sua thanh conng");
    this.setState({
      contentMarkdown: "",
      contentHTML: "",
      description: "",
      selectedDoctor: "",
      doctorId: "",
      selectedPrice: "",
      selectedProvince: "",
      selectedPayment: "",
      addressClinic: "",
      nameClinic: "",
      note: "",
    });
  };
  handleChangeDoctorInfo = (selectedOptions, nameFunc) => {
    let name = nameFunc.name;

    // console.log("check select", name);
    this.setState({
      [name]: selectedOptions,
    });
  };
  handleChangeInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({
      [name]: value,
    });
  };
  render() {
    const {
      selectedDoctor,
      isMarkdown,
      contentMarkdown,
      listPrice,
      listProvince,
      listPayment,
      allDoctorInfo,
      allDoctors,
      selectedPrice,
      selectedProvince,
      selectedPayment,
      addressClinic,
      nameClinic,
      note,
    } = this.state;
    let { detailDoctor, language } = this.props;
    // console.log("check doctor", this.state);
    return (
      <div className="manage-doctor">
        <div className="manage-doctor-title mb-5 mt-5 d-flex justify-content-center h2">
          <FormattedMessage id="manage-doctor.manage-doctor" />
        </div>
        <div className="manage-doctor-btn mb-4">
          <button
            className=" btn btn-info"
            onClick={() => {
              isMarkdown
                ? this.handleUpdateContentMarkdown()
                : this.handleSaveContentMarkdown();
            }}
          >
            {isMarkdown ? (
              <span>
                <FormattedMessage id="manage-doctor.update-markdown-doctor" />
              </span>
            ) : (
              <span>
                <FormattedMessage id="manage-doctor.save-markdown-doctor" />
              </span>
            )}
          </button>
        </div>
        <div className="more-info mb-4 row ">
          <div className="content-left col-4">
            <label className="mb-1">
              <FormattedMessage id="manage-doctor.select-doctor" />
            </label>
            <Select
              value={selectedDoctor}
              onChange={this.handleChange}
              options={allDoctors}
            />
          </div>
          <div className="content-right col-8">
            <label className="mb-1">
              <FormattedMessage id="manage-doctor.intro-doctor" />
            </label>
            <textarea
              className="form-control "
              rows={6}
              onChange={(event) => this.handleOnChangeDes(event)}
              value={this.state.description}
            ></textarea>
          </div>
          <div className="content-left col-4">
            <label className="mb-1">
              <FormattedMessage id="manage-doctor.price" />
            </label>
            <Select
              value={selectedPrice}
              onChange={this.handleChangeDoctorInfo}
              options={listPrice}
              name="selectedPrice"
            />
          </div>
          <div className="content-left col-4">
            <label className="mb-1">
              <FormattedMessage id="manage-doctor.province" />
            </label>
            <Select
              value={selectedProvince}
              onChange={this.handleChangeDoctorInfo}
              options={listProvince}
              name="selectedProvince"
            />
          </div>

          <div className="content-left col-4">
            <label className="mb-1">
              <FormattedMessage id="manage-doctor.payment" />
            </label>
            <Select
              value={selectedPayment}
              onChange={this.handleChangeDoctorInfo}
              options={listPayment}
              name="selectedPayment"
            />
          </div>
          <div className="content-left col-4">
            <label className="mb-1">
              <FormattedMessage id="manage-doctor.address-clinic" />
            </label>
            <input
              className="form-control"
              value={addressClinic}
              name="addressClinic"
              onChange={(event) => this.handleChangeInput(event)}
            />
          </div>
          <div className="content-left col-4">
            <label className="mb-1">
              <FormattedMessage id="manage-doctor.name-clinic" />
            </label>
            <input
              className="form-control"
              value={nameClinic}
              name="nameClinic"
              onChange={(event) => this.handleChangeInput(event)}
            />
          </div>
          <div className="content-left col-4">
            <label className="mb-1">
              <FormattedMessage id="manage-doctor.note" />
            </label>
            <input
              className="form-control"
              value={note}
              name="note"
              onChange={(event) => this.handleChangeInput(event)}
            />
          </div>
        </div>
        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={(event) => this.handleEditorChange(event)}
            value={contentMarkdown}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allDoctors: state.doctor.allDoctors,
    detailDoctor: state.admin.detailDoctor,
    allDoctorInfo: state.admin.allDoctorInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctors: (doctorType) =>
      dispatch(actions.fetchAllDoctorHomeSuccess(doctorType)),
    saveMarkdownDoctor: (dataMarkDoc) =>
      dispatch(actions.saveMarkdownDoctor(dataMarkDoc)),
    getMarkDoctor: (doctorId) => dispatch(actions.getMarkDoctor(doctorId)),
    updateMarkdownDoctor: (doctor) =>
      dispatch(actions.updateMarkDoctor(doctor)),
    getRequiredDoctorInfo: () => dispatch(actions.getRequiredDoctorInfo()),
    getDetailDoctor: (idDoctor) => dispatch(actions.detailDoctor(idDoctor)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
