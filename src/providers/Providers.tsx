import { QueryProvider } from "./QueryClientProvider";
import { CustomThemeProvider } from "./ThemeProvider";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryProvider>
      <CustomThemeProvider>{children}</CustomThemeProvider>
    </QueryProvider>
  );
}
