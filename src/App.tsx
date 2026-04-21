import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import HomePage from "./pages/HomePage";
import PlayPage from "./pages/PlayPage";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/play/:difficulty" element={<PlayPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
