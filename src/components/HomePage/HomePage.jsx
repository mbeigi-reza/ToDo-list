import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../../context/TaskContext';
import HorizontalCalendar from './HorizontalCalendar';
import TaskList from './TaskList';

// آیکون‌های SVG بهینه‌شده برای موبایل
const TodayIcon = () => (
  <svg className="w-4 h-4 xs:w-5 xs:h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
  </svg>
);

const AllTasksIcon = () => (
  <svg className="w-4 h-4 xs:w-5 xs:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-4 h-4 xs:w-5 xs:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const AddTaskIcon = () => (
  <svg className="w-3 h-3 xs:w-4 xs:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const CategoriesIcon = () => (
  <svg className="w-3 h-3 xs:w-4 xs:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    <div className="min-h-screen bg-white min-w-xxs">
      {/* هدر کاملاً رسپانسیو */}
      <div className="bg-primary-600 text-white pt-3 xxs:pt-4 xs:pt-6 pb-2 xxs:pb-3 xs:pb-4 px-2 xxs:px-3 xs:px-4">
        <div className="flex flex-col xxs:flex-row xxs:justify-between xxs:items-start gap-1 xxs:gap-2 xs:gap-3">
          {/* بخش اطلاعات اصلی */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-2 xxs:gap-3 space-x-reverse">
              {/* آیکون وضعیت */}
              <div className="bg-white bg-opacity-20 p-2 xxs:p-3 rounded-lg flex-shrink-0 mt-0.5">
                <div className="text-white">
                  {getStatusIcon()}
                </div>
              </div>
              
              {/* متن‌ها */}
              <div className="flex-1 min-w-0 overflow-hidden">
                <div className="flex flex-col xxs:flex-row xxs:items-center gap-1 xxs:gap-2">
                  <h1 className="text-base xxs:text-lg xs:text-xl font-bold truncate">{getPageTitle()}</h1>
                  {selectedDate !== null && (
                    <span className="bg-white bg-opacity-20 px-2 xxs:px-3 py-1 rounded-full text-xxs xxs:text-xs self-start xxs:self-auto whitespace-nowrap flex-shrink-0 mt-0.5 xxs:mt-0">
                      {getDayName(selectedDate)}
                    </span>
                  )}
                </div>
                <p className="text-xxs xxs:text-xs xs:text-sm opacity-90 mt-1 whitespace-nowrap">
                  {totalTasks} تسک • {completedTasks} انجام شده
                </p>
              </div>
            </div>
            
            {/* نوار پیشرفت - در موبایل‌های بسیار کوچک مخفی */}
            {totalTasks > 0 && (
              <div className="hidden xxs:block bg-white bg-opacity-20 rounded-full h-1.5 xs:h-2 mt-2 xs:mt-3">
                <div 
                  className="bg-green-400 h-1.5 xs:h-2 rounded-full transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
            )}
          </div>
          
          {/* دکمه‌های عمل - کاملاً فشرده */}
          <div className="flex flex-row xxs:flex-col mb-4 gap-1 xxs:gap-2 mt-2 xxs:mt-0">
            <button 
              onClick={() => navigate('/add')}
              className="flex-1 xxs:flex-none bg-white text-primary-600 px-2 xxs:px-3 py-1 xxs:py-2 xs:py-3 rounded-lg font-semibold text-xxs xxs:text-xs xs:text-sm flex items-center justify-center gap-1 xxs:gap-2 space-x-reverse hover:bg-opacity-90 transition-all whitespace-nowrap min-h-[2rem] xxs:min-h-[2.5rem]"
            >
              <AddTaskIcon />
              <span>تسک جدید</span>
            </button>
            
            <button 
              onClick={() => navigate('/categories')}
              className="flex-1 xxs:flex-none bg-white bg-opacity-20 text-white px-2 xxs:px-3 py-1 xxs:py-2 rounded-lg font-medium text-xxs xxs:text-xs xs:text-sm flex items-center justify-center gap-1 xxs:gap-2 space-x-reverse hover:bg-opacity-30 transition-all border border-white border-opacity-30 whitespace-nowrap min-h-[2rem]"
            >
              <CategoriesIcon />
              <span>دسته‌بندی‌ها</span>
            </button>
          </div>
        </div>

        {/* اطلاعات آماری - در موبایل‌های بسیار کوچک مخفی */}
        {selectedDate !== null && totalTasks > 0 && (
          <div className="hidden xxs:flex justify-end mt-2 xs:mt-3 pt-2 xs:pt-3 border-t border-white border-opacity-20">
            <div className="bg-white bg-opacity-20 px-2 xs:px-3 py-1 rounded-full text-xxs xxs:text-xs">
              {completionPercentage}% تکمیل شده
            </div>
          </div>
        )}
      </div>

      {/* تقویم افقی */}
      <div className="bg-white mx-1 xxs:mx-2 xs:mx-4 -mt-2 xxs:-mt-3 xs:-mt-4 rounded-lg shadow-lg p-2 xxs:p-3 xs:p-4 z-10 relative">
        <HorizontalCalendar 
          selectedDate={selectedDate} 
          onDateChange={setSelectedDate} 
        />
      </div>

      {/* لیست تسک‌ها */}
      <div className="p-2 xxs:p-3 xs:p-4 md:p-6">
        <h2 className="text-sm xxs:text-base xs:text-lg md:text-xl font-bold mb-2 xxs:mb-3 xs:mb-4 md:mb-6 text-right text-gray-800 truncate">
          {selectedDate === null 
            ? "همه تسک‌های شما" 
            : isToday(selectedDate) 
              ? "تسک‌های امروز" 
              : `تسک‌های ${toJalaliString(selectedDate)}`
          }
        </h2>
        
        {filteredTasks.length === 0 ? (
          <div className="text-center py-4 xxs:py-6 xs:py-8">
            <div className="text-gray-400 text-2xl xxs:text-3xl xs:text-4xl md:text-6xl mb-2 xxs:mb-3 xs:mb-4">
              {selectedDate === null ? '📋' : isToday(selectedDate) ? '📝' : '📅'}
            </div>
            <p className="text-gray-500 mb-2 xxs:mb-3 xs:mb-4 text-xxs xxs:text-xs xs:text-sm md:text-base px-1 xxs:px-2 text-ellipsis-2">
              {selectedDate === null 
                ? 'هنوز هیچ تسکی ایجاد نکرده‌اید' 
                : isToday(selectedDate)
                  ? 'هنوز هیچ تسکی برای امروز ندارید' 
                  : `هیچ تسکی برای ${toJalaliString(selectedDate)} ندارید`
              }
            </p>
            <button 
              onClick={() => navigate('/add')}
              className="bg-primary-500 hover:bg-primary-600 text-white px-3 xxs:px-4 xs:px-6 py-1 xxs:py-2 rounded-lg font-medium text-xxs xxs:text-xs xs:text-sm md:text-base flex items-center justify-center gap-1 xxs:gap-2 space-x-reverse mx-auto"
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