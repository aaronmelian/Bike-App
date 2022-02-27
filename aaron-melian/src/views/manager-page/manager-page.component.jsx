// React
import React, { useState } from "react";

// Components
import BikeModal from "../../components/bike-modal/bike-modal.component";
import UserModal from "../../components/user-modal/user-modal.component";

// Constants
import { constants } from "./manager-page.constants";

// Antd
import { Button, Popover } from "antd";
import { PlusOutlined } from "@ant-design/icons";

// Styles
import {
  AddBikeOrUserWrapperStyled,
  AffixButtonWrapperStyled,
  BreadCrumbButtonWrapperStyled,
  ManagerPageWrapperStyled,
  margin4pxStyle,
} from "./manager-page.component.styled";

const ManagerPage = () => {
  const [activeComponent, setActiveComponent] = useState(0);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showBikeModal, setShowBikeModal] = useState(false);
  const [isSharePopoverVisible, setIsSharePopoverVisible] = useState(false);

  const renderComponent = (index) => {
    const ComponentName = constants.BREADCRUMB_NAMES[index].component;
    return (
      <ComponentName currentList={constants.BREADCRUMB_NAMES[index].label} />
    );
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
        style={{ ...margin4pxStyle }}
      >
        Add Bike
      </Button>
      <Button
        onClick={() => openUserModal()}
        type={constants.BUTTON_PROPS.PRIMARY}
        style={{ ...margin4pxStyle }}
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
          {...constants.POPOVER_PROPS}
          content={menu}
          visible={isSharePopoverVisible}
          onVisibleChange={handlePopoverVisibleChange}
        >
          <Button
            icon={<PlusOutlined />}
            type={constants.BUTTON_PROPS.PRIMARY}
            {...constants.POPOVER_BUTTON_PROPS}
          />
        </Popover>
      </AffixButtonWrapperStyled>
      {showUserModal && (
        <UserModal
          show={showUserModal}
          cancelUserModal={cancelUserModal}
          title={constants.USER_MODAL_TITLE}
          bikeData={{}}
        />
      )}
      {showBikeModal && (
        <BikeModal
          show={showBikeModal}
          cancelBikeAddModal={cancelBikeModal}
          title={constants.BIKE_MODAL_TITLE}
          bikeData={{}}
        />
      )}
    </ManagerPageWrapperStyled>
  );
};

export default ManagerPage;
