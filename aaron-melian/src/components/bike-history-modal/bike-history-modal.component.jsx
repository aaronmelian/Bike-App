// React
import React from "react";

// Redux
import { useSelector } from "react-redux";

// Components
import Backrop from "../backdrop/backdrop.component";
import UserPic from "../user-pic/user-pic.component";

// Utils
import { momentConfig } from "../../utils/mainUtils";

// Constants
import { constants } from ".././bike-history-modal/bike-history-modal.constants";

// AntD
import { message, Modal, Table } from "antd";

// Styles
import { UsernameWrapperStyled } from "./bike-history-modal.component.styled";

const BikeHistoryModal = ({
  bikeHistory,
  cancelBikeHistoryModal,
  show,
  title,
}) => {
  const userList = useSelector((state) => state.users.userList);

  const userPictures = {};
  userList.forEach((user) => {
    userPictures[user.uid] = { image: user.imgUrl, isDeleted: user.isDeleted };
  });

  const handleCopyToClickboard = (id) => {
    navigator.clipboard.writeText(id);
    message.success(constants.COPY_TO_CLIPBOARD_MESSAGE);
  };

  const sortedData = bikeHistory.sort((rentObj1, rentObj2) => {
    return momentConfig(rentObj2.rentEnd) - momentConfig(rentObj1.rentEnd);
  });

  const data = sortedData.map((rent, i) => {
    return {
      key: `${rent.by.id}-${i}`,
      start: rent.rentStart,
      end: rent.rentEnd,
      username: (
        <UsernameWrapperStyled
          onClick={() => {
            handleCopyToClickboard(rent.by.id);
          }}
        >
          <UserPic
            picUrl={userPictures[rent.by.id].image}
            deleted={userPictures[rent.by.id].isDeleted}
          />
        </UsernameWrapperStyled>
      ),
    };
  });

  return (
    <Backrop show={show}>
      <Modal
        onCancel={cancelBikeHistoryModal}
        title={title}
        visible={show}
        footer={null}
      >
        <Table
          columns={constants.COLUMNS}
          dataSource={data}
          pagination={false}
        />
      </Modal>
    </Backrop>
  );
};

export default BikeHistoryModal;
