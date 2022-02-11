import React from "react";

interface Props {
  color: "red" | "blue" | "white";
  size?: "sm" | "md";
}

function Cell(props: Props) {
  const { color, size = 12 } = props;

  let colorClassName = "bg-white";

  switch (color) {
    case "red":
      colorClassName = "bg-red-500";
      break;
    case "blue":
      colorClassName = "bg-blue-500";
      break;
  }

  const sizeClass = size === "sm" ? "h-4 w-4" : "h-12 w-12";

  return (
    <span
      {...props}
      className={`${sizeClass} ${colorClassName} rounded-full`}
    />
  );
}

export default Cell;
