import React from "react";
import { useNavigate } from "react-router-dom";

export default function CategorySelect() {
  const navigate = useNavigate();

  const categories = [
    { value: "idea", label: "ایده", icon: "💡", tasks: "12 تسک", color: "bg-[#7C4DFF]" },
    { value: "food", label: "غذا", icon: "🍕", tasks: "9 تسک", color: "bg-[#673AB7]" },
    { value: "work", label: "کار", icon: "💼", tasks: "8 تسک", color: "bg-[#512DA8]" },
    { value: "sport", label: "ورزش", icon: "⚽", tasks: "4 تسک", color: "bg-[#C5B4E3]", textColor: "text-[#673AB7]" },
    { value: "music", label: "موسیقی", icon: "🎵", tasks: "4 تسک", color: "bg-[#E1D8F1]", textColor: "text-[#673AB7]" },
  ];

  const handleCategoryClick = (category) => {
    console.log("دسته‌بندی انتخاب شد:", category);
    // navigate(`/tasks/${category.value}`);
  };

  const handleAddTask = () => {
    navigate("/add");
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] px-3 sm:px-4 py-4 w-full max-w-full overflow-x-hidden">
      {/* هدر */}
      <div className="bg-[#673AB7] text-white p-3 sm:p-4 rounded-t-2xl mb-4 shadow-md w-full max-w-full">
        <div className="flex items-center justify-between w-full max-w-full">
          <button 
            onClick={() => navigate(-1)}
            className="text-white bg-[#512DA8] p-2 rounded-lg hover:bg-[#7C4DFF] transition-colors shrink-0"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg sm:text-xl font-bold truncate">انتخاب دسته‌بندی</h1>
          <div className="w-6"></div>
        </div>
      </div>

      {/* محتوای اصلی */}
      <div className="bg-white rounded-2xl shadow-lg p-3 sm:p-5 w-full max-w-full overflow-hidden">
        {/* لیست دسته‌بندی‌ها */}
        <div className="space-y-3 mb-6">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => handleCategoryClick(cat)}
              className={`w-full p-3 sm:p-4 rounded-xl transition-all duration-200 flex items-center justify-between border-2 border-transparent hover:shadow-md hover:scale-[1.01] ${cat.color} ${cat.textColor || 'text-white'} overflow-hidden`}
            >
              <div className="flex items-center gap-3 sm:gap-4 w-full max-w-[90%] overflow-hidden">
                <span className="text-xl sm:text-2xl shrink-0">{cat.icon}</span>
                <div className="text-right w-full overflow-hidden">
                  <div className="font-semibold text-base sm:text-lg truncate">{cat.label}</div>
                  <div className={`text-xs sm:text-sm ${cat.textColor ? 'text-[#512DA8]' : 'text-white opacity-90'} truncate`}>
                    {cat.tasks}
                  </div>
                </div>
              </div>
              <svg 
                className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 ${cat.textColor ? 'text-[#673AB7]' : 'text-white'}`} 
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
          className="bg-[#7C4DFF] hover:bg-[#673AB7] text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-xl w-full transition-colors duration-200 shadow-md flex items-center justify-center gap-2"
        >
          <span className="text-lg">➕</span>
          <span className="text-sm sm:text-base">افزودن تسک جدید</span>
        </button>

        {/* اطلاعات آماری */}
        <div className="mt-6 p-3 sm:p-4 bg-[#F8F5FF] rounded-xl border border-[#E1D8F1]">
          <h3 className="text-[#673AB7] font-semibold mb-3 text-center text-base sm:text-lg">آمار کلی</h3>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-white p-2 sm:p-3 rounded-lg border border-[#C5B4E3]">
              <div className="text-[#7C4DFF] font-bold text-base sm:text-lg">12</div>
              <div className="text-[#673AB7] text-xs sm:text-sm">کل تسک‌ها</div>
            </div>
            <div className="bg-white p-2 sm:p-3 rounded-lg border border-[#C5B4E3]">
              <div className="text-[#512DA8] font-bold text-base sm:text-lg">8</div>
              <div className="text-[#673AB7] text-xs sm:text-sm">انجام شده</div>
            </div>
            <div className="bg-white p-2 sm:p-3 rounded-lg border border-[#C5B4E3]">
              <div className="text-[#C5B4E3] font-bold text-base sm:text-lg">4</div>
              <div className="text-[#673AB7] text-xs sm:text-sm">در انتظار</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}