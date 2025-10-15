import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddTaskPage from "./AddTaskPage/AddTaskPage";

export default function TodoApp() {
  const navigate = useNavigate(); // 🔹 اضافه شد

  // لیست تسک‌ها
  const [tasks, setTasks] = useState([]);
  // فیلتر انتخاب شده
  const [filter, setFilter] = useState("All");

  // تابع افزودن تسک جدید
  const addTask = (text) => {
    if (!text.trim()) return;
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  // تغییر وضعیت تسک (تکمیل/درحال انجام)
  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // حذف تسک
  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // اعمال فیلتر
  const filteredTasks = tasks.filter((task) => {
    if (filter === "Active") return !task.completed;
    if (filter === "Completed") return task.completed;
    return true;
  });

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">صفحه اصلی</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => navigate("/add")}
      >
        افزودن تسک
      </button>
    </div>
  );
}
