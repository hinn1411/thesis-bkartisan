import { FC, memo } from 'react';

export interface SelectInputProps {
  label: string;
  className?: string;
  placeholder: string;
  register?: any;
  validatedObject?: any;
  errors?: any;
  data: Array<any>[];
  currentOption?: any;
  setOption: Function;
}
const SelectInput: FC<SelectInputProps> = memo(
  ({
    className,
    placeholder,
    register,
    errors,
    validatedObject,
    label,
    data = [],
    currentOption,
    setOption,
  }) => {
    // let style = ''
    let style =
      'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500';
    if (className) {
      style = className;
    }
    const handleSelect = (e: any) => {
      setOption(e.target.value);
      console.log(`change select`);
    };
    return (
      <select
        id="countries"
        className={style}
        {...register(label, { ...validatedObject })}
        onChange={handleSelect}
        defaultValue={currentOption}
      >
        <option defaultValue={currentOption}>{placeholder}</option>
        {data.map((item: any, index) => (
          <option value={item.id} key={index}>
            {item.name}
          </option>
        ))}
        {/* <option value="US">United States</option>
        <option value="CA">Canada</option>
        <option value="FR">France</option>
        <option value="DE">Germany</option> */}
      </select>
    );
  }
);

export default SelectInput;
