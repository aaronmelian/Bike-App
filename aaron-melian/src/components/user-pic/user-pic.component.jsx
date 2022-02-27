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

const UserPic = ({ picUrl, large }) => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  return userInfo && userInfo.imgUrl ? (
    <Image
      {...constants.IMAGE_PROPS}
      width={large ? 100 : 60}
      style={{ ...imageStyles }}
      src={picUrl || userInfo.imgUrl}
    />
  ) : null;
};

export default UserPic;
