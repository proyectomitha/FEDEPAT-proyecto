import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { Festivals } from "./festival/Festivals";
import { Members } from "./members/MemberPage";
import { Clubes } from "./clubes/ClubPage";
import { ClubSingle } from "./clubes/id/ClubSingle";
import { FestivalSingle } from "./festival/[id]/FestivalSingle";
import { CategorySingle } from "./festival/[id]/category/CategorySingle";
import { TestReactionMenu } from "./festival/[id]/category/test/TestReactionMenu";
import { TestHabilitySingle } from "./festival/[id]/category/test/TestHabilitySingle";
import { MembersSingle } from "./members/[id]/MemberSingle";
import { NewMember } from "./clubes/id/newMember/NewMember";
import { EditMember } from "./members/[id]/editMember/EditMember";
import { NewClub } from "./clubes/newClub/NewClub";
import { EditClub } from "./clubes/id/editClub/EditClub";
import { NewFestivalSingle } from "./festival/new-festival/NewFestivalSingle";
import { FestivalDraft } from "./festival/[id]/draft/FestivalDraft";
import { EditFestival } from "./festival/[id]/edit-festival/EditFestival";
import { FestivalMember } from "./festival/[id]/members/FestivalMember";
import { TestReactionSingle } from "./festival/[id]/category/test/reaction/TestReactionSingle";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/festivals" replace />} />
        <Route path="/festivals" element={<Festivals />} />
        <Route path="/festivals/new-festival" element={<NewFestivalSingle />} />
        <Route path="/festivals/:id/edit-festival" element={<EditFestival />} />
        <Route path="/festivals/:id/draft" element={<FestivalDraft />} />
        <Route path="/festivals/:id" element={<FestivalSingle />} />
        <Route path="/festivals/:id/members" element={<FestivalMember />} />
        <Route
          path="/festivals/:id/category/:category"
          element={<CategorySingle />}
        />
        <Route
          path="/festivals/:id/category/:category/test/reaction"
          element={<TestReactionMenu />}
        />
        <Route
          path="/festivals/:id/category/:category/test/reaction/:idSerie"
          element={<TestReactionSingle />}
        />
        <Route
          path="/festivals/:id/category/:category/test/hability"
          element={<TestHabilitySingle />}
        />
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
