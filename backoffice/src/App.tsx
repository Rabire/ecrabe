import { Route, Routes } from "react-router-dom";
import StudentProfile from "./components/app_component/StudentProfile";
import Sidebar from "./components/app_component/sidebar";
import AddCoursePage from "./views/AddCoursePage";
import FormationPage from "./views/FormationPage";
import Formations from "./views/Formations";
import Home from "./views/Home";
import LoginPage from "./views/LoginPage";
import Parametres from "./views/Parametres";
import SignUpPage from "./views/SignUpPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/" element={<ProtectedRoutes />} />
    </Routes>
  );
}

function ProtectedRoutes() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow">
        <Routes>
          <Route index element={<Home />} />
          <Route path="students" element={<Home />} />
          <Route path="students/:id" element={<StudentProfile />} />
          <Route path="formations" element={<Formations />} />
          <Route path="formation/:id" element={<FormationPage />} />
          <Route path="addcourse" element={<AddCoursePage />} />
          <Route path="parametres" element={<Parametres />} />
          <Route path="compte" element={<Parametres />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
