import { HashRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import HomePage from "./pages/HomePage";
import PlayPage from "./pages/PlayPage";

function App() {
  return (
    <HashRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/play/:difficulty" element={<PlayPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
