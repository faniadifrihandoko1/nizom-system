import React from "react";

const Header = ({ title }: { title: string }) => {
  return (
    <div className="mb-5">
      <h2 className="font-bold text-gray-800 text-2xl">{title}</h2>
    </div>
  );
};

export default Header;
