// C:\Users\Dell\Desktop\ToDo-list\src\components\AddTaskPage\TaskForm.jsx
import React from "react";

export default function TaskForm({ task, onTaskChange }) {
  return (
    <div className="space-y-4 mb-6">
      {/* عنوان تسک */}
      <div className="bg-[#F8F5FF] p-4 rounded-lg border border-[#E1D8F1]">
        <div className="flex items-center justify-between mb-3">
          <label className="text-[#673AB7] font-semibold text-lg flex items-center space-x-2 space-x-reverse">
            <span className="text-xl">📝</span>
            <span>عنوان تسک</span>
          </label>
          <div className="text-[#7C4DFF] text-sm bg-white px-2 py-1 rounded-lg border border-[#C5B4E3]">
            الزامی
          </div>
        </div>
        
        <input
          type="text"
          value={task.title}
          onChange={(e) => onTaskChange("title", e.target.value)}
          className="w-full p-4 bg-white border-2 border-[#C5B4E3] rounded-lg text-right text-[#673AB7] placeholder-[#C5B4E3] focus:outline-none focus:ring-2 focus:ring-[#7C4DFF] focus:border-transparent transition-all duration-200"
          placeholder="عنوان تسک را اینجا وارد کنید..."
        />
        
        {task.title && (
          <div className="mt-2 text-xs text-[#7C4DFF] text-left">
            {task.title.length}/50 کاراکتر
          </div>
        )}
      </div>

      {/* توضیحات تسک */}
      <div className="bg-[#F8F5FF] p-4 rounded-lg border border-[#E1D8F1]">
        <div className="flex items-center justify-between mb-3">
          <label className="text-[#673AB7] font-semibold text-lg flex items-center space-x-2 space-x-reverse">
            <span className="text-xl">📄</span>
            <span>توضیحات</span>
          </label>
          <div className="text-[#7C4DFF] text-sm bg-white px-2 py-1 rounded-lg border border-[#C5B4E3]">
            اختیاری
          </div>
        </div>
        
        <textarea
          value={task.description}
          onChange={(e) => onTaskChange("description", e.target.value)}
          rows="4"
          className="w-full p-4 bg-white border-2 border-[#C5B4E3] rounded-lg text-right text-[#673AB7] placeholder-[#C5B4E3] focus:outline-none focus:ring-2 focus:ring-[#7C4DFF] focus:border-transparent resize-none transition-all duration-200"
          placeholder="توضیحات تکمیلی درباره تسک را اینجا بنویسید..."
        />
        
        {task.description && (
          <div className="mt-2 text-xs text-[#7C4DFF] text-left">
            {task.description.length}/200 کاراکتر
          </div>
        )}
      </div>

      {/* پیشنمایش تسک */}
      {(task.title || task.description) && (
        <div className="bg-[#E1D8F1] p-4 rounded-lg border border-[#7C4DFF]">
          <h4 className="text-[#673AB7] font-semibold mb-2 text-right">پیشنمایش تسک:</h4>
          <div className="bg-white p-3 rounded-lg border border-[#C5B4E3]">
            {task.title && (
              <div className="text-[#512DA8] font-medium mb-2 text-right">📌 {task.title}</div>
            )}
            {task.description && (
              <div className="text-[#673AB7] text-sm text-right leading-relaxed">
                {task.description}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}