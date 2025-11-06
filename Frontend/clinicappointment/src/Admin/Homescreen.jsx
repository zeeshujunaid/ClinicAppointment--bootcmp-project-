import Sidebar from "../Components/sidebar";

export default function Homescreen() {
  return (
    <div className="flex flex-row h-screen">
      {/* Sidebar - 30% */}
      <div className="w-[20%]  bg-yellow-500">
        <Sidebar />
      </div>

      {/* Main Content - 70% */}
      <div className="w-[86%] bg-red-500 p-6">
        <h1 className="text-2xl font-bold mb-4 text-blue-600">
          Welcome, Admin!
        </h1>
        <p className="text-gray-700">
          This is your dashboard area where you can view appointments, manage
          patients, and update your profile.
        </p>
      </div>
    </div>
  );
}
