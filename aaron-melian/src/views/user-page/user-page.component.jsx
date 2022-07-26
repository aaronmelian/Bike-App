// React
import React, { useState } from "react";

// Constants
import { constants } from "./user-page.constants";

// Antd
import { Button } from "antd";

// Styles
import {
  BreadCrumbButtonWrapperStyled,
  UserPageWrapperStyled,
} from "./user-page.component.styled";

const UserPage = () => {
  const [activeComponent, setActiveComponent] = useState(0);

  const renderComponent = (index) => {
    const ComponentName = constants.BREADCRUMB_NAMES[index].component;
    return (
      <ComponentName
        currentList={constants.BREADCRUMB_NAMES[activeComponent].label}
      />
    );
  };

  return (
    <UserPageWrapperStyled>
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
    </UserPageWrapperStyled>
  );
};

export default UserPage;
