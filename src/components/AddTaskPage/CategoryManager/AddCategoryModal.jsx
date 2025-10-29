import React, { useState } from 'react';

export default function AddCategoryModal({ onClose, onSave, existingCategories }) {
  const [formData, setFormData] = useState({
    label: '',
    value: '',
    icon: '💡',
    color: '#3B82F6'
  });

  const icons = [
    '💡', '🍕', '💼', '⚽', '🎵', '🎨', '📚', '🏠', '🚗', '✈️',
    '⭐', '❤️', '📱', '💻', '🎮', '🎬', '🎭', '🛒', '🏥', '🎓'
  ];

  const colors = [
    '#3B82F6', '#2563EB', '#1D4ED8', '#93C5FD', '#DBEAFE',
    '#EF4444', '#10B981', '#06B6D4', '#84CC16', '#F59E0B',
    '#8B5CF6', '#EC4899', '#F97316', '#6366F1', '#14B8A6'
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // اعتبارسنجی
    if (!formData.label.trim()) {
      alert('لطفاً نام دسته‌بندی را وارد کنید');
      return;
    }

    if (!formData.value.trim()) {
      alert('لطفاً مقدار دسته‌بندی را وارد کنید');
      return;
    }

    // بررسی تکراری نبودن
    const isDuplicate = existingCategories.some(
      cat => cat.value === formData.value || cat.label === formData.label
    );

    if (isDuplicate) {
      alert('این دسته‌بندی قبلاً وجود دارد');
      return;
    }

    onSave(formData);
  };

  const generateValueFromLabel = (label) => {
    return label.replace(/\s+/g, '_').toLowerCase();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 w-full">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md transition-colors duration-300">
        {/* هدر مودال */}
        <div className="bg-blue-600 dark:bg-gray-700 text-white p-4 rounded-t-lg w-full transition-colors duration-300">
          <div className="flex items-center justify-between w-full">
            <h2 className="text-xl font-bold">افزودن دسته‌بندی جدید</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* فرم */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 w-full">
          {/* نام دسته‌بندی */}
          <div className="w-full">
            <label className="block text-blue-600 dark:text-blue-400 font-semibold mb-2 text-right w-full">
              نام دسته‌بندی
            </label>
            <input
              type="text"
              value={formData.label}
              onChange={(e) => {
                handleChange('label', e.target.value);
                // تولید خودکار value از روی label
                if (!formData.value) {
                  handleChange('value', generateValueFromLabel(e.target.value));
                }
              }}
              className="w-full p-3 border-2 border-blue-300 dark:border-gray-600 rounded-lg text-right text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-300"
              placeholder="مثال: مطالعه"
              maxLength={20}
            />
          </div>

          {/* مقدار دسته‌بندی */}
          <div className="w-full">
            <label className="block text-blue-600 dark:text-blue-400 font-semibold mb-2 text-right w-full">
              مقدار (فقط حروف لاتین)
            </label>
            <input
              type="text"
              value={formData.value}
              onChange={(e) => handleChange('value', e.target.value.replace(/\s+/g, '_').toLowerCase())}
              className="w-full p-3 border-2 border-blue-300 dark:border-gray-600 rounded-lg text-left text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent font-mono transition-colors duration-300"
              placeholder="example: study"
              pattern="[a-zA-Z_]+"
              title="فقط حروف لاتین و underline مجاز است"
            />
          </div>

          {/* انتخاب آیکون */}
          <div className="w-full">
            <label className="block text-blue-600 dark:text-blue-400 font-semibold mb-2 text-right w-full">
              انتخاب آیکون
            </label>
            <div className="grid grid-cols-10 gap-2 max-h-32 overflow-y-auto p-2 border border-blue-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 w-full transition-colors duration-300">
              {icons.map((icon, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleChange('icon', icon)}
                  className={`w-8 h-8 text-lg rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
                    formData.icon === icon ? 'bg-blue-600 text-white' : ''
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* انتخاب رنگ */}
          <div className="w-full">
            <label className="block text-blue-600 dark:text-blue-400 font-semibold mb-2 text-right w-full">
              انتخاب رنگ
            </label>
            <div className="grid grid-cols-10 gap-2 p-2 border border-blue-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 w-full transition-colors duration-300">
              {colors.map((color, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleChange('color', color)}
                  className={`w-6 h-6 rounded-full border-2 transition-colors ${
                    formData.color === color ? 'border-gray-800 dark:border-gray-200' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* پیش‌نمایش */}
          <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-blue-300 dark:border-gray-600 w-full transition-colors duration-300">
            <label className="block text-blue-600 dark:text-blue-400 font-semibold mb-2 text-right w-full">
              پیش‌نمایش
            </label>
            <div
              className="p-3 rounded-lg flex items-center justify-between text-right w-full transition-colors duration-300"
              style={{ 
                backgroundColor: formData.color,
                color: ['#DBEAFE', '#93C5FD', '#FEF3C7', '#D1FAE5', '#E0E7FF'].includes(formData.color) ? '#3B82F6' : 'white'
              }}
            >
              <div className="flex items-center space-x-3 space-x-reverse w-full">
                <span className="text-xl">{formData.icon}</span>
                <span className="font-semibold">{formData.label || 'نام دسته‌بندی'}</span>
              </div>
              <span className="text-sm opacity-90">0 تسک</span>
            </div>
          </div>

          {/* دکمه‌ها */}
          <div className="flex gap-3 pt-4 w-full">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-6 border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 font-semibold rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-300"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-6 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-semibold rounded-lg transition-colors duration-300"
            >
              ذخیره
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}