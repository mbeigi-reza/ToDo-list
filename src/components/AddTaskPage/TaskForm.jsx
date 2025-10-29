import React from "react";
import { FileText, Edit3 } from 'lucide-react';

export default function TaskForm({ task, onTaskChange }) {
  return (
    <div className="space-y-4 mb-6 w-full">
      {/* عنوان تسک */}
      <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg border border-blue-200 dark:border-gray-600 w-full transition-colors duration-300">
        <div className="flex items-center justify-between mb-3 w-full">
          <label className="text-blue-600 dark:text-blue-400 font-semibold text-lg flex items-center gap-2">
            <Edit3 className="w-5 h-5" />
            <span>عنوان تسک</span>
          </label>
        </div>
        
        <input
          type="text"
          value={task.title}
          onChange={(e) => onTaskChange("title", e.target.value)}
          className="w-full p-4 bg-white dark:bg-gray-600 border-2 border-blue-300 dark:border-gray-500 rounded-lg text-right text-blue-600 dark:text-blue-400 placeholder-blue-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
          placeholder="عنوان تسک را اینجا وارد کنید..."
          maxLength={50}
        />
        
        {task.title && (
          <div className="mt-2 text-xs text-blue-500 dark:text-blue-400 text-left w-full">
            {task.title.length}/50 کاراکتر
          </div>
        )}
      </div>

      {/* توضیحات تسک */}
      <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg border border-blue-200 dark:border-gray-600 w-full transition-colors duration-300">
        <div className="flex items-center justify-between mb-3 w-full">
          <label className="text-blue-600 dark:text-blue-400 font-semibold text-lg flex items-center gap-2">
            <FileText className="w-5 h-5" />
            <span>توضیحات</span>
          </label>
        </div>
        
        <textarea
          value={task.description}
          onChange={(e) => onTaskChange("description", e.target.value)}
          rows="4"
          className="w-full p-4 bg-white dark:bg-gray-600 border-2 border-blue-300 dark:border-gray-500 rounded-lg text-right text-blue-600 dark:text-blue-400 placeholder-blue-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent resize-none transition-all duration-200"
          placeholder="توضیحات تکمیلی درباره تسک را اینجا بنویسید..."
          maxLength={200}
        />
        
        {task.description && (
          <div className="mt-2 text-xs text-blue-500 dark:text-blue-400 text-left w-full">
            {task.description.length}/200 کاراکتر
          </div>
        )}
      </div>

      {/* پیشنمایش تسک */}
      {(task.title || task.description) && (
        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg border border-blue-500 dark:border-blue-400 w-full transition-colors duration-300">
          <h4 className="text-blue-600 dark:text-blue-400 font-semibold mb-2 text-right">پیشنمایش تسک:</h4>
          <div className="bg-white dark:bg-gray-600 p-3 rounded-lg border border-blue-300 dark:border-gray-500 w-full transition-colors duration-300">
            {task.title && (
              <div className="text-blue-700 dark:text-blue-300 font-medium mb-2 text-right flex items-center gap-2 w-full">
                <Edit3 className="w-4 h-4" />
                {task.title}
              </div>
            )}
            {task.description && (
              <div className="text-blue-600 dark:text-blue-400 text-sm text-right leading-relaxed w-full">
                {task.description}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}