import { HashRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { ThemeContextProvider, useThemeMode } from "./context/ThemeContext";
import { darkTheme, lightTheme } from "./styles/theme";
import GlobalStyle from "./styles/GlobalStyle";
import HomePage from "./pages/HomePage";
import PlayPage from "./pages/PlayPage";

function ThemedApp() {
  const { mode } = useThemeMode();
  const theme = mode === "dark" ? darkTheme : lightTheme;
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/play/:difficulty" element={<PlayPage />} />
      </Routes>
    </ThemeProvider>
  );
}

function App() {
  return (
    <HashRouter>
      <ThemeContextProvider>
        <ThemedApp />
      </ThemeContextProvider>
    </HashRouter>
  );
}

export default App;
