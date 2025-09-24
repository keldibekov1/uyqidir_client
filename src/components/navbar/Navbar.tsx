import React from "react"
import { ModeToggle } from "@/components/mode-toggle"
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-blue-100 dark:bg-gray-900 shadow-md">
      <Link
        to="/profile"
        className="flex items-center gap-2 cursor-pointer transition-all duration-300 hover:scale-105"
      >
        <img
          src="https://i.pravatar.cc/40"
          alt="Profile"
          className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-700"
        />
        <span className="font-semibold text-gray-800 dark:text-white">
          admin
        </span>
      </Link>

      <div className="flex items-center gap-2">
        <ModeToggle />
      </div>
    </div>
  )
}

export default React.memo(Navbar)
