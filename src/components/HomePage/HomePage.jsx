import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../../context/TaskContext';
import HorizontalCalendar from './HorizontalCalendar';
import TaskList from './TaskList';

// کامپوننت آیکون‌های SVG
const TodayIcon = () => (
  <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
  </svg>
);

const AllTasksIcon = () => (
  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const AddTaskIcon = () => (
  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const CategoriesIcon = () => (
  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
  </svg>
);

export default function HomePage() {
  const { tasks } = useTasks();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();

  const filteredTasks = tasks.filter(task => {
    if (selectedDate === null) return true;
    if (!task.date) return false;
    const taskDate = new Date(task.date);
    const selected = new Date(selectedDate);
    return taskDate.toDateString() === selected.toDateString();
  });

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

  const getStatusIcon = () => {
    if (selectedDate === null) {
      return <AllTasksIcon />;
    } else if (isToday(selectedDate)) {
      return <TodayIcon />;
    } else {
      return <CalendarIcon />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* هدر بهبود یافته */}
      <div className="bg-[#673AB7] text-white pt-6 md:pt-8 pb-4 md:pb-6 px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 md:gap-0 mb-3 md:mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 md:space-x-3 space-x-reverse mb-2">
              <div className="bg-white bg-opacity-20 p-2 md:p-3 rounded-lg">
                <div className="text-white">
                  {getStatusIcon()}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
                  <h1 className="text-xl md:text-2xl font-bold">{getPageTitle()}</h1>
                  {selectedDate !== null && (
                    <span className="bg-white bg-opacity-20 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm self-start md:self-auto">
                      {getDayName(selectedDate)}
                    </span>
                  )}
                </div>
                <p className="text-base md:text-lg opacity-90 mt-1">
                  {totalTasks} تسک • {completedTasks} انجام شده
                </p>
              </div>
            </div>
            
            {/* نوار پیشرفت */}
            {totalTasks > 0 && (
              <div className="bg-white bg-opacity-20 rounded-full h-1.5 md:h-2 mt-2 md:mt-3">
                <div 
                  className="bg-green-400 h-1.5 md:h-2 rounded-full transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
            )}
          </div>
          
          {/* دکمه‌های عمل - با آیکون‌های SVG */}
          <div className="flex flex-row md:flex-col gap-2 md:gap-3 mt-2 md:mt-0">
            <button 
              onClick={() => navigate('/add')}
              className="flex-1 md:flex-none bg-white text-[#673AB7] px-3 md:px-4 py-2 md:py-3 rounded-lg font-semibold text-sm flex items-center justify-center space-x-2 space-x-reverse hover:bg-opacity-90 transition-all"
            >
              <AddTaskIcon />
              <span>تسک جدید</span>
            </button>
            
            <button 
              onClick={() => navigate('/categories')}
              className="flex-1 md:flex-none bg-white bg-opacity-20 text-white px-3 md:px-4 py-2 rounded-lg font-medium text-sm flex items-center justify-center space-x-2 space-x-reverse hover:bg-opacity-30 transition-all border border-white border-opacity-30"
            >
              <CategoriesIcon />
              <span>دسته‌بندی‌ها</span>
            </button>
          </div>
        </div>

        {/* اطلاعات آماری پایین */}
        {selectedDate !== null && totalTasks > 0 && (
          <div className="flex justify-end mt-3 md:mt-4 pt-3 md:pt-4 border-t border-white border-opacity-20">
            <div className="bg-white bg-opacity-20 px-2 mb-6 md:px-3 py-1 rounded-full text-xs">
              {completionPercentage}% تکمیل شده
            </div>
          </div>
        )}
      </div>

      {/* تقویم افقی */}
      <div className="bg-white mx-2 md:mx-4 -mt-3 md:-mt-6 rounded-lg shadow-lg p-3 md:p-4 z-10 relative">
        <HorizontalCalendar 
          selectedDate={selectedDate} 
          onDateChange={setSelectedDate} 
        />
      </div>

      {/* لیست تسک‌ها */}
      <div className="p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6 text-right text-gray-800">
          {selectedDate === null 
            ? "همه تسک‌های شما" 
            : isToday(selectedDate) 
              ? "تسک‌های امروز" 
              : `تسک‌های ${toJalaliString(selectedDate)}`
          }
        </h2>
        
        {filteredTasks.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 text-4xl md:text-6xl mb-3 md:mb-4">
              {selectedDate === null ? '📋' : isToday(selectedDate) ? '📝' : '📅'}
            </div>
            <p className="text-gray-500 mb-3 md:mb-4 text-sm md:text-base">
              {selectedDate === null 
                ? 'هنوز هیچ تسکی ایجاد نکرده‌اید' 
                : isToday(selectedDate)
                  ? 'هنوز هیچ تسکی برای امروز ندارید' 
                  : `هیچ تسکی برای ${toJalaliString(selectedDate)} ندارید`
              }
            </p>
            <button 
              onClick={() => navigate('/add')}
              className="bg-[#7C4DFF] hover:bg-[#673AB7] text-white px-4 md:px-6 py-2 rounded-lg font-medium text-sm md:text-base flex items-center justify-center space-x-2 space-x-reverse mx-auto"
            >
              <AddTaskIcon />
              <span>افزودن تسک جدید</span>
            </button>
          </div>
        ) : (
          <TaskList tasks={filteredTasks} selectedDate={selectedDate} />
        )}
      </div>
    </div>
  );
}