import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./context/Authcontext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import Dashboards from "./pages/Dashboard";
import Doctorscreen from "./Patients/getdoctor";
import Profile from "./Patients/Profile";
import Appointment from "./Patients/appointments";
import Adminhomescreen from "./Admin/Homescreen";
import Adminalldoctors from "./Admin/Alldoctor";
import AdminAllpatients from "./Admin/Allpatients";
import AdminAllstaff from "./Admin/Allstaff";
import Adminallapointment from "./Admin/Allapointment";
import Adminaddstaff from "./Admin/Adddoctor";
import Staffallapointments from "./Staff/Allappointments";
import Staffcreateroom from "./Staff/Createroomschedule";
import StaffHomescreen from "./Staff/Homescreen";
import Doctorallapointment from "./Doctor/ALLapointment";
import Doctorallstaff from "./Doctor/Allstaff";
import Doctornextappointment from "./Doctor/Homescreen";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          pauseOnHover
          theme="colored"
        />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<Dashboards />} />
          <Route path="/doctors" element={<Doctorscreen />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/Adminalldoctors" element={<Adminalldoctors />} />
          <Route path="/AdminAllpatients" element={<AdminAllpatients />} />
          <Route path="/AdminAllstaff" element={<AdminAllstaff />} />
          <Route path="/Adminallapointment" element={<Adminallapointment />} />
          <Route path="/Staffcreateroom" element={<Staffcreateroom />} />
          <Route path="/Adminaddstaff" element={<Adminaddstaff />} />
          <Route path="Adminhomescreen" element={<Adminhomescreen />} />
          <Route
            path="/Staffallapointments"
            element={<Staffallapointments />}
          />
          <Route path="/StaffHomescreen" element={<StaffHomescreen />} />
          <Route
            path="/Doctorallapointment"
            element={<Doctorallapointment />}
          />
          <Route path="/Doctorallstaff" element={<Doctorallstaff />} />
          <Route
            path="/Doctornextappointment"
            element={<Doctornextappointment />}
          />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
