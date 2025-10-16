// C:\Users\Dell\Desktop\ToDo-list\src\components\CategorySelect.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function CategorySelect() {
  const navigate = useNavigate();

  const categories = [
    { 
      value: "idea", 
      label: "ایده", 
      icon: "💡", 
      count: "12 Tasks", 
      color: "bg-[#7C4DFF]",
      tasks: "I2 Tasks"
    },
    { 
      value: "food", 
      label: "غذا", 
      icon: "🍕", 
      count: "9 Tasks", 
      color: "bg-[#673AB7]",
      tasks: "9 Trades"
    },
    { 
      value: "work", 
      label: "کار", 
      icon: "💼", 
      count: "8 Tasks", 
      color: "bg-[#512DA8]",
      tasks: "M Tasks"
    },
    { 
      value: "sport", 
      label: "ورزش", 
      icon: "⚽", 
      count: "4 Tasks", 
      color: "bg-[#C5B4E3]",
      tasks: "4 Trades",
      textColor: "text-[#673AB7]"
    },
    { 
      value: "music", 
      label: "موسیقی", 
      icon: "🎵", 
      count: "4 Tasks", 
      color: "bg-[#E1D8F1]",
      tasks: "4 Trades",
      textColor: "text-[#673AB7]"
    },
  ];

  const handleCategoryClick = (category) => {
    console.log("دسته‌بندی انتخاب شد:", category);
    // می‌توانید به صفحه مربوطه navigate کنید
    // navigate(`/tasks/${category.value}`);
  };

  const handleAddTask = () => {
    navigate("/add");
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
          <h1 className="text-xl font-bold">انتخاب دسته‌بندی</h1>
          <div className="w-6"></div>
        </div>
      </div>

      {/* محتوای اصلی */}
      <div className="bg-white rounded-lg shadow-lg p-4">
        {/* لیست دسته‌بندی‌ها */}
        <div className="space-y-3 mb-6">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => handleCategoryClick(cat)}
              className={`w-full p-4 rounded-lg transition-all duration-200 flex items-center justify-between border-2 border-transparent hover:shadow-md hover:scale-[1.01] ${
                cat.color
              } ${cat.textColor || 'text-white'}`}
            >
              <div className="flex items-center space-x-3 space-x-reverse">
                <span className="text-2xl">{cat.icon}</span>
                <div className="text-right">
                  <div className="font-semibold text-lg">{cat.label}</div>
                  <div className={`text-sm ${cat.textColor ? 'text-[#512DA8]' : 'text-white opacity-90'}`}>
                    {cat.tasks}
                  </div>
                </div>
              </div>
              <svg 
                className={`w-5 h-5 ${cat.textColor ? 'text-[#673AB7]' : 'text-white'}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>

        {/* دکمه افزودن تسک جدید */}
        <button
          onClick={handleAddTask}
          className="bg-[#7C4DFF] hover:bg-[#673AB7] text-white font-semibold py-4 px-6 rounded-lg w-full transition-colors duration-200 shadow-md flex items-center justify-center space-x-2 space-x-reverse"
        >
          <span>➕</span>
          <span>افزودن تسک جدید</span>
        </button>

        {/* اطلاعات آماری */}
        <div className="mt-6 p-4 bg-[#F8F5FF] rounded-lg border border-[#E1D8F1]">
          <h3 className="text-[#673AB7] font-semibold mb-3 text-center">آمار کلی</h3>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-white p-2 rounded border border-[#C5B4E3]">
              <div className="text-[#7C4DFF] font-bold">12</div>
              <div className="text-[#673AB7] text-xs">کل تسک‌ها</div>
            </div>
            <div className="bg-white p-2 rounded border border-[#C5B4E3]">
              <div className="text-[#512DA8] font-bold">8</div>
              <div className="text-[#673AB7] text-xs">انجام شده</div>
            </div>
            <div className="bg-white p-2 rounded border border-[#C5B4E3]">
              <div className="text-[#C5B4E3] font-bold">4</div>
              <div className="text-[#673AB7] text-xs">در انتظار</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}