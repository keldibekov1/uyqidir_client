import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HomeIcon } from "lucide-react";
import { RiStairsLine } from "react-icons/ri";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ads = [
  {
    id: 1,
    title: "333 xonali Talaba qizlar uchun",
    rooms: 3,
    floor: "5/5",
    priceAmount: 350000,
    priceCurrency: "so'm",
    period: "Oyiga",
    region: "Samarqand",
    labels: ["Yangi"],
    images: [
      "https://frankfurt.apollo.olxcdn.com/v1/files/k4dqfanxt2493-UZ/image;s=1000x700",
      "https://frankfurt.apollo.olxcdn.com/v1/files/081ktz2n4ihp3-UZ/image;s=1000x700",
      "https://frankfurt.apollo.olxcdn.com/v1/files/himjkqf48mjp2-UZ/image;s=1000x700",
    ],
  },
  {
    id: 2,
    title: "2 xonali uy",
    rooms: 2,
    floor: "3/5",
    priceAmount: 250000,
    priceCurrency: "so'm",
    period: "Oyiga",
    region: "Toshkent",
    labels: ["Yangi", "Xonadosh"],
    images: [
      "https://frankfurt.apollo.olxcdn.com/v1/files/himjkqf48mjp2-UZ/image;s=1000x700",
      "https://frankfurt.apollo.olxcdn.com/v1/files/081ktz2n4ihp3-UZ/image;s=1000x700",
      "https://frankfurt.apollo.olxcdn.com/v1/files/k4dqfanxt2493-UZ/image;s=1000x700",
    ],
  },
];

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState<{
    [key: number]: number;
  }>({});

  const nextImage = (adId: number, total: number) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [adId]: (prev[adId] || 0) + 1 < total ? (prev[adId] || 0) + 1 : 0,
    }));
  };

  const prevImage = (adId: number, total: number) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [adId]: (prev[adId] || 0) - 1 >= 0 ? (prev[adId] || 0) - 1 : total - 1,
    }));
  };

  useEffect(() => {
    // @ts-ignore
    const tg = window.Telegram?.WebApp;
    if (tg?.MainButton) {
      tg.MainButton.setText("E'lon joylashtirish");
      tg.MainButton.show();
      tg.MainButton.onClick(() => {
        window.location.href = "/create-ad";
      });
    }
    return () => {
      if (tg?.MainButton) {
        tg.MainButton.hide();
        tg.MainButton.offClick();
      }
    };
  }, []);

  return (
    <div className="pt-24 px-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100"></h1>
      elonlar
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {ads.map((ad) => (
          <Link
            to={`/ads/${ad.id}`}
            key={ad.id}
            className="group rounded-2xl overflow-hidden relative shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/80 dark:bg-gray-900/70 backdrop-blur-md border border-gray-200 dark:border-gray-700"
          >
            <div className="relative">
              <img
                src={ad.images[currentImageIndex[ad.id] || 0]}
                alt={ad.title}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
              />

              <button
                onClick={(e) => {
                  e.preventDefault();
                  prevImage(ad.id, ad.images.length);
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 
       bg-white/70 dark:bg-gray-800/70 
       text-gray-800 dark:text-white 
       w-10 h-10 rounded-full 
       flex items-center justify-center 
       shadow-md hover:shadow-lg 
       transition"
              >
                <FaChevronLeft size={18} />
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  nextImage(ad.id, ad.images.length);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 
       bg-white/70 dark:bg-gray-800/70 
       text-gray-800 dark:text-white 
       w-10 h-10 rounded-full 
       flex items-center justify-center 
       shadow-md hover:shadow-lg 
       transition"
              >
                <FaChevronRight size={18} />
              </button>

              <div
                className="absolute bottom-3 right-3 
                  bg-black/60 text-white 
                  text-xs font-medium 
                  px-2 py-1 rounded-md"
              >
                {(currentImageIndex[ad.id] || 0) + 1} / {ad.images.length}
              </div>

              <div className="absolute top-3 left-3 flex gap-2">
                {ad.labels.map((label, i) => (
                  <span
                    key={i}
                    className="bg-blue-600/90 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-sm"
                  >
                    {label}
                  </span>
                ))}
              </div>

              <div className="absolute bottom-3 left-3 bg-white/90 dark:bg-gray-800/90 text-black dark:text-white text-sm font-bold px-3 py-1 rounded-lg shadow-sm">
                {ad.priceAmount.toLocaleString()} {ad.priceCurrency}{" "}
                <span className="text-gray-600 dark:text-gray-400 text-xs">
                  / {ad.period}
                </span>
              </div>
            </div>

            <div className="p-5">
              <h2 className="text-lg font-semibold line-clamp-1 mb-1 text-gray-900 dark:text-gray-100">
                {ad.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-1 mb-3">
                {ad.region}
              </p>

              <div className="flex flex-wrap gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 flex items-center gap-1">
                  <HomeIcon size={16} /> {ad.rooms} xona
                </span>
                <span className="px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 flex items-center gap-1">
                  <RiStairsLine size={16} /> {ad.floor}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
