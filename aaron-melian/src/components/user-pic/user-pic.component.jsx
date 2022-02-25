// React
import React from "react";

// Redux
import { useSelector } from "react-redux";

// Constants
import { constants } from "./user-pic.constants";

// AntD
import { Image } from "antd";

// Styles
import { imageStyles, UserPicWrapper } from "./user-pic.component.styled";

const UserPic = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);

  return userInfo && userInfo.imgUrl ? (
    <UserPicWrapper>
      <Image
        {...constants.IMAGE_PROPS}
        style={{ ...imageStyles }}
        src={userInfo.imgUrl}
      />
    </UserPicWrapper>
  ) : null;
};

export default UserPic;
