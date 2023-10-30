interface RadioButtonProps  {
  value: string;
  label: string;
  activeValue: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const RadioButton = ({
  value,
  activeValue: theme,
  label,
  onChange,
}:RadioButtonProps) => {
  return (
    <div className="flex gap-4 text-gray-800 dark:text-gray-300 text-[14px] ">
      <input
        type="radio"
        name="theme"
        id={label}
        value={value}
        checked={value === theme}
        onChange={(e) => onChange(e)}
        className=""
      />
      <label htmlFor={label} className="cursor-ponter">
        {" "}
        {label}{" "}
      </label>
    </div>
  );
};

export default RadioButton