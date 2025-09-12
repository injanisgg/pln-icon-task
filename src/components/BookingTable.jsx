export default function BookingTable({ bookings }) {
  return (
    <div className="overflow-x-auto mt-6">
      <table className="w-full border border-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Unit</th>
            <th className="p-2 border">Ruang</th>
            <th className="p-2 border">Tanggal</th>
            <th className="p-2 border">Waktu</th>
            <th className="p-2 border">Peserta</th>
            <th className="p-2 border">Konsumsi</th>
            <th className="p-2 border">Biaya</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((b, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="p-2 border">{b.unit}</td>
                <td className="p-2 border">{b.room}</td>
                <td className="p-2 border">
                  {new Date(b.date).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </td>
                <td className="p-2 border">
                  {b.startTime} - {b.endTime}
                </td>
                <td className="p-2 border text-center">{b.participants}</td>
                <td className="p-2 border">{b.consumptions.join(", ")}</td>
                <td className="p-2 border text-right">
                  Rp {b.totalCost.toLocaleString("id-ID")}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="p-3 text-center text-gray-500" colSpan="7">
                Belum ada booking
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}