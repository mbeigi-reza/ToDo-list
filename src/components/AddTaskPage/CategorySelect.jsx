// C:\Users\Dell\Desktop\ToDo-list\src\components\AddTaskPage\CategorySelect.jsx
import React, { useState, useEffect } from "react";

export default function CategorySelect({ category, onCategoryChange }) {
  const [categories, setCategories] = useState([]);

  // دسته‌بندی‌های پیش‌فرض
  const defaultCategories = [
    { id: 1, value: "work", label: "کار", icon: "💼", color: "#512DA8", taskCount: 0, isDefault: true },
    { id: 2, value: "personal", label: "شخصی", icon: "❤️", color: "#FF6B6B", taskCount: 0, isDefault: true },
    { id: 3, value: "shopping", label: "خرید", icon: "🛒", color: "#4ECDC4", taskCount: 0, isDefault: true },
    { id: 4, value: "health", label: "سلامتی", icon: "🏥", color: "#96CEB4", taskCount: 0, isDefault: true },
  ];

  // بارگذاری دسته‌بندی‌ها از localStorage یا استفاده از پیش‌فرض‌ها
  useEffect(() => {
    const savedCategories = localStorage.getItem('taskCategories');
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    } else {
      // اگر هیچ دسته‌بندی ذخیره‌شده‌ای نیست، از پیش‌فرض‌ها استفاده کن
      setCategories(defaultCategories);
      localStorage.setItem('taskCategories', JSON.stringify(defaultCategories));
    }
  }, []);

  if (categories.length === 0) {
    return (
      <div className="bg-[#F8F5FF] p-4 rounded-lg border border-[#E1D8F1] mb-6">
        <h3 className="text-[#673AB7] font-semibold mb-4 text-right text-lg">انتخاب دسته‌بندی</h3>
        <div className="text-center py-8">
          <p className="text-[#673AB7] mb-4">در حال بارگذاری دسته‌بندی‌ها...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F5FF] p-4 rounded-lg border border-[#E1D8F1] mb-6">
      <h3 className="text-[#673AB7] font-semibold mb-4 text-right text-lg">انتخاب دسته‌بندی</h3>
      
      <div className="space-y-3">
        {categories.map((cat) => (
          <button
            key={cat.value}
            type="button"
            onClick={() => onCategoryChange(cat.value)}
            className={`w-full p-4 rounded-lg transition-all duration-200 flex items-center justify-between border-2 ${
              category === cat.value 
                ? 'ring-4 ring-[#7C4DFF] ring-opacity-30 transform scale-[1.02] shadow-lg' 
                : 'border-transparent hover:shadow-md hover:scale-[1.01]'
            }`}
            style={{ 
              backgroundColor: cat.color,
              color: ['#E1D8F1', '#C5B4E3', '#FFEAA7', '#96CEB4', '#4ECDC4', '#85C1E9'].includes(cat.color) ? '#673AB7' : 'white'
            }}
          >
            <div className="flex items-center space-x-3 space-x-reverse">
              <span className="text-2xl">{cat.icon}</span>
              <span className="font-medium text-right text-lg">{cat.label}</span>
            </div>
          </button>
        ))}
      </div>

      {!category && (
        <div className="mt-4 p-3 bg-white border border-[#C5B4E3] rounded-lg text-center">
          <span className="text-[#673AB7] text-sm">لطفاً یک دسته‌بندی انتخاب کنید</span>
        </div>
      )}

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