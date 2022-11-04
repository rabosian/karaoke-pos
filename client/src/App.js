import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./route/PrivateRoute";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage";
import RoomPage from "./pages/RoomPage";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} /> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/room/:roomId" element={<RoomPage />}></Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
