import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import State from "../../store/interfaces";

interface ThemeStateProviderProps {
  children: React.ReactNode;
}

export default function ThemeStateProvider({
  children,
}: ThemeStateProviderProps) {
  const { theme } = useSelector((state: State) => state.themes);

  return <ThemeProvider theme={{ theme }}>{children}</ThemeProvider>;
}
