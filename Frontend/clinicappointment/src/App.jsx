import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { UserProvider } from "./context/Authcontext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import Dashboards from "./pages/Dashboard";
import Doctorscreen from "./Patients/getdoctor";
import Profile from "./Patients/Profile";
import Appointment from "./Patients/appointments";
import AdminDashboard from "./Admin/Homescreen";
import Adminalldoctors from "./Admin/Alldoctor";
import AdminAllpatients from "./Admin/Allpatients";
import AdminAllstaff from "./Admin/Allstaff";
import Adminallapointment from "./Admin/Allapointment";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<Dashboards />} />
          <Route path="/doctors" element={<Doctorscreen />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/Adminalldoctors" element={<Adminalldoctors />} />
          <Route path="/AdminAllpatients" element={<AdminAllpatients />} />
          <Route path="/AdminAllstaff" element={<AdminAllstaff />} />
          <Route path="Adminallapointment" element={<Adminallapointment/>}/>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
