import React, { ButtonHTMLAttributes } from "react";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  label: string;
  containerClasses?: string;
  textClasses?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  icon,
  label,
  containerClasses = "",
  textClasses = "",
  ...props
}) => {
  return (
    <button
      className={`px-6 py-1 flex items-center gap-4 bg-[#3B82F6] rounded-lg ${containerClasses}`}
      {...props}
    >
      {icon}
      <span className={`text-[20px] font-semibold leading-normal ${textClasses}`}>
        {label}
      </span>
    </button>
  );
};

export default PrimaryButton;
