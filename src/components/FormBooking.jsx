import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { id } from "date-fns/locale";
import { calculateConsumption } from "../utils/calculateConsumption";

export default function FormBooking() {
  const [unit, setUnit] = useState("");
  const [room, setRoom] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [date, setDate] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [participants, setParticipants] = useState(0);
  const [consumptions, setConsumptions] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [errors, setErrors] = useState({});

  // Auto hitung konsumsi
  useEffect(() => {
    const { items, total } = calculateConsumption(startTime, endTime, participants);
    setConsumptions(items);
    setTotalCost(total);
  }, [startTime, endTime, participants]);

  const handleSelectRoom = (e) => {
    setRoom(e.target.value);
    if (e.target.value === "Ruang Prambanan") setCapacity(50);
    else if (e.target.value === "Ruang Borobudur") setCapacity(30);
    else setCapacity(0);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!unit) newErrors.unit = "Unit wajib dipilih";
    if (!room) newErrors.room = "Ruang meeting wajib dipilih";
    if (!date) newErrors.date = "Tanggal wajib dipilih";
    if (!startTime) newErrors.startTime = "Waktu mulai wajib diisi";
    if (!endTime) newErrors.endTime = "Waktu selesai wajib diisi";

    // Jam selesai > jam mulai
    const toMinutes = (t) => {
      const [h, m] = t.split(":").map(Number);
      return h * 60 + m;
    };
    if (startTime && endTime && toMinutes(endTime) <= toMinutes(startTime)) {
      newErrors.time = "Jam selesai harus lebih besar dari jam mulai";
    }

    // Peserta tidak boleh > kapasitas
    if (participants > capacity) {
      newErrors.participants = "Jumlah peserta melebihi kapasitas ruangan";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // valid kalau ga ada error
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const bookingData = {
        unit,
        room,
        capacity,
        date: date?.toISOString(),
        startTime,
        endTime,
        participants,
        consumptions,
        totalCost,
    };

    // simpan ke localStorage
    const existing = JSON.parse(localStorage.getItem("bookings")) || [];
    existing.push(bookingData);
    localStorage.setItem("bookings", JSON.stringify(existing));

    alert("Booking berhasil disimpan 🚀");
    window.location.href = "/";
  };


  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 bg-white p-3 rounded-xl border border-gray-100 shadow max-w-2xl mx-auto"
    >
      <h2 className="font-semibold mb-3">Informasi Ruang Meeting</h2>

      {/* Unit */}
      <div className="mb-4 relative">
        <label className="block mb-1 text-sm font-medium">Unit</label>
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="w-full border border-gray-200 rounded-lg p-2 pr-8 text-sm appearance-none"
        >
          <option value="">Pilih Unit</option>
          <option value="UID JAYA">UID JAYA</option>
          <option value="UID KALTIM">UID KALTIM</option>
        </select>
        {errors.unit && <p className="text-red-500 text-xs">{errors.unit}</p>}
        <span className="absolute right-3 top-8 pointer-events-none text-primary">
            <i className="fa-solid fa-chevron-down"></i>
        </span>
      </div>

      {/* Ruang Meeting */}
      <div className="mb-4 relative">
        <label className="block mb-1 text-sm font-medium">Ruang Meeting</label>
        <select
          value={room}
          onChange={handleSelectRoom}
          className="w-full border border-gray-200 rounded-lg p-2 pr-8 text-sm appearance-none"
        >
          <option value="">Pilih Ruang Meeting</option>
          <option value="Ruang Prambanan">Ruang Prambanan</option>
          <option value="Ruang Borobudur">Ruang Borobudur</option>
        </select>
        {errors.room && <p className="text-red-500 text-xs">{errors.room}</p>}
        <span className="absolute right-3 top-8 pointer-events-none text-primary">
            <i className="fa-solid fa-chevron-down"></i>
        </span>
      </div>

      {/* Kapasitas */}
      <div className="mb-6">
        <label className="block mb-1 text-sm font-medium">Kapasitas</label>
        <input
          type="number"
          value={capacity}
          readOnly
          className="w-full rounded-lg p-2 bg-gray-100"
        />
      </div>

      <h2 className="font-semibold mb-3">Informasi Rapat</h2>

      {/* Tanggal */}
      <div className="mb-4 relative">
        <label className="block mb-1 text-sm font-medium">Tanggal</label>
        <DatePicker
          selected={date}
          onChange={(d) => setDate(d)}
          dateFormat="dd MMMM yyyy"
          locale={id}
          placeholderText="Pilih tanggal"
          className="w-full border border-gray-200 rounded-lg p-2 text-sm pl-10"
        />
        {errors.date && <p className="text-red-500 text-xs">{errors.date}</p>}
        <span className="absolute left-3 top-8 pointer-events-none text-primary">
            <i className="fa-regular fa-calendar"></i>
        </span>
      </div>

      {/* Waktu Mulai */}
      <div className="mb-4 relative">
        <label className="block text-sm font-medium mb-1">Waktu Mulai</label>
        <select
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="w-full border border-gray-200 rounded-lg p-2 text-sm appearance-none"
        >
          <option value="">Pilih Jam Mulai</option>
          <option value="09:00">09:00</option>
          <option value="10:00">10:00</option>
          <option value="11:00">11:00</option>
          <option value="12:00">12:00</option>
          <option value="13:00">13:00</option>
          <option value="15:00">15:00</option>
        </select>
        {errors.startTime && <p className="text-red-500 text-xs">{errors.startTime}</p>}
        <span className="absolute right-3 top-8 pointer-events-none text-primary">
            <i className="fa-solid fa-chevron-down"></i>
        </span>
      </div>

      {/* Waktu Selesai */}
      <div className="mb-4 relative">
        <label className="block text-sm font-medium mb-1">Waktu Selesai</label>
        <select
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="w-full border border-gray-200 rounded-lg p-2 text-sm appearance-none"
        >
          <option value="">Pilih Jam Selesai</option>
          <option value="10:00">10:00</option>
          <option value="11:00">11:00</option>
          <option value="12:00">12:00</option>
          <option value="13:00">13:00</option>
          <option value="14:00">14:00</option>
          <option value="16:00">16:00</option>
        </select>
        {errors.endTime && <p className="text-red-500 text-xs">{errors.endTime}</p>}
        <span className="absolute right-3 top-8 pointer-events-none text-primary">
            <i className="fa-solid fa-chevron-down"></i>
        </span>
      </div>
      {errors.time && <p className="text-red-500 text-xs">{errors.time}</p>}

      {/* Jumlah Peserta */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Jumlah Peserta</label>
        <input
          type="number"
          value={participants}
          onChange={(e) => setParticipants(Number(e.target.value))}
          className="w-full border border-gray-200 rounded-lg p-2 text-sm"
        />
        {errors.participants && (
          <p className="text-red-500 text-xs">{errors.participants}</p>
        )}
      </div>

      {/* Jenis Konsumsi */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Jenis Konsumsi</label>
        <div className="text-sm space-y-1">
          {consumptions.length > 0
            ? consumptions.map((item) => <div key={item}>✅ {item}</div>)
            : "Silahkan input informasi rapat dahulu"}
        </div>
      </div>

      {/* Nominal Konsumsi */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Nominal Konsumsi</label>
        <div className="flex rounded-lg border border-gray-300 overflow-hidden">
          <span className="bg-gray-100 px-3 flex items-center text-gray-700 text-sm">
            Rp.
          </span>
          <input
            type="text"
            value={`${totalCost.toLocaleString()}`}
            readOnly
            className="w-full rounded-lg p-2 bg-white"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="px-4 py-2 border rounded-lg text-red-600"
        >
          Batal
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Simpan
        </button>
      </div>
    </form>
  );
}
