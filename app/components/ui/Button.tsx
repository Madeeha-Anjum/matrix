"use client";
import React from "react";
import classnames from "classnames";

type Props = {
  children?: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
const Click: React.FC<Props> = ({
  children,
  className = "",
  type,
  onClick,
}) => {
  return (
    <button
      className={classnames(
        "h-full rounded-md border  border-b-2  px-2  text-gray-300 transition-all duration-200 ease-in-out hover:bg-blue-800/25 active:scale-95 active:border-b  ",
        className,
      )}
      type={type || "button"}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Click;
