export function calculateConsumption(startTime, endTime, participants) {
  if (!startTime || !endTime || participants <= 0) return { items: [], total: 0 };

  const prices = {
    "Snack Siang": 20000,
    "Makan Siang": 50000,
    "Snack Sore": 20000,
  };

  const items = [];

  // convert ke menit biar gampang bandingin
  const toMinutes = (time) => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  };

  const start = toMinutes(startTime);
  const end = toMinutes(endTime);

  // Snack Siang (10:00–11:30)
  if (start <= 630 && end >= 600) items.push("Snack Siang"); // 600 = 10:00, 630 = 10:30

  // Makan Siang (12:00–13:00)
  if (start <= 780 && end >= 720) items.push("Makan Siang"); // 720 = 12:00, 780 = 13:00

  // Snack Sore (15:00–16:30)
  if (start <= 990 && end >= 900) items.push("Snack Sore"); // 900 = 15:00, 990 = 16:30

  // Hitung total
  const total = items.reduce((acc, item) => acc + prices[item] * participants, 0);

  return { items, total };
}