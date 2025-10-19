// C:\Users\Dell\Desktop\ToDo-list\src\components\AddTaskPage\CategoryManager\AddCategoryModal.jsx
import React, { useState } from 'react';

export default function AddCategoryModal({ onClose, onSave, existingCategories }) {
  const [formData, setFormData] = useState({
    label: '',
    value: '',
    icon: '💡',
    color: '#7C4DFF'
  });

  const icons = [
    '💡', '🍕', '💼', '⚽', '🎵', '🎨', '📚', '🏠', '🚗', '✈️',
    '⭐', '❤️', '📱', '💻', '🎮', '🎬', '🎭', '🛒', '🏥', '🎓'
  ];

  const colors = [
    '#7C4DFF', '#673AB7', '#512DA8', '#C5B4E3', '#E1D8F1',
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* هدر مودال */}
        <div className="bg-[#673AB7] text-white p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
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
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* نام دسته‌بندی */}
          <div>
            <label className="block text-[#673AB7] font-semibold mb-2 text-right">
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
              className="w-full p-3 border-2 border-[#C5B4E3] rounded-lg text-right text-[#673AB7] focus:outline-none focus:ring-2 focus:ring-[#7C4DFF] focus:border-transparent"
              placeholder="مثال: مطالعه"
              maxLength={20}
            />
          </div>

          {/* مقدار دسته‌بندی */}
          <div>
            <label className="block text-[#673AB7] font-semibold mb-2 text-right">
              مقدار (فقط حروف لاتین)
            </label>
            <input
              type="text"
              value={formData.value}
              onChange={(e) => handleChange('value', e.target.value.replace(/\s+/g, '_').toLowerCase())}
              className="w-full p-3 border-2 border-[#C5B4E3] rounded-lg text-left text-[#673AB7] focus:outline-none focus:ring-2 focus:ring-[#7C4DFF] focus:border-transparent font-mono"
              placeholder="example: study"
              pattern="[a-zA-Z_]+"
              title="فقط حروف لاتین و underline مجاز است"
            />
          </div>

          {/* انتخاب آیکون */}
          <div>
            <label className="block text-[#673AB7] font-semibold mb-2 text-right">
              انتخاب آیکون
            </label>
            <div className="grid grid-cols-10 gap-2 max-h-32 overflow-y-auto p-2 border border-[#C5B4E3] rounded-lg">
              {icons.map((icon, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleChange('icon', icon)}
                  className={`w-8 h-8 text-lg rounded hover:bg-gray-100 transition-colors ${
                    formData.icon === icon ? 'bg-[#7C4DFF] text-white' : ''
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* انتخاب رنگ */}
          <div>
            <label className="block text-[#673AB7] font-semibold mb-2 text-right">
              انتخاب رنگ
            </label>
            <div className="grid grid-cols-10 gap-2 p-2 border border-[#C5B4E3] rounded-lg">
              {colors.map((color, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleChange('color', color)}
                  className={`w-6 h-6 rounded-full border-2 ${
                    formData.color === color ? 'border-gray-800' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* پیش‌نمایش */}
          <div className="p-3 bg-gray-50 rounded-lg border border-[#C5B4E3]">
            <label className="block text-[#673AB7] font-semibold mb-2 text-right">
              پیش‌نمایش
            </label>
            <div
              className="p-3 rounded-lg flex items-center justify-between text-right"
              style={{ 
                backgroundColor: formData.color,
                color: ['#E1D8F1', '#C5B4E3', '#FFEAA7', '#96CEB4', '#4ECDC4', '#85C1E9'].includes(formData.color) ? '#673AB7' : 'white'
              }}
            >
              <div className="flex items-center space-x-3 space-x-reverse">
                <span className="text-xl">{formData.icon}</span>
                <span className="font-semibold">{formData.label || 'نام دسته‌بندی'}</span>
              </div>
              <span className="text-sm opacity-90">0 تسک</span>
            </div>
          </div>

          {/* دکمه‌ها */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-6 border-2 border-[#673AB7] text-[#673AB7] font-semibold rounded-lg hover:bg-[#F8F5FF] transition-colors"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-6 bg-[#7C4DFF] hover:bg-[#673AB7] text-white font-semibold rounded-lg transition-colors"
            >
              ذخیره
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}