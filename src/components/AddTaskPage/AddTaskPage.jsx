// C:\Users\Dell\Desktop\ToDo-list\src\components\AddTaskPage\AddTaskPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../../context/TaskContext";
import Calendar from "./Calendar";
import CategorySelect from "./CategorySelect";
import TaskForm from "./TaskForm";

export default function AddTaskPage() {
  const navigate = useNavigate();
  const { addTask } = useTasks();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [category, setCategory] = useState("");
  const [task, setTask] = useState({ title: "", description: "" });
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isDateEnabled, setIsDateEnabled] = useState(true); // حالت جدید برای فعال/غیرفعال کردن تاریخ

  const handleDateChange = (date) => {
    if (isDateEnabled) {
      setSelectedDate(date);
    }
  };
  
  const handleCategoryChange = (value) => {
    setCategory(value);
    setIsCategoryOpen(false);
  };

  const handleTaskChange = (field, value) => setTask({ ...task, [field]: value });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // اعتبارسنجی
    if (!task.title.trim()) {
      alert("لطفاً عنوان تسک را وارد کنید");
      return;
    }

    if (!category) {
      alert("لطفاً یک دسته‌بندی انتخاب کنید");
      return;
    }

    // ایجاد تسک جدید
    const newTask = {
      title: task.title,
      description: task.description,
      date: isDateEnabled ? selectedDate : null, // اگر تاریخ غیرفعال باشد، null می‌گذاریم
      category: category,
      time: new Date().toLocaleTimeString('fa-IR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      isDateEnabled: isDateEnabled // ذخیره وضعیت تاریخ
    };

    // اضافه کردن به context
    addTask(newTask);

    // ریست فرم و بازگشت به صفحه اصلی
    setTask({ title: "", description: "" });
    setCategory("");
    setSelectedDate(new Date());
    
    alert("تسک با موفقیت ذخیره شد!");
    navigate("/");
  };

  const toggleCategory = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  const handleManageCategories = () => {
    navigate("/categories");
  };

  const toggleDateEnabled = () => {
    setIsDateEnabled(!isDateEnabled);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-4">
      {/* هدر */}
      <div className="bg-[#673AB7] text-white p-4 rounded-t-lg mb-4 shadow-md">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="text-white bg-[#512DA8] p-2 rounded-lg hover:bg-[#7C4DFF] transition-colors"
          >
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
        {/* بخش تاریخ با قابلیت فعال/غیرفعال */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[#673AB7] font-semibold text-lg">تاریخ تسک</h3>
            <button
              onClick={toggleDateEnabled}
              className={`flex items-center space-x-2 space-x-reverse px-4 py-2 rounded-lg transition-colors ${
                isDateEnabled 
                  ? 'bg-[#7C4DFF] text-white' 
                  : 'bg-[#E1D8F1] text-[#673AB7] border border-[#C5B4E3]'
              }`}
            >
              <span>{isDateEnabled ? 'فعال' : 'غیرفعال'}</span>
              <div className={`w-4 h-4 rounded border-2 ${
                isDateEnabled ? 'bg-white border-white' : 'bg-transparent border-[#673AB7]'
              }`}></div>
            </button>
          </div>

          {isDateEnabled ? (
            <div className="bg-[#F8F5FF] p-4 rounded-lg border border-[#E1D8F1]">
              <Calendar 
                selectedDate={selectedDate} 
                onDateChange={handleDateChange} 
                disabled={!isDateEnabled}
              />
              <div className="mt-2 text-sm text-[#673AB7] text-center">
                تاریخ انتخاب شده: {selectedDate.toLocaleDateString('fa-IR')}
              </div>
            </div>
          ) : (
            <div className="bg-[#F8F5FF] p-4 rounded-lg border border-[#E1D8F1] text-center">
              <div className="text-[#673AB7] text-lg mb-2">📅</div>
              <p className="text-[#673AB7]">این تسک برای همه روزها فعال خواهد بود</p>
            </div>
          )}
        </div>

        {/* انتخاب دسته‌بندی */}
        <div className="mb-6">
          <div 
            onClick={toggleCategory}
            className="bg-[#F8F5FF] p-4 rounded-lg border border-[#E1D8F1] cursor-pointer hover:bg-[#F0EBFF] transition-colors"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-[#673AB7] font-semibold text-right text-lg">
                انتخاب دسته‌بندی
              </h3>
              <div className="flex items-center space-x-2 space-x-reverse">
                {category && (
                  <span className="text-[#512DA8] bg-white px-2 py-1 rounded text-sm border border-[#C5B4E3]">
                    {category}
                  </span>
                )}
                <svg 
                  className={`w-5 h-5 text-[#673AB7] transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {isCategoryOpen && (
            <div className="mt-2">
              <CategorySelect category={category} onCategoryChange={handleCategoryChange} />
            </div>
          )}

          <button
            onClick={handleManageCategories}
            className="w-full mt-3 bg-[#E1D8F1] hover:bg-[#C5B4E3] text-[#673AB7] font-medium py-2 px-4 rounded-lg transition-colors duration-200 border border-[#C5B4E3] flex items-center justify-center space-x-2 space-x-reverse"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>مدیریت دسته‌بندی‌ها</span>
          </button>
        </div>

        {/* فرم عنوان و توضیحات */}
        <div className="mb-6">
          <TaskForm task={task} onTaskChange={handleTaskChange} />
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