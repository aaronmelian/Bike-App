// React
import React from "react";

// Redux
import { useSelector } from "react-redux";

// Constants
import { constants } from "./user-pic.constants";

// AntD
import { Image } from "antd";

// Styles
import { imageStyles } from "./user-pic.component.styled";

const UserPic = ({ picUrl }) => {
  const userInfo = useSelector((state) => state.auth.userInfo);

  return userInfo && userInfo.imgUrl ? (
    <Image
      {...constants.IMAGE_PROPS}
      style={{ ...imageStyles }}
      src={picUrl || userInfo.imgUrl}
    />
  ) : null;
};

export default UserPic;
