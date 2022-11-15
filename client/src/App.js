import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./route/PrivateRoute";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage";
import RoomCard from "./components/RoomCard/RoomCard";
import EmployeesPage from "./pages/adminpage/EmployeesPage/EmployeesPage";
import ProductsPage from "./pages/adminpage/ProductsPage/ProductsPage";
import ShiftPage from "./pages/adminpage/ShiftPage";
import RoomPage from './pages/RoomPage'

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} /> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/room/:roomId" element={<RoomPage />}></Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/manage-employees" element={<EmployeesPage />} />
        <Route path="/manage-shift" element={<ShiftPage />} />
        <Route path="/manage-products" element={<ProductsPage />} />
      </Routes>
    </div>
  );
}

export default App;
