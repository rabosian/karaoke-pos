import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./route/PrivateRoute";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage";
import RoomCard from "./components/RoomCard/RoomCard";
import EmployeesPage from "./pages/adminpage/EmployeesPage/EmployeesPage";
import ProductsPage from "./pages/adminpage/ProductsPage/ProductsPage";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} /> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/room/:roomId" element={<RoomCard />}></Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/manage-employees" element={<EmployeesPage />} />
        <Route path="/manage-products" element={<ProductsPage />} />
      </Routes>
    </div>
  );
}

export default App;
