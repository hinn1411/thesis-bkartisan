import { memo, FC } from 'react';

export type TextInputProps = {
  label: string;
  register?: any;
  validatedObject?: any;
  errors?: any;
  type: string;
  placeholder: string;
  className?: string;
  labelStyle?: string;
};

const TextInput: FC<TextInputProps> = memo(
  /*
    use className if you want to overwrite styling of this component
  */
  ({ type, label, register, validatedObject, errors, className, ...props }) => {
    let style =
      'w-full py-4 px-6 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light placeholder:text-sm hover:outline hover:outline-black hover:outline-1';
    if (className) {
      style = className;
    }
    return (
      <div>
        <input
          className={style}
          {...props}
          {...register(label, { ...validatedObject })}
          type={type}
          label={label}
        />
        <p className="text-red-600 text-sm">{errors[label]?.message}</p>
      </div>
    );
  }
);

export default TextInput;
