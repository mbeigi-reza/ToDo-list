import React, { useState, useEffect } from "react";

export default function CategorySelect({ category, onCategoryChange }) {
  const [categories, setCategories] = useState([]);

  // دسته‌بندی‌های پیش‌فرض
  const defaultCategories = [
    { id: 1, value: "work", label: "کار", icon: "💼", color: "#3B82F6", taskCount: 0, isDefault: true },
    { id: 2, value: "personal", label: "شخصی", icon: "❤️", color: "#EF4444", taskCount: 0, isDefault: true },
    { id: 3, value: "shopping", label: "خرید", icon: "🛒", color: "#10B981", taskCount: 0, isDefault: true },
    { id: 4, value: "health", label: "سلامتی", icon: "🏥", color: "#8B5CF6", taskCount: 0, isDefault: true },
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
      <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg border border-blue-200 dark:border-gray-600 mb-6 w-full transition-colors duration-300">
        <h3 className="text-blue-600 dark:text-blue-400 font-semibold mb-4 text-lg text-right">انتخاب دسته‌بندی</h3>
        <div className="text-center py-8 w-full">
          <p className="text-blue-600 dark:text-blue-400 mb-4">در حال بارگذاری دسته‌بندی‌ها...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg border border-blue-200 dark:border-gray-600 mb-6 w-full transition-colors duration-300">
      <h3 className="text-blue-600 dark:text-blue-400 font-semibold mb-4 text-lg text-right">انتخاب دسته‌بندی</h3>
      
      <div className="space-y-3 w-full">
        {categories.map((cat) => (
          <button
            key={cat.value}
            type="button"
            onClick={() => onCategoryChange(cat.value)}
            className={`w-full p-4 rounded-lg transition-all duration-200 flex items-center justify-between border-2 ${
              category === cat.value 
                ? 'ring-4 ring-blue-500 ring-opacity-30 transform scale-[1.02] shadow-lg' 
                : 'border-transparent hover:shadow-md hover:scale-[1.01]'
            }`}
            style={{ 
              backgroundColor: cat.color,
              color: ['#E1D8F1', '#C5B4E3', '#FFEAA7', '#96CEB4', '#4ECDC4', '#85C1E9'].includes(cat.color) ? '#3B82F6' : 'white'
            }}
          >
            <div className="flex items-center gap-3 w-full">
              <span className="text-2xl">{cat.icon}</span>
              <span className="font-medium text-lg text-right">{cat.label}</span>
            </div>
            <svg 
              className={`w-5 h-5 ${['#E1D8F1', '#C5B4E3'].includes(cat.color) ? 'text-blue-600' : 'text-white opacity-90'}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ))}
      </div>

      {!category && (
        <div className="mt-4 p-3 bg-white dark:bg-gray-600 border border-blue-300 dark:border-gray-500 rounded-lg text-center w-full transition-colors duration-300">
          <span className="text-blue-600 dark:text-blue-400 text-sm">لطفاً یک دسته‌بندی انتخاب کنید</span>
        </div>
      )}

      {category && (
        <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-900 border border-blue-500 dark:border-blue-400 rounded-lg text-center w-full transition-colors duration-300">
          <span className="text-blue-700 dark:text-blue-300 font-medium">
            دسته‌بندی انتخاب شده: {categories.find(cat => cat.value === category)?.label}
          </span>
        </div>
      )}
    </div>
  );
}