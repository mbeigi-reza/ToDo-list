// C:\Users\Dell\Desktop\ToDo-list\src\components\AddTaskPage\AddTaskPage.jsx
import React, { useState } from "react";
import Calendar from "./Calendar";
import CategorySelect from "./CategorySelect";
import TaskForm from "./TaskForm";

export default function AddTaskPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [category, setCategory] = useState("");
  const [task, setTask] = useState({ title: "", description: "" });

  const handleDateChange = (date) => setSelectedDate(date);
  const handleCategoryChange = (value) => setCategory(value);
  const handleTaskChange = (field, value) => setTask({ ...task, [field]: value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📦 تسک نهایی:", {
      date: selectedDate,
      category,
      ...task,
    });

    // ریست فرم بعد از ثبت
    setTask({ title: "", description: "" });
    setCategory("");
    setSelectedDate(new Date());
    alert("تسک با موفقیت ذخیره شد!");
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-4">
      {/* هدر */}
      <div className="bg-[#673AB7] text-white p-4 rounded-t-lg mb-4 shadow-md">
        <div className="flex items-center justify-between">
          <button className="text-white bg-[#512DA8] p-2 rounded-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold">افزودن تسک جدید</h1>
          <div className="w-6"></div>
        </div>
      </div>

      {/* محتوای اصلی */}
      <div className="bg-white rounded-lg shadow-lg p-4">
        {/* تقویم */}
        <div className="mb-6">
          <Calendar selectedDate={selectedDate} onDateChange={handleDateChange} />
        </div>

        {/* فرم عنوان و توضیحات */}
        <div className="mb-6">
          <TaskForm task={task} onTaskChange={handleTaskChange} />
        </div>

        {/* انتخاب دسته‌بندی */}
        <div className="mb-6">
          <CategorySelect category={category} onCategoryChange={handleCategoryChange} />
        </div>

        {/* دکمه ذخیره */}
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-[#7C4DFF] hover:bg-[#673AB7] text-white font-medium py-3 px-6 rounded-lg w-full transition-colors duration-200 shadow-md"
        >
          ذخیره تسک
        </button>
      </div>
    </div>
  );
}