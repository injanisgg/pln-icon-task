export function calculateConsumption(startTime, endTime, participants, consumptionsMaster) {
  if (!startTime || !endTime || participants <= 0 || consumptionsMaster.length === 0) {
    return { items: [], total: 0 };
  }

  const toMinutes = (t) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };

  const start = toMinutes(startTime);
  const end = toMinutes(endTime);

  let items = [];
  let total = 0;

  // Snack Siang (09:00 - 11:00)
  if (start <= toMinutes("09:00") && end >= toMinutes("11:00")) {
    const snack = consumptionsMaster.find((c) => c.name === "Snack Siang");
    if (snack) {
      items.push(snack.name);
      total += participants * snack.maxPrice;
    }
  }

  // Makan Siang (11:00 - 13:00)
  if (start < toMinutes("13:00") && end >= toMinutes("12:00")) {
    const lunch = consumptionsMaster.find((c) => c.name === "Makan Siang");
    if (lunch) {
      items.push(lunch.name);
      total += participants * lunch.maxPrice;
    }
  }

  // Snack Sore (15:00 - 16:00)
  if (start <= toMinutes("15:00") && end >= toMinutes("16:00")) {
    const snackSore = consumptionsMaster.find((c) => c.name === "Snack Sore");
    if (snackSore) {
      items.push(snackSore.name);
      total += participants * snackSore.maxPrice;
    }
  }

  return { items, total };
}