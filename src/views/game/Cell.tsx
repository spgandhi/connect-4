import React from "react";

interface Props {
  color: "red" | "blue" | "white";
}

function Cell(props: Props) {
  const {} = props;

  let color = "bg-gray-500";

  switch (color) {
    case "red":
      color = "bg-red-500";
      break;
    case "blue":
      color = "bg-blue-500";
      break;
  }

  return <div className={`w-4 h-4 ${color} rounded-full`}></div>;
}

export default Cell;
