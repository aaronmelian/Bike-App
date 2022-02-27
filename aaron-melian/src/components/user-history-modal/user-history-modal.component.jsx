// React
import React from "react";

// Components
import Backrop from "../backdrop/backdrop.component";

// AntD
import { Modal, Table } from "antd";

const UserHistoryModal = ({
  cancelUserHistoryModal,
  columns,
  data,
  title,
  show,
}) => {
  const newData = data
    ? data.map((obj) => {
        return { ...obj, key: `fullData-${obj.key}` };
      })
    : [];

  return (
    <Backrop show={show}>
      <Modal
        onCancel={cancelUserHistoryModal}
        title={title}
        visible={show}
        footer={null}
      >
        <Table columns={columns} dataSource={newData} pagination={false} />
      </Modal>
    </Backrop>
  );
};

export default UserHistoryModal;
