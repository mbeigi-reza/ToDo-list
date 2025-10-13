import { useState } from "react";
import Calendar from "./Calendar";
import CategorySelect from "./CategorySelect";
import TaskForm from "./TaskForm";

export default function AddTaskPage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [category, setCategory] = useState("");
  const [task, setTask] = useState({ title: "", description: "" });

  function handleDateChange(date) {
    setSelectedDate(date);
  }

  function handleCategoryChange(value) {
    setCategory(value);
  }

  function handleTaskChange(field, value) {
    setTask({ ...task, [field]: value });
  }

  function handleSubmit(e) {
    e.preventDefault(); // جلوگیری از رفرش صفحه
    console.log("📦 تسک نهایی:", {
      date: selectedDate,
      category,
      ...task,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md">
      <Calendar selectedDate={selectedDate} onDateChange={handleDateChange} />
      <CategorySelect category={category} onCategoryChange={handleCategoryChange} />
      <TaskForm task={task} onTaskChange={handleTaskChange} />

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
        ذخیره تسک
      </button>
    </form>
  );
}
