import { createTheme, ThemeProvider } from "@mui/material/styles";

const darkTheme = createTheme({
  typography: {
    fontFamily: '"Poppins", sans-serif',
    h1: { fontFamily: '"Poppins", sans-serif' },
    h2: { fontFamily: '"Poppins", sans-serif' },
    h3: { fontFamily: '"Poppins", sans-serif' },
    h4: { fontFamily: '"Poppins", sans-serif' },
    h5: { fontFamily: '"Poppins", sans-serif' },
    h6: { fontFamily: '"Poppins", sans-serif' },
    subtitle1: { fontFamily: '"Poppins", sans-serif' },
    subtitle2: { fontFamily: '"Poppins", sans-serif' },
    body1: { fontFamily: '"Poppins", sans-serif' },
    body2: { fontFamily: '"Poppins", sans-serif' },
  },
  palette: {
    mode: "dark",
    background: {
      default: "#333333",
      paper: "#474747",
      secondary: "#3D3D3D",
      dark: "#1A1A1A",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "rgba(255, 255, 255, 0.7)",
    },
  },
});

// Adicione a declaração de tipos para as novas cores
declare module "@mui/material/styles" {
  interface TypeBackground {
    secondary: string;
    dark: string;
  }
}

export function CustomThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={darkTheme} defaultMode="dark">
      {children}
    </ThemeProvider>
  );
}
