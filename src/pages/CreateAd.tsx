import React, { useState } from "react";

const CreateAd = () => {
  const [form, setForm] = useState({
    title: "",
    rooms: "",
    floor: "",
    priceAmount: "",
    priceCurrency: "so'm",
    region: "",
    image: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("E'lon ma'lumotlari:", form);


  };

  return (
    <div className="pt-24 px-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        E'lon joylashtirish
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Sarlavha (masalan: 2 xonali uy)"
          value={form.title}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border dark:bg-gray-900"
          required
        />

        <input
          type="number"
          name="rooms"
          placeholder="Xonalar soni"
          value={form.rooms}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border dark:bg-gray-900"
          required
        />

        <input
          type="text"
          name="floor"
          placeholder="Qavat (masalan: 3/5)"
          value={form.floor}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border dark:bg-gray-900"
          required
        />

        <input
          type="number"
          name="priceAmount"
          placeholder="Narx"
          value={form.priceAmount}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border dark:bg-gray-900"
          required
        />

        <select
          name="region"
          value={form.region}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border dark:bg-gray-900"
          required
        >
          <option value="">Viloyat tanlang</option>
          <option value="Toshkent">Toshkent</option>
          <option value="Samarqand">Samarqand</option>
          <option value="Buxoro">Buxoro</option>
          <option value="Farg'ona">Farg'ona</option>
        </select>

        <input
          type="url"
          name="image"
          placeholder="Rasm URL"
          value={form.image}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border dark:bg-gray-900"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Yuborish
        </button>
      </form>
    </div>
  );
};

export default CreateAd;
