import React, { useEffect, useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { Link } from "react-router-dom";

type TelegramUser = {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
};

const Navbar = () => {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Telegram WebApp user
    // @ts-ignore
    const tg = window.Telegram?.WebApp;
    if (tg?.initDataUnsafe?.user) {
      setUser(tg.initDataUnsafe.user);
    }

    const handleScroll = () => {
      if (window.scrollY > 10) setScrolled(true);
      else setScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50 px-4 py-3 backdrop-blur-sm transition-all duration-300
        border-b border-gray-200 dark:border-gray-800
        ${
          scrolled
            ? "bg-white/90 dark:bg-gray-900/80 shadow-md"
            : "bg-white/95 dark:bg-gray-900/70"
        }
      `}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          to="/profile"
          className="flex items-center gap-2 cursor-pointer transition-transform duration-300 hover:scale-105"
        >
          <img
            src={user?.photo_url || "https://i.pravatar.cc/40"}
            alt={user?.first_name || "User"}
            className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-700"
          />
          <div className="flex flex-col">
            <span className="font-semibold text-gray-800 dark:text-white truncate max-w-[120px]">
              {user?.first_name || "Telegram User"}
            </span>
            {/* photo_url ni ko'rsatish */}
            {user?.photo_url && (
              <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[200px]">
                {user.photo_url}
              </span>
            )}
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default React.memo(Navbar);
