import React from "react";
import { FileText, Edit3 } from 'lucide-react';

export default function TaskForm({ task, onTaskChange }) {
  return (
    <div className="space-y-4 mb-6 w-full"> {/* ✅ تغییر اینجا */}
      {/* عنوان تسک */}
      <div className="bg-[#F8F5FF] p-4 rounded-lg border border-[#E1D8F1] w-full"> {/* ✅ تغییر اینجا */}
        <div className="flex items-center justify-between mb-3 w-full"> {/* ✅ تغییر اینجا */}
          <label className="text-[#673AB7] font-semibold text-lg flex items-center gap-2">
            <Edit3 className="w-5 h-5" />
            <span>عنوان تسک</span>
          </label>
        </div>
        
        <input
          type="text"
          value={task.title}
          onChange={(e) => onTaskChange("title", e.target.value)}
          className="w-full p-4 bg-white border-2 border-[#C5B4E3] rounded-lg text-right text-[#673AB7] placeholder-[#C5B4E3] focus:outline-none focus:ring-2 focus:ring-[#7C4DFF] focus:border-transparent transition-all duration-200"
          placeholder="عنوان تسک را اینجا وارد کنید..."
        />
        
        {task.title && (
          <div className="mt-2 text-xs text-[#7C4DFF] text-left w-full"> {/* ✅ تغییر اینجا */}
            {task.title.length}/50 کاراکتر
          </div>
        )}
      </div>

      {/* توضیحات تسک */}
      <div className="bg-[#F8F5FF] p-4 rounded-lg border border-[#E1D8F1] w-full"> {/* ✅ تغییر اینجا */}
        <div className="flex items-center justify-between mb-3 w-full"> {/* ✅ تغییر اینجا */}
          <label className="text-[#673AB7] font-semibold text-lg flex items-center gap-2">
            <FileText className="w-5 h-5" />
            <span>توضیحات</span>
          </label>
        </div>
        
        <textarea
          value={task.description}
          onChange={(e) => onTaskChange("description", e.target.value)}
          rows="4"
          className="w-full p-4 bg-white border-2 border-[#C5B4E3] rounded-lg text-right text-[#673AB7] placeholder-[#C5B4E3] focus:outline-none focus:ring-2 focus:ring-[#7C4DFF] focus:border-transparent resize-none transition-all duration-200"
          placeholder="توضیحات تکمیلی درباره تسک را اینجا بنویسید..."
        />
        
        {task.description && (
          <div className="mt-2 text-xs text-[#7C4DFF] text-left w-full"> {/* ✅ تغییر اینجا */}
            {task.description.length}/200 کاراکتر
          </div>
        )}
      </div>

      {/* پیشنمایش تسک */}
      {(task.title || task.description) && (
        <div className="bg-[#E1D8F1] p-4 rounded-lg border border-[#7C4DFF] w-full"> {/* ✅ تغییر اینجا */}
          <h4 className="text-[#673AB7] font-semibold mb-2 text-right">پیشنمایش تسک:</h4>
          <div className="bg-white p-3 rounded-lg border border-[#C5B4E3] w-full"> {/* ✅ تغییر اینجا */}
            {task.title && (
              <div className="text-[#512DA8] font-medium mb-2 text-right flex items-center gap-2 w-full"> {/* ✅ تغییر اینجا */}
                <Edit3 className="w-4 h-4" />
                {task.title}
              </div>
            )}
            {task.description && (
              <div className="text-[#673AB7] text-sm text-right leading-relaxed w-full"> {/* ✅ تغییر اینجا */}
                {task.description}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}