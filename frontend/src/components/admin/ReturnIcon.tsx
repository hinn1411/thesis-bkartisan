import { FC, memo, useState } from "react";
import { TiDelete } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

const ReturnIcon: FC = memo(() => {
  const navigate = useNavigate();

  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const handleClick = () => {
    navigate("/admin/users");
  };

  const iconStyle = {
    width: 45,
    height: 45,
    fill: isHover ? "black" : "gray",
  };

  return (
    <TiDelete
      style={iconStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    />
  );
});

export default ReturnIcon;
