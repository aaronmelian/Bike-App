// React
import React, { useState } from "react";

// Firebase
import firebase from "../../fbConfig";
import { collection, doc, setDoc } from "firebase/firestore";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getBikes } from "../../store/actions/bikeActions";

// Moment
import moment from "moment";

// AntD
import { Modal, Form, DatePicker, message } from "antd";

// Components
import Backrop from "../backdrop/backdrop.component";
import Icon from "../icon/icon.component";

// Styles
import {
  FormItemWrapper,
  IconWrapperStyled,
} from "./rent-bike-modal.component.styled";

// Constants
import { constants } from "../bike-modal/bike-modal.constants";
import { globalConstants } from "../../globalConstants/globalConstants.constants";

const RentBikeModal = ({ show, cancelUserModal, title, bikeData }) => {
  const userInfo = useSelector((state) => state.auth.userInfo);

  const { model, color, location } = bikeData;
  const { RangePicker } = DatePicker;

  const dispatch = useDispatch();

  const rentBike = async (bikeFormData) => {
    const rentedObj = {
      rentStart: moment(bikeFormData.dateRange[0]).format("MM/DD/YY"),
      rentEnd: moment(bikeFormData.dateRange[1]).format("MM/DD/YY"),
      by: { id: userInfo.uid, avatar: userInfo.imgUrl },
      bike: bikeData.id,
    };

    firebase
      .firestore()
      .collection("bikes")
      .doc(bikeData.id)
      .update({
        rentList: firebase.firestore.FieldValue.arrayUnion(rentedObj),
      });
    message.success("Bike rented!");
    dispatch(getBikes());
    cancelUserModal();
  };

  const handleOk = (bikeFormData) => {
    form.resetFields();
    rentBike(bikeFormData);
  };
  const onCancel = () => {
    cancelUserModal();
  };

  const checkIfHasDisabledInside = (bikeFormData) => {
    let allow = true;

    if (bikeData.rentList) {
      const checkeableRents = bikeData.rentList.filter((rent) => {
        return moment(rent.rentEnd).startOf("day") >= moment().startOf("day");
      });
      checkeableRents.forEach((rent) => {
        if (
          moment(rent.rentStart).startOf("day") >=
            moment(bikeFormData.dateRange[0]).startOf("day") &&
          moment(rent.rentStart).endOf("day") <=
            moment(bikeFormData.dateRange[1]).startOf("day")
        ) {
          allow = false;
        }
      });
    }
    if (allow) {
      form.resetFields();
      handleOk(bikeFormData);
    } else {
      message.error("Please do not select occupied dates.");
    }
  };

  const disabledDate = (current) => {
    if (current && current < moment().startOf("day")) {
      return true;
    }

    if (bikeData.rentList && bikeData.rentList.length) {
      let disable = false;
      bikeData.rentList.forEach((rent) => {
        if (
          moment(rent.rentStart).startOf("day") <= current &&
          moment(rent.rentEnd).endOf("day") >= current
        ) {
          disable = true;
        }
      });

      return disable;
    }
  };

  const [form] = Form.useForm();
  return (
    <Backrop show={show}>
      <Modal
        title={title}
        visible={show}
        okText="Confirm"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              checkIfHasDisabledInside(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <IconWrapperStyled>
          <Icon icon={model} color={color} />
        </IconWrapperStyled>
        <Form
          form={form}
          id={constants.FORM_NAME}
          name={constants.FORM_NAME}
          initialValues={{ model: model, color: color, location: location }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <FormItemWrapper>
            <Form.Item
              name="dateRange"
              label="Date Range"
              rules={[
                { required: true, message: "Please select your rent dates" },
              ]}
            >
              <RangePicker disabledDate={disabledDate} />
            </Form.Item>
          </FormItemWrapper>
        </Form>
      </Modal>
    </Backrop>
  );
};

export default RentBikeModal;
