import React from "react";

interface Props {
  color: "red" | "blue" | "white";
  onClick: () => void;
  children: React.ReactNode;
}

function Cell(props: Props) {
  const { color, children } = props;

  let colorClassName = "bg-gray-500";

  switch (color) {
    case "red":
      colorClassName = "bg-red-500";
      break;
    case "blue":
      colorClassName = "bg-blue-500";
      break;
  }

  return (
    <div {...props} className={`w-12 h-12 ${colorClassName} rounded-full`}>
      {children}
    </div>
  );
}

export default Cell;
