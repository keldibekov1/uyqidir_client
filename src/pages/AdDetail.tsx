// pages/AdDetail.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { HomeIcon } from "lucide-react";
import { RiStairsLine } from "react-icons/ri";

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
    description: "Talabalar uchun qulay, remont qilingan, markazda joylashgan.",
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
    description: "Metro yaqinida joylashgan, yangi remont qilingan.",
    images: [
      "https://frankfurt.apollo.olxcdn.com/v1/files/himjkqf48mjp2-UZ/image;s=1000x700",
      "https://frankfurt.apollo.olxcdn.com/v1/files/081ktz2n4ihp3-UZ/image;s=1000x700",
      "https://frankfurt.apollo.olxcdn.com/v1/files/k4dqfanxt2493-UZ/image;s=1000x700",
    ],
  },
];

const AdDetail = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // @ts-ignore
    const tg = window.Telegram?.WebApp;
    if (tg?.BackButton) {
      tg.BackButton.show();
      tg.BackButton.onClick(() => {
        navigate(-1);
      });
    }
    return () => {
      if (tg?.BackButton) {
        tg.BackButton.hide();
        tg.BackButton.offClick(() => navigate(-1));
      }
    };
  }, [navigate]);

  const { id } = useParams();
  const ad = ads.find((a) => a.id === Number(id));

  const [currentImage, setCurrentImage] = useState(0);
  const [_, setDirection] = useState<"left" | "right">("left");
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  if (!ad) {
    return <p className="text-center mt-20">E'lon topilmadi 😢</p>;
  }

  const nextImage = () => {
    setDirection("left");
    setCurrentImage((prev) => (prev + 1 < ad.images.length ? prev + 1 : 0));
  };

  const prevImage = () => {
    setDirection("right");
    setCurrentImage((prev) =>
      prev - 1 >= 0 ? prev - 1 : ad.images.length - 1
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextImage(); // chapga surildi → keyingi rasm
      } else {
        prevImage(); // o‘ngga surildi → oldingi rasm
      }
    }
    setTouchStartX(null);
  };

  return (
    <div className="pt-24 px-6 max-w-4xl mx-auto">
      <div
        className="relative rounded-xl overflow-hidden shadow-lg h-96"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex w-full h-full transition-transform duration-500"
          style={{ transform: `translateX(-${currentImage * 100}%)` }}
        >
          {ad.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={ad.title}
              className="w-full h-96 object-cover flex-shrink-0"
            />
          ))}
        </div>

        {/* Tugmalar */}
        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 
      bg-white/70 dark:bg-gray-800/70 w-10 h-10 rounded-full 
      flex items-center justify-center shadow-md"
        >
          <FaChevronLeft size={18} />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 
      bg-white/70 dark:bg-gray-800/70 w-10 h-10 rounded-full 
      flex items-center justify-center shadow-md"
        >
          <FaChevronRight size={18} />
        </button>

        {/* Indikator */}
        <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-md">
          {currentImage + 1} / {ad.images.length}
        </div>
      </div>

      {/* Detallar */}
      <div className="mt-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          {ad.title}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{ad.region}</p>

        <div className="flex flex-wrap gap-3 mb-4">
          <span className="px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 flex items-center gap-1">
            <HomeIcon size={16} /> {ad.rooms} xona
          </span>
          <span className="px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 flex items-center gap-1">
            <RiStairsLine size={16} /> {ad.floor}
          </span>
        </div>

        <div className="text-lg font-bold mb-4">
          {ad.priceAmount.toLocaleString()} {ad.priceCurrency}{" "}
          <span className="text-gray-600 dark:text-gray-400 text-sm">
            / {ad.period}
          </span>
        </div>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {ad.description}
        </p>
      </div>
    </div>
  );
};

export default AdDetail;
