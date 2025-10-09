import AdDetail from "@/pages/AdDetail"
import CreateAd from "@/pages/CreateAd"
import Home from "@/pages/Home"
import MyAds from "@/pages/MyAds"
import Profile from "@/pages/Profile"
import { Routes, Route } from "react-router-dom"

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/my-ads" element={<MyAds />} />
      <Route path="/create-ad" element={<CreateAd />} />
      <Route path="/ads/:id" element={<AdDetail />} />
    </Routes>
  )
}
