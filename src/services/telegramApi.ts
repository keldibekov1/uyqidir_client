// src/services/telegramApi.ts
import axios from "axios"
import { retrieveLaunchParams } from "@telegram-apps/sdk"

const { initDataRaw } = retrieveLaunchParams()

export const tgApi = axios.create({
  baseURL: "http://localhost:3000", // backend adresini yoz
  headers: {
    Authorization: `tma ${initDataRaw}`, // har doim yuboradi
  },
})
