import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Profile = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // @ts-ignore
    const tg = window.Telegram?.WebApp

    if (tg?.BackButton) {
      tg.BackButton.show()
      tg.BackButton.onClick(() => {
        navigate(-1)
      })
    }

    return () => {
      if (tg?.BackButton) {
        tg.BackButton.hide()
        tg.BackButton.offClick(() => navigate(-1))
      }
    }
  }, [navigate])

  return (
    <div className="pt-20 p-6"> 
      <h1 className="text-2xl font-bold">Profil</h1>
      <p>Bu yerda foydalanuvchi ma’lumotlari chiqadi...</p>
    </div>
  )
}

export default React.memo(Profile)
