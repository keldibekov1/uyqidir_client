import { useEffect } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "./routes/routes";
import Navbar from "./components/navbar/Navbar";
import { retrieveLaunchParams } from "@telegram-apps/sdk";

function App() {
  useEffect(() => {
    const { initDataRaw } = retrieveLaunchParams();

    if (!initDataRaw) {
      console.warn("Telegram initDataRaw topilmadi! ⚠️");
      return;
    }

    fetch("http://localhost:3000/telegram/validate", {
      method: "POST",
      headers: {
        Authorization: `tma ${initDataRaw}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("❌ Telegram validatsiya xato!");
        const data = await res.json();
        console.log("✅ Telegram foydalanuvchi tekshirildi:", data);
      })
      .catch((err) => console.error("❌ Fetch error:", err.message));
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Navbar />
        <AppRoutes />
      </Router>
    </ThemeProvider>
  );
}

export default App;
