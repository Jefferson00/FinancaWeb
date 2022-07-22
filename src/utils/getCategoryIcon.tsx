import {
  FaEyeSlash,
  FaDollarSign,
  FaHome,
  FaMoneyBill,
  FaPlane,
  FaPhone,
  FaMedkit,
  FaGraduationCap,
} from "react-icons/fa";

export function getCategoryIcon(
  category: string,
  color: string,
  size?: number
) {
  switch (category) {
    case "Casa":
      return <FaHome color={color} size={size} />;
    case "Salário":
      return <FaMoneyBill color={color} size={size} />;
    case "Benefício":
      return <FaDollarSign color={color} size={size} />;
    case "Transferência":
      return <FaMoneyBill color={color} size={size} />;
    case "Lazer":
      return <FaEyeSlash color={color} size={size} />;
    case "Transporte":
      return <FaPlane color={color} size={size} />;
    case "Educação":
      return <FaGraduationCap color={color} size={size} />;
    case "Comunicação":
      return <FaPhone color={color} size={size} />;
    case "Saúde":
      return <FaMedkit color={color} size={size} />;
    case "Outro":
      return <FaDollarSign color={color} size={size} />;
    default:
      break;
  }
}
