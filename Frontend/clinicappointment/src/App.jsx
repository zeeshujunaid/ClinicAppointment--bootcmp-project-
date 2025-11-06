import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import Dashboards from "./pages/Dashboard";
import Doctorscreen from "./Patients/getdoctor";
import Profile from "./Patients/Profile";
import Appointment from "./Patients/appointments";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<Dashboards/>}/>
          <Route path="/doctors" element={<Doctorscreen/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/appointment" element={<Appointment/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
