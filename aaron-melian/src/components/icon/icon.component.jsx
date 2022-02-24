// React
import React from "react";

const Icon = React.memo(function Icon({ icon, color }) {
  const renderIcon = () => require(`./types/${icon}`).default;
  const SVG = renderIcon();

  return <SVG style={{ color: color, stroke: "black", strokeWidth: "0.15" }} />;
});

export default Icon;
