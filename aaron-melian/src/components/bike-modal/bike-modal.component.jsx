// React
import React, { useState } from "react";

// Firebase
import firebase from "../../fbConfig";
import { collection, doc, setDoc } from "firebase/firestore";

// Redux
import { useDispatch } from "react-redux";
import { getBikes } from "../../store/actions/bikeActions";

// AntD
import { Modal, Form, Input, Select, message } from "antd";

// Components
import Backrop from "../backdrop/backdrop.component";
import Icon from "../icon/icon.component";

// Styles
import {
  FormItemWrapper,
  IconWrapperStyled,
} from "./bike-modal.component.styled";

// Constants
import { constants } from "../bike-modal/bike-modal.constants";
import { globalConstants } from "../../globalConstants/globalConstants.constants";

const BikeModal = ({ show, cancelUserModal, title, bikeData, editing }) => {
  const { model, color, location } = bikeData;
  const [bikeColor, setBikeColor] = useState(color || "#000000");
  const [bikeType, setBikeType] = useState(model || "allAround");
  const dispatch = useDispatch();

  const addBike = async (bikeFormData) => {
    const newBike = doc(collection(firebase.firestore(), "bikes"));
    setDoc(newBike, { ...bikeFormData, id: newBike.id });
    setBikeType("allAround");
    setBikeColor("#000000");
    message.success("Bike registered!");
    dispatch(getBikes());
    cancelUserModal();
  };

  const editBike = async (bikeFormData) => {
    firebase
      .firestore()
      .collection("bikes")
      .doc(bikeData.id)
      .update({
        ...bikeFormData,
      });
    message.success("Bike edited!");
    dispatch(getBikes());
    cancelUserModal();
  };

  const handleOk = (bikeFormData) => {
    form.resetFields();
    if (editing) {
      editBike(bikeFormData);
    } else {
      addBike(bikeFormData);
    }
  };
  const onCancel = () => {
    cancelUserModal();
  };

  const { Option } = Select;
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
              form.resetFields();
              handleOk(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <IconWrapperStyled>
          <Icon icon={bikeType} color={bikeColor} />
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
            <Form.Item name="model" label="Model" rules={[{ required: true }]}>
              <Select onChange={(type) => setBikeType(type)}>
                {globalConstants.BIKE_MODELS.OPTIONS.map((opt) => {
                  return (
                    <Option key={opt.label} value={opt.value}>
                      {opt.label}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </FormItemWrapper>
          <FormItemWrapper>
            <Form.Item
              {...constants.LOCATION_INPUT_PROPS}
              rules={[
                { required: true, message: "Please provide a location." },
              ]}
            >
              <Input />
            </Form.Item>
          </FormItemWrapper>
          <FormItemWrapper>
            <Form.Item
              {...constants.COLOR_INPUT_PROPS}
              rules={[{ required: true }]}
            >
              <Input
                style={{ cursor: "pointer" }}
                type="color"
                onBlur={(val) => setBikeColor(val.target.value)}
              />
            </Form.Item>
          </FormItemWrapper>
        </Form>
      </Modal>
    </Backrop>
  );
};

export default BikeModal;
