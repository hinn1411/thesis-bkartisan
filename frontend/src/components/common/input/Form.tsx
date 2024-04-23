import React, {FC, memo} from 'react';
import { useForm } from 'react-hook-form';

export interface FormProps {
  defaultValues: any;
  children?: React.ReactNode;
  onSubmit: any;
}

const Form: FC<FormProps> = memo(({ defaultValues, children, onSubmit }) => {
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {React.Children.map(children, (child: any) => {
        return child.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register: methods.register,
                key: child.props.name,
              },
            })
          : child;
      })}
    </form>
  );
})

export default Form;
