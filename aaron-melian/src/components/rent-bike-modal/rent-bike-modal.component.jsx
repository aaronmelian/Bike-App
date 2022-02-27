// React
import React from "react";

// Firebase
import firebase from "../../fbConfig";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getBikes } from "../../store/actions/bikeActions";

// Components
import Backrop from "../backdrop/backdrop.component";
import Icon from "../icon/icon.component";

// Utils
import {
  isDateContainedInTwoDates,
  momentConfig,
  momentToMMDDYYYY,
} from "../../utils/mainUtils";

// AntD
import { Modal, Form, DatePicker, message } from "antd";

// Constants
import { constants } from "../rent-bike-modal/rent-bike-modal.constants";
import { globalConstants } from "../../globalConstants/globalConstants.constants";

// Styles
import {
  centeredFlexStyled,
  FormItemWrapper,
  IconWrapperStyled,
} from "./rent-bike-modal.component.styled";

const RentBikeModal = ({ bikeData, cancelRentBikeModal, title, show }) => {
  const { RangePicker } = DatePicker;

  const userInfo = useSelector((state) => state.auth.userInfo);
  const [form] = Form.useForm();
  const { color, location, model } = bikeData;

  const dispatch = useDispatch();

  const rentBike = async (bikeFormData) => {
    const rentedObj = {
      rentStart: momentToMMDDYYYY(bikeFormData.dateRange[0]),
      rentEnd: momentToMMDDYYYY(bikeFormData.dateRange[1]),
      by: {
        id: userInfo.uid,
        username: userInfo.username,
      },
      bike: bikeData.id,
    };
    firebase
      .firestore()
      .collection(globalConstants.COLLECTIONS.BIKES)
      .doc(bikeData.id)
      .update({
        rentList: firebase.firestore.FieldValue.arrayUnion(rentedObj),
      });
    firebase
      .firestore()
      .collection(globalConstants.COLLECTIONS.USERS)
      .doc(userInfo.uid)
      .update({
        rentList: firebase.firestore.FieldValue.arrayUnion(rentedObj),
      });
    message.success(constants.RENT_BIKE_SUCCESS_MESSAGE);
    dispatch(getBikes());
    cancelRentBikeModal();
  };

  const handleOk = (bikeFormData) => {
    form.resetFields();
    rentBike(bikeFormData);
  };
  const onCancel = () => {
    cancelRentBikeModal();
  };

  const checkIfHasDisabledInside = (bikeFormData) => {
    let allow = true;

    if (bikeData.rentList) {
      bikeData.rentList.forEach((rent) => {
        if (
          isDateContainedInTwoDates(
            rent.rentStart,
            bikeFormData.dateRange[0],
            bikeFormData.dateRange[1]
          )
        ) {
          allow = false;
        }
      });
    }
    if (allow) {
      form.resetFields();
      handleOk(bikeFormData);
    } else {
      message.error(constants.RENT_BIKE_DATES_ERROR_MESSAGE);
    }
  };

  const disabledDate = (current) => {
    if (current && current < momentConfig().startOf(globalConstants.DAY)) {
      return true;
    }

    if (bikeData.rentList && bikeData.rentList.length) {
      let disable = false;
      bikeData.rentList.forEach((rent) => {
        if (isDateContainedInTwoDates(current, rent.rentStart, rent.rentEnd)) {
          disable = true;
        }
      });

      return disable;
    }
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
              checkIfHasDisabledInside(values);
            })
            .catch((info) => {
              console.log(constants.MODAL_RENT_ERROR_LOG, info);
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
            ...centeredFlexStyled,
          }}
        >
          <FormItemWrapper>
            <Form.Item
              {...constants.DATE_RANGE_INPUT_PROPS}
              rules={[
                {
                  required: true,
                  message: constants.DATE_RANGE_INPUT_REQUIRED_MESSAGE,
                },
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
