import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0088FE", "#E5E7EB"]; // biru + abu2 background

export default function DashboardCard({ room, officeName }) {
  // Hitung persentase pemakaian ruang (averageOccupancyPerMonth / capacity)
  const occupancyPercent = Math.round(
    (Number(room.averageOccupancyPerMonth) / Number(room.capacity)) * 100
  );

  // Data untuk donut chart
  const chartData = [
    { name: "Used", value: occupancyPercent },
    { name: "Remaining", value: 100 - occupancyPercent },
  ];

  // Hitung total konsumsi
  const totalPrice = room.totalConsumption.reduce(
    (sum, item) => sum + Number(item.totalPrice),
    0
  );

  return (
    <div className="p-4 border rounded shadow-sm bg-white w-64">
      <h3 className="text-lg font-bold">{room.roomName}</h3>
      <p className="text-sm text-gray-600 mb-2">Office: {officeName}</p>

      {/* Donut chart persentase */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Persentase Pemakaian</p>
          <p className="text-xl font-bold">{occupancyPercent}%</p>
        </div>
        <div className="w-20 h-20">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                innerRadius={25}
                outerRadius={35}
                startAngle={90}
                endAngle={-270}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                    cornerRadius={10}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Nominal konsumsi */}
      <p className="text-sm mt-2">Nominal Konsumsi</p>
      <p className="text-base font-bold text-blue-600">
        Rp {totalPrice.toLocaleString("id-ID")}
      </p>

      {/* Breakdown konsumsi */}
      <div className="mt-3 space-y-2">
        {room.totalConsumption.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between text-sm">
              <span>{item.name}</span>
              <span>{item.totalPackage}</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded">
              <div
                className="bg-blue-500 h-2 rounded"
                style={{
                  width: `${
                    (Number(item.totalPackage) /
                      Math.max(...room.totalConsumption.map((c) => Number(c.totalPackage)))) *
                    100
                  }%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}