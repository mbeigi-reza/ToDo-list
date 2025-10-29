import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../../context/TaskContext";
import Calendar from "./Calendar";
import CategorySelect from "./CategorySelect";
import TaskForm from "./TaskForm";
import { Settings, Save, Calendar as CalendarIcon } from 'lucide-react';

export default function AddTaskPage() {
  const navigate = useNavigate();
  const { addTask } = useTasks();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [category, setCategory] = useState("");
  const [task, setTask] = useState({ title: "", description: "" });
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isDateEnabled, setIsDateEnabled] = useState(true);

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
      date: isDateEnabled ? selectedDate : null,
      category: category,
      time: new Date().toLocaleTimeString('fa-IR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      isDateEnabled: isDateEnabled
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 w-full transition-colors duration-300">
      {/* هدر */}
      <div className="bg-blue-600 dark:bg-gray-800 text-white p-4 rounded-t-lg mb-4 shadow-md w-full transition-colors duration-300">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="text-white bg-blue-700 dark:bg-gray-700 p-2 rounded-lg hover:bg-blue-800 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
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
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-full transition-colors duration-300">
        {/* بخش تاریخ با قابلیت فعال/غیرفعال */}
        <div className="mb-6 w-full">
          <div className="flex items-center justify-between mb-3 w-full">
            <h3 className="text-blue-600 dark:text-blue-400 font-semibold text-lg">تاریخ تسک</h3>
            <button
              onClick={toggleDateEnabled}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isDateEnabled 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400 border border-blue-300 dark:border-gray-600'
              }`}
            >
              <span>{isDateEnabled ? 'فعال' : 'غیرفعال'}</span>
              <div className={`w-4 h-4 rounded border-2 ${
                isDateEnabled ? 'bg-white border-white' : 'bg-transparent border-blue-600 dark:border-blue-400'
              }`}></div>
            </button>
          </div>

          {isDateEnabled ? (
            <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg border border-blue-200 dark:border-gray-600 w-full transition-colors duration-300">
              <Calendar 
                selectedDate={selectedDate} 
                onDateChange={handleDateChange} 
                disabled={!isDateEnabled}
              />
              <div className="mt-2 text-sm text-blue-600 dark:text-blue-400 text-center">
                تاریخ انتخاب شده: {selectedDate.toLocaleDateString('fa-IR')}
              </div>
            </div>
          ) : (
            <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg border border-blue-200 dark:border-gray-600 text-center w-full transition-colors duration-300">
              <CalendarIcon className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
              <p className="text-blue-600 dark:text-blue-400">این تسک برای همه روزها فعال خواهد بود</p>
            </div>
          )}
        </div>

        {/* انتخاب دسته‌بندی */}
        <div className="mb-6 w-full">
          <div 
            onClick={toggleCategory}
            className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg border border-blue-200 dark:border-gray-600 cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-600 transition-colors w-full"
          >
            <div className="flex items-center justify-between w-full">
              <h3 className="text-blue-600 dark:text-blue-400 font-semibold text-lg">
                انتخاب دسته‌بندی
              </h3>
              <div className="flex items-center gap-2">
                <svg 
                  className={`w-5 h-5 text-blue-600 dark:text-blue-400 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                {category && (
                  <span className="text-blue-700 dark:text-blue-300 bg-white dark:bg-gray-600 px-2 py-1 rounded text-sm border border-blue-300 dark:border-gray-500">
                    {category}
                  </span>
                )}
              </div>
            </div>
          </div>

          {isCategoryOpen && (
            <div className="mt-2 w-full">
              <CategorySelect category={category} onCategoryChange={handleCategoryChange} />
            </div>
          )}

          <button
            onClick={handleManageCategories}
            className="w-full mt-3 bg-blue-100 dark:bg-gray-700 hover:bg-blue-200 dark:hover:bg-gray-600 text-blue-600 dark:text-blue-400 font-medium py-3 px-4 rounded-lg transition-colors duration-200 border border-blue-300 dark:border-gray-600 flex items-center justify-center gap-2"
          >
            <Settings className="w-5 h-5" />
            <span>مدیریت دسته‌بندی‌ها</span>
          </button>
        </div>

        {/* فرم عنوان و توضیحات */}
        <div className="mb-6 w-full">
          <TaskForm task={task} onTaskChange={handleTaskChange} />
        </div>

        {/* دکمه ذخیره */}
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium py-3 px-6 rounded-lg w-full transition-colors duration-200 shadow-md flex items-center justify-center gap-2"
        >
          <Save className="w-5 h-5" />
          <span>ذخیره تسک</span>
        </button>
      </div>
    </div>
  );
}