import React from "react";

type Props = {
  children: React.ReactNode;
};

const Container: React.FC<Props> = ({ children }) => {
  return <div className="p-2 mx-auto max-w-7xl sm:p-4">{children}</div>;
};

export default Container;
