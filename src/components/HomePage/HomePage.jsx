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

  // فیلتر کردن تسک‌ها بر اساس تاریخ انتخاب‌شده
  const filteredTasks = tasks.filter(task => {
    const taskDate = new Date(task.date);
    const selected = new Date(selectedDate);
    
    return taskDate.toDateString() === selected.toDateString();
  });

  // تبدیل تاریخ به شمسی برای نمایش
  const toJalaliString = (date) => {
    // این تابع رو از Calendar.jsx می‌تونید import کنید
    // برای سادگی فعلاً از تاریخ میلادی استفاده می‌کنیم
    return date.toLocaleDateString('fa-IR');
  };

  const getDayName = (date) => {
    const days = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'];
    return days[date.getDay()];
  };

  const isToday = (date) => {
    return date.toDateString() === new Date().toDateString();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* هدر */}
      <div className="bg-[#673AB7] text-white pt-12 pb-8 px-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">
              {isToday(selectedDate) ? 'امروز' : toJalaliString(selectedDate)}
            </h1>
            <p className="text-lg opacity-90">{filteredTasks.length} تسک</p>
          </div>
          <button 
            onClick={() => navigate('/add')}
            className="bg-white text-[#673AB7] px-4 py-2 rounded-lg font-semibold text-sm"
          >
            + افزودن تسک
          </button>
        </div>
        
        {/* تاریخ و ساعت */}
        <div className="text-center">
          <div className="text-2xl font-bold mb-1">{toJalaliString(selectedDate)}</div>
          <div className="text-lg opacity-90">
            {getDayName(selectedDate)} - {new Date().toLocaleTimeString('fa-IR')}
          </div>
        </div>
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
          {isToday(selectedDate) ? 'تسک‌های امروز' : `تسک‌های ${toJalaliString(selectedDate)}`}
        </h2>
        
        {filteredTasks.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 text-6xl mb-4">
              {isToday(selectedDate) ? '📝' : '📅'}
            </div>
            <p className="text-gray-500 mb-4">
              {isToday(selectedDate) 
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