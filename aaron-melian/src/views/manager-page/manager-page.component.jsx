// React
import React, { useState } from "react";

// Antd
import { Button, Popover } from "antd";
import { PlusOutlined } from "@ant-design/icons";

// Styles
import {
  ManagerPageWrapperStyled,
  BreadCrumbButtonWrapperStyled,
  AffixButtonWrapperStyled,
  AddBikeOrUserWrapperStyled,
} from "./manager-page.component.styled";

// Constants
import { constants } from "./manager-page.constants";

// Components
import UserModal from "../../components/user-modal/user-modal.component";
import BikeModal from "../../components/bike-modal/bike-modal.component";

const ManagerPage = () => {
  const [activeComponent, setActiveComponent] = useState(0);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showBikeModal, setShowBikeModal] = useState(false);
  const [isSharePopoverVisible, setIsSharePopoverVisible] = useState(false);

  const renderComponent = (index) => {
    const ComponentName = constants.BREADCRUMB_NAMES[index].component;
    return <ComponentName />;
  };

  const cancelUserModal = () => {
    setShowUserModal(false);
  };

  const cancelBikeModal = () => {
    setShowBikeModal(false);
  };

  const handlePopoverVisibleChange = () => {
    setIsSharePopoverVisible(!isSharePopoverVisible);
  };

  const openBikeModal = () => {
    setShowBikeModal(true);
    setIsSharePopoverVisible(false);
  };

  const openUserModal = () => {
    setShowUserModal(true);
    setIsSharePopoverVisible(false);
  };

  const menu = (
    <AddBikeOrUserWrapperStyled>
      <Button
        onClick={() => openBikeModal()}
        type={constants.BUTTON_PROPS.PRIMARY}
        style={{ margin: "4px" }}
      >
        Add Bike
      </Button>
      <Button
        onClick={() => openUserModal()}
        type={constants.BUTTON_PROPS.PRIMARY}
        style={{ margin: "4px" }}
      >
        Add User
      </Button>
    </AddBikeOrUserWrapperStyled>
  );

  return (
    <ManagerPageWrapperStyled>
      {constants.BREADCRUMB_NAMES.map((item, i) => {
        return (
          <BreadCrumbButtonWrapperStyled key={item.label}>
            <Button
              type={
                activeComponent === i
                  ? constants.BUTTON_PROPS.PRIMARY
                  : constants.BUTTON_PROPS.PRIMARY.DEFAULT
              }
              onClick={() => setActiveComponent(i)}
            >
              {item.label}
            </Button>
          </BreadCrumbButtonWrapperStyled>
        );
      })}
      {renderComponent(activeComponent)}
      <AffixButtonWrapperStyled>
        <Popover
          placement="topRight"
          content={menu}
          trigger="click"
          visible={isSharePopoverVisible}
          onVisibleChange={handlePopoverVisibleChange}
        >
          <Button
            icon={<PlusOutlined />}
            type={constants.BUTTON_PROPS.PRIMARY}
            shape="circle"
          />
        </Popover>
        {/* <Dropdown overlay={menu} placement="topRight" arrow></Dropdown> */}
      </AffixButtonWrapperStyled>
      {showUserModal && (
        <UserModal show={showUserModal} cancelUserModal={cancelUserModal} />
      )}
      {showBikeModal && (
        <BikeModal
          show={showBikeModal}
          cancelUserModal={cancelBikeModal}
          title="Add a Bike!"
          bikeData={{}}
        />
      )}
    </ManagerPageWrapperStyled>
  );
};

export default ManagerPage;
