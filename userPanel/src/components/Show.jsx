import React from "react";

const Show = ({ when, children, fallback = null }) => {
  if (when) {
    return <>{children}</>;
  }
  return <>{fallback}</>;
};

export default Show;
