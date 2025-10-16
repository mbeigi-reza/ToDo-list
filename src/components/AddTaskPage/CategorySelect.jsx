// C:\Users\Dell\Desktop\ToDo-list\src\components\AddTaskPage\CategorySelect.jsx
import React from "react";

export default function CategorySelect({ category, onCategoryChange }) {
  const categories = [
    { 
      value: "idea", 
      label: "ایده", 
      icon: "💡", 
      count: "12 Tasks", 
      color: "bg-[#7C4DFF]",
      borderColor: "border-[#7C4DFF]"
    },
    { 
      value: "food", 
      label: "غذا", 
      icon: "🍕", 
      count: "9 Tasks", 
      color: "bg-[#673AB7]",
      borderColor: "border-[#673AB7]"
    },
    { 
      value: "work", 
      label: "کار", 
      icon: "💼", 
      count: "8 Tasks", 
      color: "bg-[#512DA8]",
      borderColor: "border-[#512DA8]"
    },
    { 
      value: "sport", 
      label: "ورزش", 
      icon: "⚽", 
      count: "4 Tasks", 
      color: "bg-[#C5B4E3]",
      borderColor: "border-[#C5B4E3]",
      textColor: "text-[#673AB7]"
    },
    { 
      value: "music", 
      label: "موسیقی", 
      icon: "🎵", 
      count: "4 Tasks", 
      color: "bg-[#E1D8F1]",
      borderColor: "border-[#E1D8F1]",
      textColor: "text-[#673AB7]"
    },
  ];

  return (
    <div className="bg-[#F8F5FF] p-4 rounded-lg border border-[#E1D8F1] mb-6">
      <h3 className="text-[#673AB7] font-semibold mb-4 text-right text-lg">انتخاب دسته‌بندی</h3>
      
      <div className="space-y-3">
        {categories.map((cat) => (
          <button
            key={cat.value}
            type="button"
            onClick={() => onCategoryChange(cat.value)}
            className={`w-full p-3 rounded-lg transition-all duration-200 flex items-center justify-between border-2 ${
              category === cat.value 
                ? 'ring-4 ring-[#7C4DFF] ring-opacity-30 transform scale-[1.02] shadow-lg' 
                : 'border-transparent hover:shadow-md hover:scale-[1.01]'
            } ${cat.color} ${cat.textColor || 'text-white'}`}
          >
            <div className="flex items-center space-x-3 space-x-reverse">
              <span className="text-xl">{cat.icon}</span>
              <span className="font-medium text-right">{cat.label}</span>
            </div>
            <span className={`text-sm font-medium ${cat.textColor ? 'text-[#673AB7]' : 'text-white opacity-90'}`}>
              {cat.count}
            </span>
          </button>
        ))}
      </div>

      {/* حالت انتخاب نشده */}
      {!category && (
        <div className="mt-4 p-3 bg-white border border-[#C5B4E3] rounded-lg text-center">
          <span className="text-[#673AB7] text-sm">لطفاً یک دسته‌بندی انتخاب کنید</span>
        </div>
      )}

      {/* نمایش دسته انتخاب شده */}
      {category && (
        <div className="mt-4 p-3 bg-[#E1D8F1] border border-[#7C4DFF] rounded-lg text-center">
          <span className="text-[#673AB7] font-medium">
            دسته‌بندی انتخاب شده: {categories.find(cat => cat.value === category)?.label}
          </span>
        </div>
      )}
    </div>
  );
}