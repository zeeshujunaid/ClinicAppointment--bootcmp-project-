import React from "react";
import Navbar from "../Components/navbar";
import Recentarticle from "../Components/recentarticles";
import FrequentlyQuestion from "../Components/frequentlyquestion";

export default function Homescreen() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 lg:px-24 py-24 bg-gradient-to-br from-blue-50 via-white to-cyan-100 min-h-[85vh]">
        <div className="flex-1 text-center md:text-left space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 leading-tight">
            Welcome to <span className="text-blue-600">ClinicCare</span>
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-md mx-auto md:mx-0">
            Book appointments, consult top doctors, and manage your health
            online — anytime, anywhere.
          </p>
          <a
            href="/appointments"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300"
          >
            Book Appointment
          </a>
        </div>

        <div className="flex-1 flex justify-center mt-10 md:mt-0">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4626/4626710.png"
            alt="Doctor Illustration"
            className="w-72 md:w-96 drop-shadow-lg"
          />
        </div>
      </section>

      {/* About Section */}
      <section className="px-8 md:px-16 lg:px-24 py-20 bg-white">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-12">
          Why Choose ClinicCare?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Card 1 */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
              alt="Expert Doctors"
              className="w-20 mx-auto mb-5"
            />
            <h3 className="text-lg font-semibold text-blue-700 text-center mb-2">
              Expert Doctors
            </h3>
            <p className="text-gray-600 text-center text-sm leading-relaxed">
              Consult with highly qualified and experienced doctors for all your
              medical needs.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3209/3209265.png"
              alt="Easy Appointments"
              className="w-20 mx-auto mb-5"
            />
            <h3 className="text-lg font-semibold text-blue-700 text-center mb-2">
              Easy Appointments
            </h3>
            <p className="text-gray-600 text-center text-sm leading-relaxed">
              Book appointments easily with just a few clicks — no long waiting
              lines!
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2920/2920344.png"
              alt="24/7 Support"
              className="w-20 mx-auto mb-5"
            />
            <h3 className="text-lg font-semibold text-blue-700 text-center mb-2">
              24/7 Support
            </h3>
            <p className="text-gray-600 text-center text-sm leading-relaxed">
              Our support team is always available to help you whenever you need
              assistance.
            </p>
          </div>
        </div>
      </section>

      {/* Recent Articles Section */}
      <section className="bg-gray-50 py-16 px-8 md:px-16 lg:px-24">
        <Recentarticle />
      </section>

      {/* Frequently Asked Questions */}
      <section className="bg-white py-16 px-8 md:px-16 lg:px-24">
        <FrequentlyQuestion />
      </section>

      {/* Footer */}
      <footer className="bg-blue-700 text-white text-center py-8 mt-10 shadow-inner">
        <p className="text-sm opacity-90">
          © {new Date().getFullYear()} ClinicCare — All Rights Reserved
        </p>
      </footer>
    </>
  );
}
