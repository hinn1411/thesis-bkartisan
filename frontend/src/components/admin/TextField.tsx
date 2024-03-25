import { FC, memo } from "react";
import { Box } from "@mui/material";

interface TextFieldProps {
  textarea?: boolean;
  icon?: JSX.Element;
  minHeight?: string;
  value: string;
}

const TextField: FC<TextFieldProps> = memo(({ icon, textarea, value, minHeight }) => {
  const baseStyle =
    "bg-[#eff4fb] rounded-[4px] border border-solid border-[#3c50e0] ";
  const iconStyle = "flex items-center h-9 p-1 ";
  const noniconStyle = "flex items-center h-9 px-5 ";
  const textareaStyle = "py-2 px-5 h-auto break-all ";

  return (
    <Box
      className={baseStyle + (textarea ? textareaStyle : icon ? iconStyle : noniconStyle) + minHeight}
    >
      {icon && <Box px={1}>{icon}</Box>}
      <Box>{value}</Box>
    </Box>
  );
});

export default TextField;
