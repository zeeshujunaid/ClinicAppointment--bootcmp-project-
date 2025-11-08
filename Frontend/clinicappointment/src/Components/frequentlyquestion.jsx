export default function FrequentlyQuestion() {
  const faqs = [
    {
      question: "How can I book an appointment with a doctor?",
      answer:
        "Simply log in, go to the 'Appointments' section, select your doctor, choose a date and time, and confirm your booking.",
    },
    {
      question: "Can I cancel or reschedule my appointment?",
      answer:
        "Yes, you can cancel or reschedule appointments anytime before your booked time through your dashboard.",
    },
    {
      question: "Is my medical data secure?",
      answer:
        "Absolutely! Your medical information is stored securely and shared only with authorized doctors.",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 py-16 px-6">
      <h2 className="text-3xl font-bold text-blue-700 mb-12 text-center">
        💬 Frequently Asked Questions
      </h2>

      <div className="flex flex-col md:flex-row items-center justify-center gap-10">
        {/* Left Side - Doctor Image */}
        <div className="flex justify-center">
          <img
            src="/questiondoc.jpeg"
            alt="Doctor"
            className="w-72 h-72 object-contain rounded-2xl shadow-lg bg-white p-4"
          />
        </div>

        {/* Right Side - FAQs */}
        <div className="flex flex-col gap-6 max-w-lg">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <h3 className="text-lg font-semibold text-blue-700 mb-2">
                {faq.question}
              </h3>
              <p className="text-gray-600 text-sm">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
