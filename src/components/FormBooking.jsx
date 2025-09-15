import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { id } from "date-fns/locale";
import { calculateConsumption } from "../utils/calculateConsumption";
import { getUnits, getRooms, getJenisKonsumsi } from "../api/bookingApi";

export default function FormBooking() {
  // state api
  const [unitMaster, setUnitMaster] = useState([]);
  const [roomMaster, setRoomMaster] = useState([]);
  const [consumptionMaster, setConsumptionMaster] = useState([]);

  // state user
  const [unit, setUnit] = useState("");
  const [room, setRoom] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [date, setDate] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [participants, setParticipants] = useState("");
  const [consumptions, setConsumptions] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [errors, setErrors] = useState({});
  const [showPopUp, setShowPopUp] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // cek apakah semua field sudah diisi
  const isFormValid =
    unit &&
    room &&
    capacity &&
    date &&
    startTime &&
    endTime &&
    participants &&
    consumptions &&
    totalCost;

  const timeData = [
    {value: '08:00', time: '08:00'},
    {value: '09:00', time: '09:00'},
    {value: '10:00', time: '10:00'},
    {value: '11:00', time: '11:00'},
    {value: '12:00', time: '12:00'},
    {value: '13:00', time: '13:00'},
    {value: '14:00', time: '14:00'},
    {value: '15:00', time: '15:00'},
    {value: '16:00', time: '16:00'},
    {value: '17:00', time: '17:00'},
  ];

  // fetch master data
  useEffect(() => {
    const fetchMasterData = async () => {
      try {
        const unitsMasterData = await getUnits();
        const roomsMasterData = await getRooms();
        const konsumMasterData = await getJenisKonsumsi();

        setUnitMaster(unitsMasterData);
        setRoomMaster(roomsMasterData);
        setConsumptionMaster(konsumMasterData);
      } catch (error) {
        console.log("error fetch data");
      }
    };

    fetchMasterData();
  }, []);

  // Auto hitung konsumsi
  useEffect(() => {
    const { items, total } = calculateConsumption(
      startTime,
      endTime,
      participants,
      consumptionMaster
    );
    setConsumptions(items);
    setTotalCost(total);
  }, [startTime, endTime, participants, consumptionMaster]);

  // helper waktu → menit
  const toMinutes = (t) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };

  // validasi realtime waktu & peserta
  useEffect(() => {
    setErrors((prev) => {
      const updated = { ...prev };

      // Validasi jam
      if (startTime && endTime && toMinutes(endTime) <= toMinutes(startTime)) {
        updated.time = "Jam selesai harus lebih besar dari jam mulai";
      } else {
        delete updated.time;
      }

      // Validasi peserta
      if (participants && participants > capacity) {
        updated.participants = "Jumlah peserta melebihi kapasitas ruangan";
      } else {
        delete updated.participants;
      }

      return updated;
    });
  }, [startTime, endTime, participants, capacity]);

  // select unit
  const handleSelectUnit = (e) => {
    setUnit(e.target.value);
    setRoom("");
    setCapacity(0);
  };

  // select room
  const handleSelectRoom = (e) => {
    const selectedRoom = roomMaster.find((r) => r.id === e.target.value);
    setRoom(e.target.value);
    setCapacity(selectedRoom ? selectedRoom.capacity : 0);
  };

  // submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    const newErrors = { ...errors };

    if (!unit) newErrors.unit = "Unit wajib dipilih";
    if (!room) newErrors.room = "Ruang meeting wajib dipilih";
    if (!date) newErrors.date = "Tanggal wajib dipilih";
    if (!startTime) newErrors.startTime = "Waktu mulai wajib diisi";
    if (!endTime) newErrors.endTime = "Waktu selesai wajib diisi";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setShowPopUp(true);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 bg-white p-3 rounded-xl border border-gray-100 shadow w-full lg:mr-3 xl:mr-20 justify-items-center lg:justify-items-normal"
    >
      <h2 className="font-semibold mb-3">Informasi Ruang Meeting</h2>

      <div className="flex flex-col lg:flex-row gap-5">
        {/* Unit */}
        <div className="mb-4 relative">
          <label className="block mb-1 text-sm font-medium">Unit</label>
          <select
            value={unit}
            onChange={handleSelectUnit}
            className={`w-[20.4rem] lg:w-72 border rounded-lg p-2 pr-8 text-sm appearance-none ${
              submitted && errors.unit ? "border-red-500" : "border-gray-200"
            }`}
          >
            <option value="">Pilih Unit</option>
            {unitMaster.map((u) => (
              <option key={u.id} value={u.id}>
                {u.officeName}
              </option>
            ))}
          </select>
          {submitted && errors.unit && (
            <p className="text-red-500 text-xs">{errors.unit}</p>
          )}
          <span className="absolute right-3 sm:right-4 top-8 pointer-events-none text-primary">
            <i className="fa-solid fa-chevron-down"></i>
          </span>
        </div>

        {/* Ruang Meeting */}
        <div className="mb-4 relative">
          <label className="block mb-1 text-sm font-medium">Ruang Meeting</label>
          <select
            value={room}
            onChange={handleSelectRoom}
            className={`w-[20.4rem] lg:w-72 border rounded-lg p-2 pr-8 text-sm appearance-none ${
              submitted && errors.room ? "border-red-500" : "border-gray-200"
            }`}
            disabled={!unit}
          >
            <option value="">Pilih Ruang Meeting</option>
            {roomMaster
              .filter((r) => r.officeId === unit)
              .map((r) => (
                <option key={r.id} value={r.id}>
                  {r.roomName}
                </option>
              ))}
          </select>
          {submitted && errors.room && (
            <p className="text-red-500 text-xs">{errors.room}</p>
          )}
          <span className="absolute right-3 sm:right-4 top-8 pointer-events-none text-primary">
            <i className="fa-solid fa-chevron-down"></i>
          </span>
        </div>
      </div>

      {/* Kapasitas */}
      <div className="pb-6 border-b border-gray-200">
        <label className="block mb-1 text-sm font-medium">Kapasitas</label>
        <input
          type="number"
          value={capacity}
          readOnly
          className="w-[20.4rem] lg:w-72 rounded-lg p-2 bg-gray-100"
        />
      </div>

      <h2 className="font-semibold my-3">Informasi Rapat</h2>

      <div className="flex flex-col lg:flex-row gap-5">
        {/* Tanggal */}
        <div className="mb-4 relative">
          <label className="block mb-1 text-sm font-medium">Tanggal</label>
          <DatePicker
            selected={date}
            onChange={(d) => setDate(d)}
            dateFormat="dd MMMM yyyy"
            locale={id}
            placeholderText="Pilih tanggal"
            className={`w-[20.4rem] lg:w-72 border rounded-lg p-2 text-sm pl-10 ${
              submitted && errors.date ? "border-red-500" : "border-gray-200"
            }`}
          />
          {submitted && errors.date && (
            <p className="text-red-500 text-xs">{errors.date}</p>
          )}
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
            className={`w-[20.4rem] lg:w-72 border rounded-lg p-2 text-sm appearance-none ${
              errors.startTime ? "border-red-500" : "border-gray-200"
            }`}
          >
            <option value="">Pilih Waktu Mulai</option>
            {timeData.slice(0, -1).map((t) => (
              <option key={t.value} value={t.value}>{t.time}</option>
            ))}
          </select>
          {errors.startTime && (<p className="text-red-500 text-xs">{errors.startTime}</p>)}
          <span className="absolute right-3 sm:right-4 top-8 pointer-events-none text-primary">
            <i className="fa-solid fa-chevron-down"></i>
          </span>
        </div>

        {/* Waktu Selesai */}
        <div className="mb-4 relative">
          <label className="block text-sm font-medium mb-1">Waktu Selesai</label>
          <select
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className={`w-[20.4rem] lg:w-72 border rounded-lg p-2 text-sm appearance-none ${
              errors.endTime ? "border-red-500" : "border-gray-200"
            }`}
          >
            <option value="">Pilih Waktu Selesai</option>
            {timeData.slice(1).map((t) => (
              <option key={t.value} value={t.value}>{t.time}</option>
            ))}
          </select>
          {errors.endTime && (<p className="text-red-500 text-xs">{errors.endTime}</p>)}
          {errors.time && <p className="text-red-500 text-xs">{errors.time}</p>}
          <span className="absolute right-3 sm:right-4 top-8 pointer-events-none text-primary">
            <i className="fa-solid fa-chevron-down"></i>
          </span>
        </div>
      </div>

      {/* Jumlah Peserta */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Jumlah Peserta</label>
        <input
          type="number"
          value={participants}
          onChange={(e) => setParticipants(e.target.value)}
          placeholder="Masukan Jumlah Peserta"
          className={`w-[20.4rem] lg:w-72 border rounded-lg p-2 text-sm ${
            errors.participants ? "border-red-500" : "border-gray-200"
          }`}
        />
        {errors.participants && (
          <p className="text-red-500 text-xs">{errors.participants}</p>
        )}
      </div>

      {/* Jenis Konsumsi */}
      <div className="mb-4 w-[20.4rem] lg:w-72">
        <label className="block text-sm font-medium mb-1">Jenis Konsumsi</label>
        <div className="text-sm space-y-1">
          {consumptions.length > 0
            ? consumptions.map((item) => <div key={item}>✅ {item}</div>)
            : "Silahkan input informasi rapat dahulu"}
        </div>
      </div>

      {/* Nominal Konsumsi */}
      <div className="pb-6 border-b border-gray-200">
        <label className="block text-sm font-medium mb-1">Nominal Konsumsi</label>
        <div className="flex rounded-lg border border-gray-300 overflow-hidden w-[20.4rem] lg:w-72">
          <span className="bg-gray-100 px-3 flex items-center text-gray-700 text-sm">
            Rp.
          </span>
          <input
            type="text"
            value={`${totalCost.toLocaleString()}`}
            readOnly
            className="rounded-lg p-2 bg-white"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 pr-3 mt-3">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="px-4 py-2 hover:border hover:rounded-lg hover:cursor-pointer text-red-600 font-semibold"
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={!isFormValid}
          className={`px-4 py-2 font-semibold rounded-lg hover:cursor-pointer
            ${
              isFormValid
                ? "bg-primary hover:bg-first-blue text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          Simpan
        </button>
        {showPopUp && (
          <div className="fixed inset-0 flex items-center justify-center bg-transparent">
            <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-50 text-center">
              <h2 className="text-xl font-semibold mb-4">
                Booking berhasil disimpan
              </h2>
              <button
                onClick={() => {
                  setShowPopUp(false);
                  window.location.reload();
                }}
                className="px-4 py-2 bg-primary text-white rounded hover:cursor-pointer"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}