import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { Festivals } from "./newfestivals/FestivalPage";
import { Members } from "./members/MemberPage";
import { Clubes } from "./clubes/ClubPage";
import { ClubSingle } from "./clubes/id/ClubSingle";
import { NewFestivalSingle } from "./newfestivals/[id]/NewFestivalSingle";
import { FestivalSingle } from "./festival/FestivalSingle";
import { CategorySingle } from "./festival/category/CategorySingle";
import { TestReactionSingle } from "./festival/category/test/TestReactionSingle";
import { TestHabilitySingle } from "./festival/category/test/TestHabilitySingle";
import { MembersSingle } from "./members/[id]/MemberSingle";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/festivals" replace />} />
        <Route path="/festivals" element={<Festivals />} />
        <Route path="/festival/:id" element={<FestivalSingle />} />
        <Route
          path="/festival/category/:category"
          element={<CategorySingle />}
        />
        <Route
          path="/festival/category/test/reaction"
          element={<TestReactionSingle />}
        />
        <Route
          path="/festival/category/test/hability"
          element={<TestHabilitySingle />}
        />
        <Route path="/newfestivals/:id" element={<NewFestivalSingle />} />
        <Route path="/members" element={<Members />} />
        <Route path="/members/:id" element={<MembersSingle />} />
        <Route path="/clubs" element={<Clubes />} />
        <Route path="/clubs/:id" element={<ClubSingle />} />
      </Routes>
    </div>
  );
}

export default App;
