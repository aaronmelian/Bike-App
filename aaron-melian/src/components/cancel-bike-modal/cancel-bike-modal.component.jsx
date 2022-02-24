// React
import React from "react";

// Firebase
import firebase from "../../fbConfig";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getBikes } from "../../store/actions/bikeActions";

// Moment
import moment from "moment";

// Components
import Backrop from "../backdrop/backdrop.component";

// Utils
import { momentConfig } from "../../utils/mainUtils";

// Constants
import { constants } from "../cancel-bike-modal/cancel-bike-modal.constants";
import { globalConstants } from "../../globalConstants/globalConstants.constants";

// AntD
import { Button, message, Modal, Table } from "antd";

// Styles
import { ButtonWrapperStyled } from "./cancel-bike-modal.component.styled";

const CancelBikeModal = ({
  bikeToCancel,
  cancelCancelRentBikeModal,
  show,
  title,
}) => {
  const bikeList = useSelector((state) => state.bikes.bikeList);
  const dispatch = useDispatch();

  const cancelableReservations = bikeList
    .find((bike) => bikeToCancel.id === bike.id)
    .rentList.filter((rent) => {
      return momentConfig(rent.rentEnd).endOf(globalConstants.DAY) > moment();
    });

  const cancelBike = (reservData) => {
    firebase
      .firestore()
      .collection(globalConstants.COLLECTIONS.BIKES)
      .doc(bikeToCancel.id)
      .update({
        rentList: firebase.firestore.FieldValue.arrayRemove(reservData),
      });

    message.success(constants.CANCEL_RESERVATION_SUCCESS_MESSAGE);
    dispatch(getBikes());
  };

  const onCancel = () => {
    cancelCancelRentBikeModal();
  };

  const data = cancelableReservations.map((reserv) => {
    return {
      key: reserv.rentStart,
      start: reserv.rentStart,
      end: reserv.rentEnd,
      action: (
        <ButtonWrapperStyled>
          <Button onClick={() => cancelBike(reserv)}>
            {constants.CANCEL_BUTTON_TEXT}
          </Button>
        </ButtonWrapperStyled>
      ),
    };
  });

  return (
    <Backrop show={show}>
      <Modal title={title} visible={show} onCancel={onCancel} footer={null}>
        <Table
          columns={constants.COLUMNS}
          dataSource={data}
          pagination={false}
        />
      </Modal>
    </Backrop>
  );
};

export default CancelBikeModal;