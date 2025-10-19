// C:\Users\Dell\Desktop\ToDo-list\src\components\HomePage\TaskList.jsx
import React from 'react';
import { useTasks } from '../../context/TaskContext';

export default function TaskList({ tasks, selectedDate }) {
  const { deleteTask, toggleTaskCompletion } = useTasks();

  // بارگذاری دسته‌بندی‌ها برای نمایش آیکون و رنگ
  const getCategoryInfo = (categoryValue) => {
    const savedCategories = localStorage.getItem('taskCategories');
    if (savedCategories) {
      const categories = JSON.parse(savedCategories);
      return categories.find(cat => cat.value === categoryValue);
    }
    return null;
  };

  return (
    <div className="space-y-4">
      {tasks.map((task, index) => {
        const categoryInfo = getCategoryInfo(task.category);
        
        return (
          <div 
            key={task.id}
            className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all ${
              task.completed ? 'opacity-60' : ''
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center space-x-3 space-x-reverse">
                {/* دکمه تکمیل/عدم تکمیل */}
                <button
                  onClick={() => toggleTaskCompletion(task.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    task.completed 
                      ? 'bg-[#673AB7] border-[#673AB7] text-white' 
                      : 'border-gray-300 hover:border-[#673AB7]'
                  }`}
                >
                  {task.completed && '✓'}
                </button>
                
                <h3 className={`font-semibold text-right text-lg ${
                  task.completed ? 'line-through text-gray-500' : 'text-gray-800'
                }`}>
                  {task.title}
                </h3>
              </div>
              
              <div className="flex items-center space-x-2 space-x-reverse">
                {/* نمایش دسته‌بندی */}
                {categoryInfo && (
                  <span 
                    className="text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap"
                    style={{ 
                      backgroundColor: categoryInfo.color,
                      color: ['#E1D8F1', '#C5B4E3'].includes(categoryInfo.color) ? '#673AB7' : 'white'
                    }}
                  >
                    {categoryInfo.icon} {categoryInfo.label}
                  </span>
                )}
                
                {/* دکمه حذف */}
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
            
            <p className={`text-gray-600 text-right text-sm leading-6 mb-2 ${
              task.completed ? 'line-through' : ''
            }`}>
              {task.description}
            </p>
            
            <div className="flex justify-between items-center text-xs text-gray-400">
              <span>{new Date(task.date).toLocaleDateString('fa-IR')}</span>
              <span>{task.time}</span>
            </div>
            
            {/* خط جداکننده */}
            {index < tasks.length - 1 && (
              <div className="border-t border-gray-100 mt-4 pt-4">
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>بعدی: {tasks[index + 1]?.title}</span>
                  <span>{tasks[index + 1]?.time}</span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}