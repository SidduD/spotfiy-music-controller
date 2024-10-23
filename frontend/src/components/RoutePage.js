import AppLayout from "./AppLayout";
import CreateOrUpdateRoomPage from "./CreateOrUpdateRoomPage";
import Room from "./Room";
import RoomJoinPage from "./RoomJoinPage";
import HomePage from "./HomePage";
import axios from "axios";

import { Routes, Route } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:8000";

function RoutePage() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/join" element={<RoomJoinPage />} />
        <Route path="/create" element={<CreateOrUpdateRoomPage />} />
        <Route path="/room/:roomCode" element={<Room />} />
      </Route>
    </Routes>
  );
}

export default RoutePage;
