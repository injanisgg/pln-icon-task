import { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";

const COLORS = ["#007bff", "#e0e0e0"]; // biru + abu2

export default function DashboardPage() {
  const [bookings, setBookings] = useState([]);
  const [period, setPeriod] = useState("2024-01");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(stored);
  }, []);

  // group data by unit & room
  const grouped = {};
  bookings.forEach((b) => {
    if (!grouped[b.unit]) grouped[b.unit] = {};
    if (!grouped[b.unit][b.room]) {
      grouped[b.unit][b.room] = {
        totalCost: 0,
        consumptions: { "Snack Siang": 0, "Makan Siang": 0, "Snack Sore": 0 },
        bookings: 0,
      };
    }
    grouped[b.unit][b.room].totalCost += b.totalCost;
    b.consumptions.forEach((c) => {
      grouped[b.unit][b.room].consumptions[c] += b.participants;
    });
    grouped[b.unit][b.room].bookings += 1;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📊 Dashboard</h1>

      {/* filter periode */}
      <div className="mb-6">
        <label className="mr-2">Periode:</label>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="border rounded p-2"
        >
          <option value="2024-01">Januari 2024</option>
          <option value="2024-02">Februari 2024</option>
        </select>
      </div>

      {/* grid per unit */}
      {Object.entries(grouped).map(([unit, rooms]) => (
        <div key={unit} className="mb-10">
          <h2 className="text-xl font-semibold mb-4">{unit}</h2>
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(rooms).map(([room, data], i) => {
              const percent = Math.min(
                100,
                (data.bookings / 10) * 100 // misal target 10 booking
              );

              return (
                <div
                  key={i}
                  className="border rounded-lg shadow p-4 bg-white"
                >
                  <h3 className="font-bold mb-2">{room}</h3>
                  <div className="flex items-center mb-4">
                    <PieChart width={80} height={80}>
                      <Pie
                        data={[
                          { value: percent },
                          { value: 100 - percent },
                        ]}
                        innerRadius={25}
                        outerRadius={35}
                        dataKey="value"
                      >
                        {COLORS.map((c, idx) => (
                          <Cell key={idx} fill={c} />
                        ))}
                      </Pie>
                    </PieChart>
                    <span className="text-lg font-bold ml-2">
                      {percent.toFixed(2)}%
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">
                    Nominal Konsumsi
                  </p>
                  <p className="text-xl font-bold text-blue-600 mb-3">
                    Rp {data.totalCost.toLocaleString("id-ID")}
                  </p>
                  {Object.entries(data.consumptions).map(([type, val]) => (
                    <div key={type} className="flex justify-between text-sm">
                      <span>{type}</span>
                      <span>{val}</span>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}