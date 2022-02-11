import React from "react";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

function Button(props: Props) {
  const { children } = props;

  return (
    <button
      {...props}
      className="bg-teal-500 hover:bg-teal-600 active:bg-teal-700 px-4 py-2 rounded"
    >
      {children}
    </button>
  );
}

export default Button;
