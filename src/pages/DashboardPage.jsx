import { useEffect, useState } from "react";
import BookingTable from "../components/BookingTable";

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(stored);
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">📊 Dashboard Booking</h1>
      <BookingTable bookings={bookings} />
    </div>
  );
}