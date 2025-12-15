const products = [
  {
    id: 1,
    name: "Ro Enrich Glory RO+UV+UF Copper Water Purifier",
    brand: "Pureit",
    rating: 4.6,
    reviews: 112,
    price: 11999,
    mrp: 12599,
    discount: "20% Off",
    emi: "No-cost EMI from ₹2,084/mo",
    images: [
      "https://i.ibb.co/Ln7s2h9/ro1.jpg",
      "https://i.ibb.co/4Y5CrXz/ro1b.jpg",
      "https://i.ibb.co/1b2gjsk/ro1c.jpg",
      "https://i.ibb.co/p2X38dT/ro1d.jpg"
    ],
    description:
      "Getting pure and safe water for daily consumption is easy with the Aqua Fresh Copper 18 ltr Audi alkaline technology India no 01 Ro Water purifier. It uses RO + UV + UF + TDS + Copper purification to deliver 100% safe water.",
    deliveryText: "Delivery by DD/MM/YYYY. If you order before HH:MM",
    offers: [
      "HDFC Bank: 10% Instant Discount",
      "SBI Credit Card: 10% Cashback",
      "No-cost EMI Available",
    ],
    specifications: {
      filtrationCapacity: "18 L/hr",
      purificationCapacity: "2000 L",
      purificationProcess: "RO + UV + UF + Copper",
      coldWaterCapacity: "0 L",
      hotWaterCapacity: "0 L",
      uvLight: "Yes, in storage tank",
      hotDispenser: "No",
      coldDispenser: "No",
      digitalDisplay: "Yes",
      installationType: "Wall Mount",
      stages: "7",
    },
  },

  {
    id: 2,
    name: "Kent Grand Plus ZWW RO + UV + UF + TDS Controller",
    brand: "Kent",
    rating: 4.5,
    reviews: 240,
    price: 15000,
    mrp: 16999,
    discount: "18% Off",
    emi: "EMI starting from ₹2,300/mo",
    images: [
      "https://i.ibb.co/8mMXrWb/ro2.jpg",
      "https://i.ibb.co/3sCFQWk/ro2b.jpg",
      "https://i.ibb.co/5RzZSkR/ro2c.jpg",
      "https://i.ibb.co/SPxTHFh/ro2d.jpg"
    ],
    description:
      "Kent Grand Plus comes with RO + UV + UF multistage purification for pure drinking water. TDS controller ensures natural minerals are retained.",
    deliveryText: "Delivery within 2–3 days",
    offers: ["SBI Card: ₹1500 Instant Discount", "Free installation"],
    specifications: {
      filtrationCapacity: "20 L/hr",
      purificationCapacity: "2500 L",
      purificationProcess: "RO + UV + UF",
      coldWaterCapacity: "0 L",
      hotWaterCapacity: "0 L",
      uvLight: "Yes",
      installationType: "Wall Mount",
      stages: "7",
    },
  },

  {
    id: 3,
    name: "Aquaguard Aura RO+UV+UF with Active Copper",
    brand: "Eureka Forbes",
    rating: 4.4,
    reviews: 198,
    price: 13999,
    mrp: 15999,
    discount: "12% Off",
    emi: "EMI from ₹1,899/mo",
    images: [
      "https://i.ibb.co/vQyx4hv/ro3.jpg",
      "https://i.ibb.co/sQG3MWC/ro3b.jpg",
      "https://i.ibb.co/kHvmmkn/ro3c.jpg",
      "https://i.ibb.co/fd1ZxYk/ro3d.jpg"
    ],
    description:
      "Aquaguard Aura with Active Copper Technology enhances immunity and improves taste. The RO + UV + UF purification ensures water is free from viruses and bacteria.",
    deliveryText: "Delivery in 3–5 days",
    offers: ["HDFC: 5% Cashback", "Free Filter Replacement (1 Year)"],
    specifications: {
      filtrationCapacity: "15 L/hr",
      purificationCapacity: "1800 L",
      purificationProcess: "RO + UV + UF + Active Copper",
      uvLight: "Yes",
      installationType: "Wall Mount / Counter Top",
      stages: "8",
    },
  },

  {
    id: 4,
    name: "Livpure Glo RO + UV + Mineralizer",
    brand: "Livpure",
    rating: 4.3,
    reviews: 310,
    price: 10499,
    mrp: 12999,
    discount: "25% Off",
    emi: "EMI from ₹1,400/mo",
    images: [
      "https://i.ibb.co/PtW4VWG/ro4.jpg",
      "https://i.ibb.co/YZ3z9nz/ro4b.jpg",
      "https://i.ibb.co/jLRbKry/ro4c.jpg",
      "https://i.ibb.co/wK29Qz9/ro4d.jpg"
    ],
    description:
      "Livpure Glo with RO + UV purification and a mineralizer ensures balanced and healthy drinking water.",
    deliveryText: "Delivery in 2 days",
    offers: ["Axis Bank 10% Discount", "Free Installation"],
    specifications: {
      filtrationCapacity: "12 L/hr",
      purificationCapacity: "1600 L",
      purificationProcess: "RO + UV + Mineralizer",
      installationType: "Wall Mount",
      stages: "6",
    },
  },

  {
    id: 5,
    name: "HUL Pureit Classic RO+UV+MF Water Purifier",
    brand: "Pureit",
    rating: 4.2,
    reviews: 180,
    price: 9999,
    mrp: 10999,
    discount: "10% Off",
    emi: "EMI from ₹1,299/mo",
    images: [
      "https://i.ibb.co/QQcNZk6/ro5.jpg",
      "https://i.ibb.co/DwqHjSv/ro5b.jpg",
      "https://i.ibb.co/fqf1L1S/ro5c.jpg",
      "https://i.ibb.co/FbLGqGT/ro5d.jpg"
    ],
    description:
      "Pureit Classic RO+UV+MF guarantees 100% RO filtered water with multi-stage purification.",
    deliveryText: "Delivery within 48 hours",
    offers: ["ICICI: 750 Cashback"],
    specifications: {
      filtrationCapacity: "10 L/hr",
      purificationCapacity: "1500 L",
      purificationProcess: "RO + UV + MF",
      stages: "6",
      installationType: "Wall Mount",
    },
  },

  {
    id: 6,
    name: "Aqua Fresh Swift RO+UV+UF+TDS Controller",
    brand: "AquaFresh",
    rating: 4.1,
    reviews: 105,
    price: 8999,
    mrp: 12999,
    discount: "30% Off",
    emi: "EMI from ₹999/mo",
    images: [
      "https://i.ibb.co/Y3Bgb7q/ro6.jpg",
      "https://i.ibb.co/m6MMh6C/ro6b.jpg",
      "https://i.ibb.co/djLbw3H/ro6c.jpg",
      "https://i.ibb.co/mGktgKx/ro6d.jpg"
    ],
    description:
      "Affordable RO purifier with UV + UF purification and TDS adjustments for borewell water.",
    offers: ["Free Pre-Filter Kit"],
    specifications: {
      filtrationCapacity: "14 L/hr",
      purificationCapacity: "1800 L",
      purificationProcess: "RO + UV + UF + TDS",
      stages: "7",
    },
  },

  {
    id: 7,
    name: "Blue Star Excella RO+UF 6 L Purifier",
    brand: "Blue Star",
    rating: 4.3,
    reviews: 155,
    price: 8499,
    mrp: 9990,
    discount: "15% Off",
    emi: "EMI from ₹1,150/mo",
    images: [
      "https://i.ibb.co/CJ0mpc6/ro7.jpg",
      "https://i.ibb.co/9Y4bvwM/ro7b.jpg",
      "https://i.ibb.co/sbwKRVx/ro7c.jpg",
      "https://i.ibb.co/2jJmfQ2/ro7d.jpg"
    ],
    description:
      "Blue Star’s Excella RO+UF provides pure and great-tasting drinking water with a 6-stage purification system.",
    specifications: {
      filtrationCapacity: "12 L/hr",
      purificationCapacity: "1400 L",
      purificationProcess: "RO + UF",
      stages: "6",
    },
  },

  {
    id: 8,
    name: "Faber Galaxy Fresh RO+UV+UF with Copper Guard",
    brand: "Faber",
    rating: 4.4,
    reviews: 167,
    price: 12999,
    mrp: 14999,
    discount: "14% Off",
    emi: "EMI from ₹1,799/mo",
    images: [
      "https://i.ibb.co/fHbhkXM/ro8.jpg",
      "https://i.ibb.co/NK4WJHY/ro8b.jpg",
      "https://i.ibb.co/zmhj7y1/ro8c.jpg",
      "https://i.ibb.co/nk8h8bW/ro8d.jpg"
    ],
    description:
      "Faber Galaxy uses RO+UV+UF triple purification along with Copper Guard technology to ensure healthy drinking water.",
    specifications: {
      filtrationCapacity: "13 L/hr",
      purificationCapacity: "1800 L",
      stages: "7",
    },
  },

  {
    id: 9,
    name: "AO Smith Z1 UV + UF + Hot Water Purifier",
    brand: "AO Smith",
    rating: 4.6,
    reviews: 198,
    price: 15999,
    mrp: 18999,
    discount: "15% Off",
    emi: "EMI from ₹2,200/mo",
    images: [
      "https://i.ibb.co/0M4T4mJ/ro9.jpg",
      "https://i.ibb.co/0C9XmfL/ro9b.jpg",
      "https://i.ibb.co/SVgZ8yv/ro9c.jpg",
      "https://i.ibb.co/SnMK94H/ro9d.jpg"
    ],
    description:
      "AO Smith Z1 provides UV purification and hot water at 45°C and 80°C.",
    specifications: {
      purificationProcess: "UV + UF",
      hotWaterCapacity: "Yes, 45°C and 80°C",
      stages: "5",
    },
  },

  {
    id: 10,
    name: "Havells Max Alkaline RO+UV Water Purifier",
    brand: "Havells",
    rating: 4.5,
    reviews: 220,
    price: 14999,
    mrp: 16999,
    discount: "12% Off",
    emi: "EMI from ₹1,999/mo",
    images: [
      "https://i.ibb.co/F4WQzC3/ro10.jpg",
      "https://i.ibb.co/nfnY0nw/ro10b.jpg",
      "https://i.ibb.co/GJ82zZX/ro10c.jpg",
      "https://i.ibb.co/TvGmQhJ/ro10d.jpg"
    ],
    description:
      "Havells Max Alkaline provides 100% RO purified alkaline water with balanced minerals and antioxidants.",
    specifications: {
      filtrationCapacity: "15 L/hr",
      purificationProcess: "RO + UV + Alkaline",
      stages: "8",
    },
  },
];

export default products;
