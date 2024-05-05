import { FC, memo } from 'react';

export interface ButtonProps {
  className?: string;
  children: React.ReactNode;
  onClick?: any;
}
const Button: FC<ButtonProps> = memo(({ className, children, onClick }) => {
  let style =
    'w-full md:w-auto md:mx-auto flex justify-center items-center p-4 space-x-2 font-sans font-bold text-white rounded-md px-9 bg-orange-600  shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border';
  if (className) {
    style = className;
  }
  return (
    <button
      onClick={onClick}
      className={style}
    >
      {children}
    </button>
  );
});

export default Button;
