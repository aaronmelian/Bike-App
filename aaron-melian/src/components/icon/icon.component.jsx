// React
import React from "react";

// Constants
import { constants } from "./icon.constants";

const Icon = React.memo(function Icon({ icon, color }) {
  const renderIcon = () => require(`${constants.ICON_SUBPATH}${icon}`).default;
  const SVG = renderIcon();

  return <SVG style={{ color: color, ...constants.SVG_PROPS }} />;
});

export default Icon;
