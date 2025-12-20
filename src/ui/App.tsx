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
import { NewMember } from "./clubes/id/newMember/NewMember";
import { EditMember } from "./members/[id]/editMember/EditMember";
import { NewClub } from "./clubes/newClub/NewClub";
import { EditClub } from "./clubes/id/editClub/EditClub";

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
        <Route path="/members/:id/edit" element={<EditMember />} />
        <Route path="/clubs" element={<Clubes />} />
        <Route path="/clubs/new-club" element={<NewClub />} />
        <Route path="/clubs/:id" element={<ClubSingle />} />
        <Route path="/clubs/:id/edit" element={<EditClub />} />
        <Route path="/clubs/:id/new-member" element={<NewMember />} />
      </Routes>
    </div>
  );
}

export default App;
