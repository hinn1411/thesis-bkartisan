import { ChangeEvent, FC, useState } from "react";
import { Input } from "@mui/base";


interface SearchInputProps {
    placeholder: string,
    ariaLabel: string,
    handleEnter: Function,
    className?: string
}

const SearchInput: FC<SearchInputProps> = ({placeholder, ariaLabel, handleEnter, className}) => {
    const [value, setValue] = useState("");

    const onChange = (e: ChangeEvent) => {
        setValue(e.target.value);
    }

    const onKeyUp = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            handleEnter(value);
        }
    }
    
  return (
    <Input
      slotProps={{
        input: {
          className:
            "w-60 text-sm font-sans font-normal leading-5 px-3 py-2 rounded-lg shadow-md shadow-slate-100 dark:shadow-slate-900 focus:shadow-outline-purple dark:focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500 dark:hover:border-purple-500 focus:border-purple-500 dark:focus:border-purple-500 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-300 focus-visible:outline-0",
        },
      }}
      aria-label={ariaLabel}
      placeholder={placeholder}
      onChange={onChange}
      onKeyUp={onKeyUp}
      className={className}
    />
  );
};

export default SearchInput;