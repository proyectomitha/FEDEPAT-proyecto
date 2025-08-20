import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Festivals } from "./festivals/FestivalPage";
import { Members } from "./members/MemberPage";
import { Clubes } from "./clubes/ClubPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Festivals />} />
        <Route path="/members" element={<Members />} />
        <Route path="/clubs" element={<Clubes />} />
      </Routes>
    </div>
  );
}

export default App;
