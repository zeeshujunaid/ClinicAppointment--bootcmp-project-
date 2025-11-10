import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/Authcontext";
import Patientscreen from "../Patients/Homescreen";
import Doctorscreen from "../Doctor/Homescreen";
import Adminscreen from "../Admin/Homescreen";
import Staffscreen from "../Staff/Homescreen";

export default function Dashboard() {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [screen, setScreen] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (user?.role === "patient") setScreen(<Patientscreen />);
      else if (user?.role === "doctor") setScreen(<Doctorscreen />);
      else if (user?.role === "admin") setScreen(<Adminscreen />);
      else if (user?.role === "staff") setScreen(<Staffscreen/>);
      else setScreen(<p className="text-red-500">Role not recognized</p>);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [user]);

  if (loading) {
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-100">
        <img
          src="https://img.freepik.com/premium-vector/professional-medical-logo-design-modern-healthcare-clinic-hospital-logo-template_1290800-258.jpg"
          alt="Clinic Logo"
          className="w-28 h-28 mb-6 animate-pulse"
        />
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent mb-3"></div>
        <p className="text-gray-600 font-medium text-sm">
          Loading your dashboard...
        </p>
      </div>
    );
  }

  return <>{screen}</>;
}
