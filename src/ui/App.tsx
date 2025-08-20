import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { Festivals } from "./festivals/FestivalPage";
import { Members } from "./members/MemberPage";
import { Clubes } from "./clubes/ClubPage";
import { ClubSingle } from "./clubes/id/ClubSingle";
import { NewFestivalSingle } from "./festivals/[id]/NewFestivalSingle";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/festivals" replace />} />
        <Route path="/festivals" element={<Festivals />} />
        <Route path="/newfestivals/:id" element={<NewFestivalSingle />} />
        <Route path="/festivals/:id" element={<NewFestivalSingle />} />
        <Route path="/members" element={<Members />} />
        <Route path="/clubs" element={<Clubes />} />
        <Route path="/clubs/:id" element={<ClubSingle />} />
      </Routes>
    </div>
  );
}

export default App;
