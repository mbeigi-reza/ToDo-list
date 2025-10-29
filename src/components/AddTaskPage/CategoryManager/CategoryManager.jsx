import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddCategoryModal from './AddCategoryModal';

export default function CategoryManager() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 4 دسته‌بندی پیش‌فرض
  const defaultCategories = [
    { id: 1, value: "work", label: "کار", icon: "💼", color: "#3B82F6", taskCount: 0, isDefault: true },
    { id: 2, value: "personal", label: "شخصی", icon: "❤️", color: "#EF4444", taskCount: 0, isDefault: true },
    { id: 3, value: "shopping", label: "خرید", icon: "🛒", color: "#10B981", taskCount: 0, isDefault: true },
    { id: 4, value: "health", label: "سلامتی", icon: "🏥", color: "#8B5CF6", taskCount: 0, isDefault: true },
  ];

  // بارگذاری دسته‌بندی‌ها از localStorage
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

  // ذخیره دسته‌بندی‌ها در localStorage
  useEffect(() => {
    if (categories.length > 0) {
      localStorage.setItem('taskCategories', JSON.stringify(categories));
    }
  }, [categories]);

  const handleAddCategory = (newCategory) => {
    const category = {
      id: Date.now(),
      value: newCategory.value,
      label: newCategory.label,
      icon: newCategory.icon,
      color: newCategory.color,
      taskCount: 0,
      isDefault: false // دسته‌بندی‌های کاربرساخته پیش‌فرض نیستند
    };
    setCategories(prev => [...prev, category]);
    setIsModalOpen(false);
  };

  const handleDeleteCategory = (categoryId, isDefault) => {
    if (isDefault) {
      if (window.confirm('این یک دسته‌بندی پیش‌فرض است. آیا از حذف آن مطمئن هستید؟')) {
        setCategories(prev => prev.filter(cat => cat.id !== categoryId));
      }
    } else {
      if (window.confirm('آیا از حذف این دسته‌بندی مطمئن هستید؟')) {
        setCategories(prev => prev.filter(cat => cat.id !== categoryId));
      }
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleResetToDefault = () => {
    if (window.confirm('آیا می‌خواهید همه دسته‌بندی‌ها به حالت پیش‌فرض بازگردند؟ دسته‌بندی‌های ساخته‌شده توسط شما حذف خواهند شد.')) {
      setCategories(defaultCategories);
    }
  };

  // جدا کردن دسته‌بندی‌های پیش‌فرض و کاربرساخته
  const defaultCats = categories.filter(cat => cat.isDefault);
  const userCats = categories.filter(cat => !cat.isDefault);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 w-full transition-colors duration-300">
      {/* هدر */}
      <div className="bg-blue-600 dark:bg-gray-800 text-white p-4 rounded-t-lg mb-4 shadow-md w-full transition-colors duration-300">
        <div className="flex items-center justify-between">
          <button 
            onClick={handleBack}
            className="text-white bg-blue-700 dark:bg-gray-700 p-2 rounded-lg hover:bg-blue-800 dark:hover:bg-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold">مدیریت دسته‌بندی‌ها</h1>
          <div className="w-6"></div>
        </div>
      </div>

      {/* محتوای اصلی */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-full transition-colors duration-300">
        {/* دکمه‌های action */}
        <div className="flex gap-3 mb-6 w-full">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 shadow-md flex items-center justify-center space-x-2 space-x-reverse"
          >
            <span>➕</span>
            <span className="text-sm">دسته‌بندی جدید</span>
          </button>
          
          <button
            onClick={handleResetToDefault}
            className="flex-1 bg-blue-100 hover:bg-blue-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-blue-600 dark:text-blue-400 font-semibold py-3 px-4 rounded-lg transition-colors duration-200 border border-blue-300 dark:border-gray-600 flex items-center justify-center space-x-2 space-x-reverse"
          >
            <span>🔄</span>
            <span className="text-sm">بازنشانی</span>
          </button>
        </div>

        {/* دسته‌بندی‌های پیش‌فرض */}
        {defaultCats.length > 0 && (
          <div className="mb-6 w-full">
            <h3 className="text-blue-600 dark:text-blue-400 font-semibold mb-3 text-right flex items-center">
              <span className="ml-2">📋</span>
              دسته‌بندی‌های پیش‌فرض
            </h3>
            <div className="space-y-3 w-full">
              {defaultCats.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between p-4 rounded-lg border-2 border-transparent hover:shadow-md transition-all duration-200 relative w-full"
                  style={{ 
                    backgroundColor: category.color, 
                    color: ['#DBEAFE', '#93C5FD', '#FEF3C7', '#D1FAE5', '#E0E7FF'].includes(category.color) ? '#3B82F6' : 'white'
                  }}
                >
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <span className="text-2xl">{category.icon}</span>
                    <div className="text-right">
                      <div className="font-semibold text-lg">{category.label}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">
                      پیش‌فرض
                    </span>
                    <button
                      onClick={() => handleDeleteCategory(category.id, true)}
                      className="p-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors"
                      title="حذف دسته‌بندی"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* دسته‌بندی‌های کاربر */}
        {userCats.length > 0 && (
          <div className="mb-6 w-full">
            <h3 className="text-blue-600 dark:text-blue-400 font-semibold mb-3 text-right flex items-center">
              <span className="ml-2">👤</span>
              دسته‌بندی‌های شما
            </h3>
            <div className="space-y-3 w-full">
              {userCats.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between p-4 rounded-lg border-2 border-transparent hover:shadow-md transition-all duration-200 w-full"
                  style={{ 
                    backgroundColor: category.color, 
                    color: ['#DBEAFE', '#93C5FD', '#FEF3C7', '#D1FAE5', '#E0E7FF'].includes(category.color) ? '#3B82F6' : 'white'
                  }}
                >
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <span className="text-2xl">{category.icon}</span>
                    <div className="text-right">
                      <div className="font-semibold text-lg">{category.label}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <button
                      onClick={() => handleDeleteCategory(category.id, false)}
                      className="p-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors"
                      title="حذف دسته‌بندی"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* پیام وقتی هیچ دسته‌بندی‌ای وجود ندارد */}
        {categories.length === 0 && (
          <div className="text-center py-8 w-full">
            <div className="text-6xl mb-4">📂</div>
            <p className="text-blue-600 dark:text-blue-400 mb-4">هیچ دسته‌بندی‌ای وجود ندارد</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300"
            >
              ایجاد اولین دسته‌بندی
            </button>
          </div>
        )}

        {/* راهنما */}
        <div className="mt-6 p-4 bg-blue-50 dark:bg-gray-700 rounded-lg border border-blue-200 dark:border-gray-600 w-full transition-colors duration-300">
          <h3 className="text-blue-600 dark:text-blue-400 font-semibold mb-2 text-center">راهنما</h3>
          <ul className="text-blue-600 dark:text-blue-400 text-sm text-right space-y-1">
            <li>• <strong>دسته‌بندی‌های پیش‌فرض</strong> قابل حذف هستند</li>
            <li>• <strong>دسته‌بندی‌های شما</strong> فقط توسط شما ایجاد و حذف می‌شوند</li>
            <li>• با دکمه <strong>بازنشانی</strong> همه چیز به حالت اول برمی‌گردد</li>
          </ul>
        </div>
      </div>

      {/* مودال افزودن دسته‌بندی جدید */}
      {isModalOpen && (
        <AddCategoryModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddCategory}
          existingCategories={categories}
        />
      )}
    </div>
  );
}