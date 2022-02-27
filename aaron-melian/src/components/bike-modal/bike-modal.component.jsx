// React
import React, { useState } from "react";

// Firebase
import firebase from "../../fbConfig";
import { collection, doc, setDoc } from "firebase/firestore";

// Redux
import { useDispatch } from "react-redux";
import { getBikes } from "../../store/actions/bikeActions";

// Components
import Backrop from "../backdrop/backdrop.component";
import Icon from "../icon/icon.component";

// Constants
import { constants } from "../bike-modal/bike-modal.constants";
import { globalConstants } from "../../globalConstants/globalConstants.constants";

// AntD
import { Input, Form, Modal, message, Select } from "antd";

// Styles
import {
  colorInputStyles,
  bikeModalStyles,
  FormItemWrapper,
  IconWrapperStyled,
} from "./bike-modal.component.styled";

const BikeModal = ({ bikeData, cancelBikeAddModal, editing, show, title }) => {
  const { model, color, location } = bikeData;
  const [bikeColor, setBikeColor] = useState(
    color || constants.DEFAULT_STATE.COLOR
  );
  const [bikeType, setBikeType] = useState(
    model || constants.DEFAULT_STATE.MODEL
  );
  const dispatch = useDispatch();

  const { Option } = Select;
  const [form] = Form.useForm();

  const addBike = async (bikeFormData) => {
    const newBike = doc(
      collection(firebase.firestore(), globalConstants.COLLECTIONS.BIKES)
    );
    setDoc(newBike, { ...bikeFormData, id: newBike.id });
    setBikeType(constants.DEFAULT_STATE.MODEL);
    setBikeColor(constants.DEFAULT_STATE.COLOR);
    message.success(constants.ADD_BIKE_SUCCESS_MESSAGE);
    dispatch(getBikes());
    cancelBikeAddModal();
  };

  const editBike = async (bikeFormData) => {
    firebase
      .firestore()
      .collection(globalConstants.COLLECTIONS.BIKES)
      .doc(bikeData.id)
      .update({
        ...bikeFormData,
      });
    message.success(constants.EDIT_BIKE_SUCCESS_MESSAGE);
    dispatch(getBikes());
    cancelBikeAddModal();
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
    cancelBikeAddModal();
  };

  return (
    <Backrop show={show}>
      <Modal
        title={title}
        visible={show}
        {...constants.MODAL_PROPS}
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              handleOk(values);
            })
            .catch((info) => {
              console.log(constants.VALIDATE_FAILED_TEXT, info);
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
          initialValues={{
            model: model || constants.DEFAULT_STATE.MODEL,
            color: color || constants.DEFAULT_STATE.COLOR,
            location: location,
          }}
          style={{
            ...bikeModalStyles,
          }}
        >
          <FormItemWrapper>
            <Form.Item
              {...constants.MODEL_SELECT_PROPS}
              rules={[{ required: true }]}
            >
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
                { required: true, message: constants.LOCATION_INPUT_MESSAGE },
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
                style={{ ...colorInputStyles }}
                type={constants.COLOR_INPUT_TYPE}
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
