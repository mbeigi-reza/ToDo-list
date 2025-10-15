import React, { useState } from "react";
import JalaliCalendar from "./Calendar";
import CategorySelect from "./CategorySelect";
import TaskForm from "./TaskForm";


export default function AddTaskPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [category, setCategory] = useState("");
  const [task, setTask] = useState({ title: "", description: "" });

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  const handleTaskChange = (field, value) => {
    setTask({ ...task, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📦 تسک نهایی:", {
      date: selectedDate,
      category,
      ...task,
    });

    setTask({ title: "", description: "" });
    setCategory("");
    setSelectedDate(new Date());
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md">
      <JalaliCalendar selectedDate={selectedDate} onDateChange={handleDateChange} />
      <CategorySelect category={category} onCategoryChange={handleCategoryChange} />
      <TaskForm task={task} onTaskChange={handleTaskChange} />

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        ذخیره تسک
      </button>
    </form>
  );
}
