import { useEffect, useState } from "react";
import { getDashboardSummary } from "../api/bookingApi";
import DashboardCard from "../components/DashboardCard";

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
    return <p className="p-4">Loading...</p>;
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <span>⚙️</span> DASHBOARD
        </h1>

        {/* Dropdown Periode */}
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="border rounded px-3 py-1"
        >
          <option value="Jan-2024">Januari 2024</option>
          <option value="Feb-2024">Februari 2024</option>
        </select>
      </div>

      {/* Content */}
      <div className="space-y-8">
        {summary.map((unit, idx) => (
          <div key={idx}>
            {/* Unit Title */}
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>🏢</span> {unit.officeName}
            </h2>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {unit.detailSummary.map((room, idxRoom) => (
                <DashboardCard
                  key={idxRoom}
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