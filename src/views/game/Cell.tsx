import React from "react";

interface Props {
  size?: "sm" | "md";
  className?: string;
}

function Cell(props: Props) {
  const { size = 12, className } = props;
  const sizeClass = size === "sm" ? "h-4 w-4" : "h-12 w-12";
  const combinedClasses = `cell ${sizeClass} ${className} rounded-full`;

  return <span {...props} className={combinedClasses} />;
}

export default Cell;
