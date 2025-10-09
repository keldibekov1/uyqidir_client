import { useEffect, useState } from "react"
import axios from "axios"

export function useTelegramAuth() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

useEffect(() => {
  const tg = (window as any).Telegram?.WebApp;
  const initData = tg?.initData || "";

  if (!initData) {
    console.warn("Telegram initData yo‘q");
    setLoading(false);
    return;
  }

  axios
    .get("http://localhost:3000/user/me", {
      headers: { "x-telegram-init-data": initData },
    })
    .then((res) => {
      setUser(res.data)
      // faqat user yoki token saqlaysan
      sessionStorage.setItem("tgUser", JSON.stringify(res.data))
    })
    .catch((err) => {
      console.error("Auth error:", err)
    })
    .finally(() => setLoading(false))
}, []);


  return { user, loading }
}
