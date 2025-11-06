export default function Sidebar() {
  return (
    <div className="flex flex-col h-screen w-64 bg-blue-600 text-white p-6">
      {/* Doctor Info */}
      <div className="flex items-center space-x-3 mb-10">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
          alt="Doctor"
          className="w-12 h-12 rounded-full border-2 border-white"
        />
        <div>
          <h2 className="font-semibold text-lg">Dr. Sarah Malik</h2>
          <p className="text-sm text-blue-200">Cardiologist</p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col space-y-5">
        <button className="flex items-center space-x-3 hover:bg-blue-500 p-2 rounded-lg transition-all">
          <i className="fas fa-home"></i>
          <span>Dashboard</span>
        </button>

        <button className="flex items-center space-x-3 hover:bg-blue-500 p-2 rounded-lg transition-all">
          <i className="fas fa-calendar-check"></i>
          <span>Appointments</span>
        </button>

        <button className="flex items-center space-x-3 hover:bg-blue-500 p-2 rounded-lg transition-all">
          <i className="fas fa-users"></i>
          <span>Patients</span>
        </button>

        {/* <button className="flex items-center space-x-3 hover:bg-blue-500 p-2 rounded-lg transition-all">
          <i className="fas fa-cog"></i>
          <span>Settings</span>
        </button> */}
      </div>

      {/* Logout Button */}
      <div className="mt-auto">
        <button className="flex items-center space-x-3 hover:bg-blue-500 p-2 rounded-lg transition-all w-full">
          <i className="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
