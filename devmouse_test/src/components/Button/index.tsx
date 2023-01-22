import React from "react";

interface IProps {
    label: string;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
}

const Button: React.FunctionComponent<IProps> = ({
  label,
  onClick,
  className,
  disabled
}) => {
  return (
    <div
      className={`select-none button hover:bg-gray-400 cursor-pointer flex w-fit justify-center items-center border-[1px] border-solid border-black rounded-[4px] px-2 py-1 bg-gray-300 ${className}`}
      onClick={onClick && !disabled ? onClick : undefined}
    >
      {label}
    </div>
  );
};

export default React.memo(Button);
