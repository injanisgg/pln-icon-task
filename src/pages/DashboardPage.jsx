import { useEffect, useState } from "react";
import { getDashboardSummary } from "../api/bookingApi";
import DashboardCard from "../components/DashboardCard";
import Bolt from '../assets/bolt-circle.png'

export default function DashboardPage() {
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState("Jan-2024");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDashboardSummary();
        // Cari periode yang sesuai
        const filtered = res.find((item) => item.period === selectedPeriod);
        setSummary(filtered ? filtered.data : []); // <-- ambil "data" di dalamnya
      } catch (err) {
        console.error("Error fetching dashboard summary:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedPeriod]);

  if (loading) {
    return <p className="p-4 text-center">Loading...</p>;
  }

  return (
    <div className="p-6 mt-20 lg:ml-16">
      {/* Dropdown Periode */}
      <div className="flex flex-col mb-5 relative">
        <label className="text-gray-500 mb-2">Periode</label>
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="font-semibold border border-[#00A3E9] bg-blue-100 rounded-lg px-3 py-2 w-full md:w-58 appearance-none"
        >
          <option value="Jan-2024">Januari 2024</option>
          <option value="Feb-2024">Februari 2024</option>
        </select>
        <span className="absolute right-3 md:left-50 top-10 pointer-events-none text-[#00A3E9]">
            <i className="fa-solid fa-caret-down fa-lg"></i>
        </span>
      </div>

      {/* Content */}
      <div className="space-y-8">
        {summary.map((unit, index) => (
          <div key={index}>
            {/* Unit Title */}
            <h2 className="text-lg font-bold text-gray-500 mb-4 flex justify-center md:justify-start items-center gap-2">
              <img src={Bolt} alt="bold" className="w-12" /> {unit.officeName}
            </h2>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 place-items-center md:grid-cols-3 lg:grid-cols-4 gap-4">
              {unit.detailSummary.map((room, index) => (
                <DashboardCard
                  key={index}
                  room={room}
                  officeName={unit.officeName}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}