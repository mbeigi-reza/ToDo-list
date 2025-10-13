export default function Calendar({ selectedDate, onDateChange }) {
  return (
    <div>
      <label>تاریخ:</label>
      <input
        type="date"
        value={selectedDate || ""}
        onChange={(e) => onDateChange(e.target.value)}
      />
    </div>
  );
}
