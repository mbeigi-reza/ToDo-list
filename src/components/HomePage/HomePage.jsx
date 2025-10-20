// C:\Users\Dell\Desktop\ToDo-list\src\components\HomePage\HomePage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../../context/TaskContext';
import HorizontalCalendar from './HorizontalCalendar';
import TaskList from './TaskList';

export default function HomePage() {
  const { tasks } = useTasks();
  const [selectedDate, setSelectedDate] = useState(new Date()); // پیش‌فرض امروز
  const navigate = useNavigate();

  // فیلتر کردن تسک‌ها
  const filteredTasks = tasks.filter(task => {
    // اگر selectedDate null باشد (حالت همه تسک‌ها)، همه تسک‌ها نمایش داده می‌شوند
    if (selectedDate === null) {
      return true;
    }
    
    // اگر تسک تاریخ نداشته باشد، فقط در حالت "همه تسک‌ها" نمایش داده می‌شود
    if (!task.date) {
      return false;
    }
    
    // فیلتر بر اساس تاریخ انتخاب‌شده
    const taskDate = new Date(task.date);
    const selected = new Date(selectedDate);
    
    return taskDate.toDateString() === selected.toDateString();
  });

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
      {/* هدر */}
      <div className="bg-[#673AB7] text-white pt-12 pb-8 px-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">{getPageTitle()}</h1>
            <p className="text-lg opacity-90">{filteredTasks.length} تسک</p>
          </div>
          <button 
            onClick={() => navigate('/add')}
            className="bg-white text-[#673AB7] px-4 py-2 rounded-lg font-semibold text-sm"
          >
            + افزودن تسک
          </button>
        </div>
        
        {/* تاریخ و ساعت - فقط وقتی تاریخ مشخصه نمایش داده بشه */}
        {selectedDate !== null && (
          <div className="text-center">
            <div className="text-2xl font-bold mb-1">{toJalaliString(selectedDate)}</div>
            <div className="text-lg opacity-90">
              {getDayName(selectedDate)} - {new Date().toLocaleTimeString('fa-IR')}
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