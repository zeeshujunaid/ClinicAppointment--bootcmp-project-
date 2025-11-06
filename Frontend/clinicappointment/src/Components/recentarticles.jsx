export default function Recentarticle() {
  const articles = [
    {
      id: 1,
      img: "https://cdn-icons-png.flaticon.com/512/3774/3774299.png",
      title: "Understanding Heart Health",
      desc: "Learn the basics of maintaining a healthy heart and lifestyle with expert advice.",
      doctor: "Dr. Sarah Malik",
    },
    {
      id: 2,
      img: "https://cdn-icons-png.flaticon.com/512/3774/3774289.png",
      title: "Managing Diabetes Effectively",
      desc: "Tips and diet plans from specialists to help you manage your sugar levels naturally.",
      doctor: "Dr. Ahmed Khan",
    },
    {
      id: 3,
      img: "https://cdn-icons-png.flaticon.com/512/3774/3774305.png",
      title: "Mental Health Awareness",
      desc: "Know why taking care of your mental health is equally important as physical health.",
      doctor: "Dr. Ayesha Fatima",
    },
  ];

  return (
    <div className="bg-gray-50 py-12 px-6">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-10">
        🩺 Recent Health Articles
      </h2>

      {/* Articles Section */}
      <div className="flex flex-wrap justify-center gap-8">
        {articles.map((article) => (
          <div
            key={article.id}
            className="flex flex-col bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 w-full sm:w-[300px] md:w-[320px] overflow-hidden"
          >
            <div className="flex justify-center bg-blue-50 p-4">
              <img
                src={article.img}
                alt={article.title}
                className="w-24 h-24 object-contain"
              />
            </div>
            <div className="flex flex-col p-5">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {article.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3">{article.desc}</p>
              <p className="text-xs text-blue-500 font-medium">
                👨‍⚕️ {article.doctor}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
