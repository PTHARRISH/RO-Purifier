import Navbar from "../reusableComponents/Navbar";
import Footer from "../reusableComponents/Footer";

/* ---------------- DUMMY DATA ---------------- */

const bannerData = {
  title: "Clean Water. Clear Trust.",
  description:
    "We believe every drop counts. Our mission is to make safe, pure water accessible to every home through high-quality RO systems and reliable service.",
  image:
    "https://images.unsplash.com/photo-1581093458799-7b2b6c1a7a44?auto=format&fit=crop&w=900&q=80",
};

const brandStory = [
  "PureFlow started with a simple goal — to bring transparency and trust into water purification and after-sales service. We noticed how difficult it was for customers to find genuine products, spare parts, or skilled technicians.",
  "So, we built a single platform where you can buy, book, and track everything related to your purifier — all in one place. From installation to maintenance, PureFlow connects you with verified technicians and quality products, ensuring your home always stays healthy.",
];

const valuesData = [
  {
    title: "Sustainability",
    desc: "Encouraging reuse, exchange, and eco-friendly water solutions.",
  },
  {
    title: "Purity First",
    desc: "Only trusted, tested products and services.",
  },
  {
    title: "Reliability",
    desc: "Certified technicians, transparent pricing, and no hidden charges.",
  },
  {
    title: "Ease of Use",
    desc: "Designed for effortless shopping and service booking.",
  },
];

/* ---------------- COMPONENT ---------------- */

export default function AboutUs() {
  return (
    <div>
      <Navbar />

      {/* CUSTOM ABOUT BANNER */}
      <section className="bg-gradient-to-r from-[#EDFBFF] to-white max-w-7xl mx-auto rounded-3xl shadow-lg my-16">
        <div className="max-w-5xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT - Image */}
          <div>
            <img
              src={bannerData.image}
              alt="Clean Water Purification"
              className="rounded-3xl shadow-lg w-full object-cover"
            />
          </div>

          {/* RIGHT - Content */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-6">
              {bannerData.title}
            </h1>
            <p className="text-gray-700 text-lg leading-relaxed max-w-xl">
              {bannerData.description}
            </p>
          </div>

        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="max-w-8xl mx-auto px-4 py-16">

        {/* Brand Story */}
        <div className="mb-14">
          <h2 className="text-4xl font-bold text-blue-700 mb-4">
            Brand Story
          </h2>

          {brandStory.map((para, index) => (
            <p
              key={index}
              className="text-gray-700 max-w-3xl leading-relaxed mt-4 first:mt-0"
            >
              {para}
            </p>
          ))}
        </div>

        {/* Values */}
        <div>
          <h3 className="text-3xl font-bold text-gray-800 mb-10">
            Our Values
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {valuesData.map((item, index) => (
              <div
                key={index}
                className="bg-[#EDFBFF] p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <h4 className="text-xl font-semibold text-black mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}
