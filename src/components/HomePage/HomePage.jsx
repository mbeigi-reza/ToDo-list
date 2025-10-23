// C:\Users\Dell\Desktop\ToDo-list\src\components\HomePage\HomePage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../../context/TaskContext';
import HorizontalCalendar from './HorizontalCalendar';
import TaskList from './TaskList';

export default function HomePage() {
  const { tasks } = useTasks();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();

  // فیلتر کردن تسک‌ها
  const filteredTasks = tasks.filter(task => {
    if (selectedDate === null) return true;
    if (!task.date) return false;
    const taskDate = new Date(task.date);
    const selected = new Date(selectedDate);
    return taskDate.toDateString() === selected.toDateString();
  });

  // محاسبه آمار
  const completedTasks = filteredTasks.filter(task => task.completed).length;
  const totalTasks = filteredTasks.length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const toJalaliString = (date) => {
    if (date === null) return "همه تسک‌ها";
    return date.toLocaleDateString('fa-IR');
  };

  const getDayName = (date) => {
    if (date === null) return "";
    const days = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'];
    return days[date.getDay()];
  };

  const isToday = (date) => {
    if (date === null) return false;
    return date.toDateString() === new Date().toDateString();
  };

  const getPageTitle = () => {
    if (selectedDate === null) {
      return "همه تسک‌ها";
    } else if (isToday(selectedDate)) {
      return "امروز";
    } else {
      return toJalaliString(selectedDate);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* هدر بهبود یافته */}
      <div className="bg-[#673AB7] text-white pt-8 pb-6 px-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 space-x-reverse mb-2">
              <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                <span className="text-xl">
                  {selectedDate === null ? '📋' : isToday(selectedDate) ? '⭐' : '📅'}
                </span>
              </div>
              <div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <h1 className="text-2xl font-bold">{getPageTitle()}</h1>
                  {selectedDate !== null && (
                    <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                      {getDayName(selectedDate)}
                    </span>
                  )}
                </div>
                <p className="text-lg opacity-90 mt-1">
                  {totalTasks} تسک • {completedTasks} انجام شده
                </p>
              </div>
            </div>
            
            {/* نوار پیشرفت */}
            {totalTasks > 0 && (
              <div className="bg-white bg-opacity-20 rounded-full h-2 mt-3">
                <div 
                  className="bg-green-400 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
            )}
          </div>
          
          <div className="flex flex-col space-y-3">
            <button 
              onClick={() => navigate('/add')}
              className="bg-white text-[#673AB7] px-4 py-3 rounded-lg font-semibold text-sm flex items-center space-x-2 space-x-reverse hover:bg-opacity-90 transition-all"
            >
              <span>+</span>
              <span>تسک جدید</span>
            </button>
            
            <button 
              onClick={() => navigate('/categories')}
              className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center space-x-2 space-x-reverse hover:bg-opacity-30 transition-all border border-white border-opacity-30"
            >
              <span>🏷️</span>
              <span>دسته‌بندی‌ها</span>
            </button>
          </div>
        </div>

        {/* اطلاعات آماری پایین */}
        {selectedDate !== null && totalTasks > 0 && (
          <div className="flex justify-end mt-4 pt-4 border-t border-white border-opacity-20">
            <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-xs">
              {completionPercentage}% تکمیل شده
            </div>
          </div>
        )}
      </div>

      {/* تقویم افقی */}
      <div className="bg-white mx-4 -mt-6 rounded-lg shadow-lg p-4 z-10 relative">
        <HorizontalCalendar 
          selectedDate={selectedDate} 
          onDateChange={setSelectedDate} 
        />
      </div>

      {/* لیست تسک‌ها */}
      <div className="p-6">
        <h2 className="text-xl font-bold mb-6 text-right text-gray-800">
          {selectedDate === null 
            ? "همه تسک‌های شما" 
            : isToday(selectedDate) 
              ? "تسک‌های امروز" 
              : `تسک‌های ${toJalaliString(selectedDate)}`
          }
        </h2>
        
        {filteredTasks.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 text-6xl mb-4">
              {selectedDate === null ? '📋' : isToday(selectedDate) ? '📝' : '📅'}
            </div>
            <p className="text-gray-500 mb-4">
              {selectedDate === null 
                ? 'هنوز هیچ تسکی ایجاد نکرده‌اید' 
                : isToday(selectedDate)
                  ? 'هنوز هیچ تسکی برای امروز ندارید' 
                  : `هیچ تسکی برای ${toJalaliString(selectedDate)} ندارید`
              }
            </p>
            <button 
              onClick={() => navigate('/add')}
              className="bg-[#7C4DFF] hover:bg-[#673AB7] text-white px-6 py-2 rounded-lg font-medium"
            >
              افزودن تسک جدید
            </button>
          </div>
        ) : (
          <TaskList tasks={filteredTasks} selectedDate={selectedDate} />
        )}
      </div>
    </div>
  );
}