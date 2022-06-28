import { FaEye, FaEyeSlash, FaBan } from "react-icons/fa";

export function getCategoryIcon(
  category: string,
  color: string,
  size?: number
) {
  switch (category) {
    case "Casa":
      return <FaBan color={color} size={size} />;
    case "Lazer":
      return <FaEyeSlash color={color} size={size} />;
    case "Outro":
      return <FaEye color={color} size={size} />;
    default:
      break;
  }
}
