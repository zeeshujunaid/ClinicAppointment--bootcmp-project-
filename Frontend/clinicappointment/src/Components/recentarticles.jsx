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
    <div className="px-6 py-12 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-10 text-blue-600">
        🩺 Recent Health Articles
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {articles.map((article) => (
          <div
            key={article.id}
            className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={article.img}
              alt={article.title}
              className="w-full h-40 object-contain bg-blue-50 p-4"
            />
            <div className="p-5">
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
