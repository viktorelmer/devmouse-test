import React from "react";
import Select from "react-select";


interface IProps {
  data: { value: number; label: string }[];
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  onChange: (data: number) => void
}


const MySelect: React.FunctionComponent<IProps> = ({ data, disabled, className, placeholder, onChange }) => {
    return (
      <Select
        className={className}
        options={data}
        isDisabled={disabled}
        placeholder={placeholder}
        onChange={(data) => {
          if (data) onChange(data.value)
        }}
      />
    );
}

export default React.memo(MySelect);
