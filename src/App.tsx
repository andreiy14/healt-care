import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AddForm, DetailPatient } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AddForm />} />
        <Route path="/detail-patient/:patientId" element={<DetailPatient />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
