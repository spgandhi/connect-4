import React from "react";

interface Props {
  children: React.ReactNode;
}

function Message(props: Props) {
  const { children } = props;

  if (!children) return null;

  return (
    <div className="bg-black text-white py-4 rounded-lg text-center text-lg font-bold">
      {children}
    </div>
  );
}

export default Message;
