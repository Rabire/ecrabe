import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Parametres from "./views/Parametres";
import Formations from "./views/Formations";
import Sidebar from "./components/app_component/sidebar";

function App() {
  return (
    <main className="flex">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/formations" element={<Formations />} />
        <Route path="/parametres" element={<Parametres />} />
      </Routes>
    </main>
  );
}

export default App;
