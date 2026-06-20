import { Routes, Route } from "react-router-dom";
import { ApplicationViews } from "./routes/AppRoutes.jsx";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<ApplicationViews />} />
    </Routes>
  );
}

export default App;
