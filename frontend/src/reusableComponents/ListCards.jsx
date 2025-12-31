export default function ListCards() {
  const data = [
    { title: "Track Location", desc: "Real-time order tracking" },
    { title: "Compare Products", desc: "Compare before buying" },
    { title: "Easy Exchange", desc: "Fast & hassle-free" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-full">
      {data.map((item, i) => (
        <div
          key={i}
          className="
            bg-white rounded-xl shadow-md
            p-6 w-full max-w-full
            text-center
          "
        >
          <h3 className="font-semibold text-lg">{item.title}</h3>
          <p className="text-gray-600 text-sm mt-2">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}
