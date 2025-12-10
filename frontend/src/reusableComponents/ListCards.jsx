import React from "react";
import { FaMapMarkerAlt, FaExchangeAlt } from "react-icons/fa";
import { MdCompareArrows } from "react-icons/md";

export default function ListCards() {
  const cards = [
    {
      icon: FaMapMarkerAlt,
      title: "Track Location",
      content: "Track your product delivery in real-time.",
    },
    {
      icon: MdCompareArrows,
      title: "Compare Product",
      content: "Compare features between multiple products.",
    },
    {
      icon: FaExchangeAlt,
      title: "Xchange Product",
      content: "Exchange your products quickly and easily.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className="flex items-center gap-4 bg-white dark:bg-gray-800 shadow-md p-4 rounded-xl hover:shadow-lg transition"
        >
          <div className="text-blue-600 text-3xl">
            <card.icon />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {card.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {card.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
