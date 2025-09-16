import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MainPage from "./page/MainPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyRoutinePage from "./page/MyRoutinePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/mypage/myroutine" element={<MyRoutinePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
