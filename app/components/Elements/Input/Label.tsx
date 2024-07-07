import React from "react";

type PropsLabel = {
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
};
const Label = (props: PropsLabel) => {
  const { htmlFor, children, className } = props;
  return (
    <label
      htmlFor={htmlFor}
      className={`block mb-1 text-sm font-semibold text-gray-900 dark:text-gray-900${className}`}
    >
      {children}
    </label>
  );
};

export default Label;
