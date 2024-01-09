import { memo, Fragment, FC } from 'react';

export type TextInputProps = {
  label: any;
  register: any;
  validatedObject: any;
  errors: any;
  type: string;
  placeholder: any;
};

const TextInput: FC<TextInputProps> = memo(
  /*
    use className if you want to overwrite styling of this component
  */
  ({ type, label, register, validatedObject, errors, ...props }) => {
    return (
      <Fragment>
        <input
          className="w-full py-4 px-6 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light hover:outline hover:outline-black hover:outline-1"
          {...props}
          {...register(label, { ...validatedObject })}
          type={type}
          label={label}
        />
        <p className="text-red-600 text-sm">{errors[label]?.message}</p>
      </Fragment>
    );
  }
);

export default TextInput;
