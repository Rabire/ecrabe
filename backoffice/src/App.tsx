import { Route, Routes } from "react-router-dom";
import StudentProfile from "./components/app_component/StudentProfile";
import Sidebar from "./components/app_component/sidebar";
import FormationPage from "./views/FormationPage";
import Formations from "./views/Formations";
import Home from "./views/Home";
import Parametres from "./views/Parametres";

function App() {
  return (
    <main className="flex">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/students" element={<Home />} />
        <Route path="/students/:id" element={<StudentProfile />} />
        <Route path="/formations" element={<Formations />} />
        <Route path="/formation/:id" element={<FormationPage />} />
        <Route path="/parametres" element={<Parametres />} />
        <Route path="/compte" element={<Parametres />} />
      </Routes>
    </main>
  );
}

export default App;
