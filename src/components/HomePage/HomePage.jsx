import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../../context/TaskContext';
import HorizontalCalendar from './HorizontalCalendar';
import TaskList from './TaskList';
import { 
  Clock, 
  ListTodo, 
  Calendar, 
  Plus, 
  FolderOpen
} from 'lucide-react';

// آیکون‌های SVG بهینه‌شده برای موبایل
const TodayIcon = () => <Clock className="w-3 h-3 xxxs:w-4 xxxs:h-4 xs:w-5 xs:h-5" />;
const AllTasksIcon = () => <ListTodo className="w-3 h-3 xxxs:w-4 xxxs:h-4 xs:w-5 xs:h-5" />;
const CalendarIcon = () => <Calendar className="w-3 h-3 xxxs:w-4 xxxs:h-4 xs:w-5 xs:h-5" />;
const AddTaskIcon = () => <Plus className="w-2.5 h-2.5 xxxs:w-3 xxxs:h-3 xs:w-4 xs:h-4" />;
const CategoriesIcon = () => <FolderOpen className="w-2.5 h-2.5 xxxs:w-3 xxxs:h-3 xs:w-4 xs:h-4" />;

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
    <div className="min-h-screen bg-white w-full overflow-x-hidden">
      {/* هدر کاملاً رسپانسیو */}
      <div className="bg-[#673AB7] text-white pt-2 xxxs:pt-3 xxs:pt-4 xs:pt-6 pb-1 xxxs:pb-2 xxs:pb-3 xs:pb-4 px-4 w-full mx-0">
        <div className="flex flex-col xxxs:flex-row xxxs:justify-between xxxs:items-start gap-1 xxxs:gap-2 xs:gap-3 mx-0">
          {/* بخش اطلاعات اصلی */}
          <div className="flex-1 min-w-0 mx-0">
            <div className="flex items-start gap-1 xxxs:gap-2 xxs:gap-3 mx-0">
              {/* آیکون وضعیت */}
              <div className="bg-white bg-opacity-20 p-1.5 xxxs:p-2 xxs:p-3 rounded-lg flex-shrink-0 mt-0.5">
                <div className="text-white">
                  {getStatusIcon()}
                </div>
              </div>
              
              {/* متن‌ها */}
              <div className="flex-1 min-w-0 overflow-hidden mx-0">
                <div className="flex flex-col xxxs:flex-row xxxs:items-center gap-0.5 xxxs:gap-1 xxs:gap-2 mx-0">
                  <h1 className="text-sm xxxs:text-base xxs:text-lg xs:text-xl font-bold truncate mx-0">{getPageTitle()}</h1>
                  {selectedDate !== null && (
                    <span className="bg-white bg-opacity-20 px-1.5 xxxs:px-2 xxs:px-3 py-0.5 xxxs:py-1 rounded-full text-xxxs xxxs:text-xxs xxs:text-xs self-start xxxs:self-auto whitespace-nowrap flex-shrink-0 mt-0.5 xxxs:mt-0">
                      {getDayName(selectedDate)}
                    </span>
                  )}
                </div>
                <p className="text-xxxs xxxs:text-xxs xxs:text-xs xs:text-sm opacity-90 mt-0.5 xxxs:mt-1 whitespace-nowrap mx-0">
                  {totalTasks} تسک • {completedTasks} انجام شده
                </p>
              </div>
            </div>
            
            {/* نوار پیشرفت - در موبایل‌های بسیار کوچک مخفی */}
            {totalTasks > 0 && (
              <div className="hidden xxxs:block bg-white bg-opacity-20 rounded-full h-1 xxxs:h-1.5 xs:h-2 mt-1 xxxs:mt-2 xs:mt-3 mx-0">
                <div 
                  className="bg-green-400 h-1 xxxs:h-1.5 xs:h-2 rounded-full transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
            )}
          </div>
          
          {/* دکمه‌های عمل - کاملاً فشرده - سمت راست */}
          <div className="flex flex-row xxxs:flex-col mb-4 gap-0.5 xxxs:gap-1 xxs:gap-2 mt-1 xxxs:mt-2 xxs:mt-0 mx-0">
            <button 
              onClick={() => navigate('/add')}
              className="flex-1 xxxs:flex-none bg-white text-[#673AB7] px-1.5 xxxs:px-2 xxs:px-3 xs:py-3 rounded-lg font-semibold text-xxxs xxxs:text-xxs xxs:text-xs xs:text-sm flex items-center justify-center gap-0.5 xxxs:gap-1 xxs:gap-2 hover:bg-opacity-90 transition-all whitespace-nowrap min-h-[1.75rem] xxxs:min-h-[2rem] xxs:min-h-[2.5rem]"
            >
              <span>تسک جدید</span>
              <AddTaskIcon />
            </button>
            
            <button 
              onClick={() => navigate('/categories')}
              className="flex-1 xxxs:flex-none bg-white bg-opacity-20 text-white px-1.5 xxxs:px-2 xxs:px-3 py-0.5 xxxs:py-1 xxs:py-2 rounded-lg font-medium text-xxxs xxxs:text-xxs xxs:text-xs xs:text-sm flex items-center justify-center gap-0.5 xxxs:gap-1 xxs:gap-2 hover:bg-opacity-30 transition-all border border-white border-opacity-30 whitespace-nowrap min-h-[1.75rem]"
            >
              <span>دسته‌بندی‌ها</span>
              <CategoriesIcon />
            </button>
          </div>
        </div>

        {/* اطلاعات آماری - در موبایل‌های بسیار کوچک مخفی */}
        {selectedDate !== null && totalTasks > 0 && (
          <div className="hidden xxxs:flex justify-end mt-1 xxxs:mt-2 xs:mt-3 pt-1 xxxs:pt-2 xs:pt-3 border-t border-white border-opacity-20 mx-0">
            <div className="bg-white bg-opacity-20 px-1.5 xxxs:px-2 xs:px-3 py-0.5 xxxs:py-1 rounded-full text-xxxs xxxs:text-xxs xxs:text-xs">
              {completionPercentage}% تکمیل شده
            </div>
          </div>
        )}
      </div>

      {/* تقویم افقی */}
      <div className="bg-white mx-0 px-4 -mt-1 xxxs:-mt-2 xxs:-mt-3 xs:-mt-4 rounded-lg shadow-lg p-1 xxxs:p-2 xxs:p-3 xs:p-4 z-10 relative w-full">
        <HorizontalCalendar 
          selectedDate={selectedDate} 
          onDateChange={setSelectedDate} 
        />
      </div>

      {/* لیست تسک‌ها */}
      <div className="p-4 w-full mx-0">
        <h2 className="text-xs xxxs:text-sm xxs:text-base xs:text-lg md:text-xl font-bold mb-1 xxxs:mb-2 xxs:mb-3 xs:mb-4 md:mb-6 text-right text-gray-800 truncate mx-0">
          {selectedDate === null 
            ? "همه تسک‌های شما" 
            : isToday(selectedDate) 
              ? "تسک‌های امروز" 
              : `تسک‌های ${toJalaliString(selectedDate)}`
          }
        </h2>
        
        {filteredTasks.length === 0 ? (
          <div className="text-center py-2 xxxs:py-4 xxs:py-6 xs:py-8 mx-0">
            <div className="text-gray-400 mb-1 xxxs:mb-2 xxs:mb-3 xs:mb-4">
              {selectedDate === null ? 
                <ListTodo className="w-8 h-8 xxxs:w-12 xxxs:h-12 xxs:w-16 xxs:h-16 xs:w-20 xs:h-20 md:w-24 md:h-24 mx-auto" /> : 
                isToday(selectedDate) ? 
                <Calendar className="w-8 h-8 xxxs:w-12 xxxs:h-12 xxs:w-16 xxs:h-16 xs:w-20 xs:h-20 md:w-24 md:h-24 mx-auto" /> : 
                <Calendar className="w-8 h-8 xxxs:w-12 xxxs:h-12 xxs:w-16 xxs:h-16 xs:w-20 xs:h-20 md:w-24 md:h-24 mx-auto" />
              }
            </div>
            <p className="text-gray-500 mb-1 xxxs:mb-2 xxs:mb-3 xs:mb-4 text-xxxs xxxs:text-xxs xxs:text-xs xs:text-sm md:text-base px-0.5 xxxs:px-1 xxs:px-2 text-ellipsis-2 mx-0">
              {selectedDate === null 
                ? 'هنوز هیچ تسکی ایجاد نکرده‌اید' 
                : isToday(selectedDate)
                  ? 'هنوز هیچ تسکی برای امروز ندارید' 
                  : `هیچ تسکی برای ${toJalaliString(selectedDate)} ندارید`
              }
            </p>
            <button 
              onClick={() => navigate('/add')}
              className="bg-[#7C4DFF] hover:bg-[#673AB7] text-white px-2 xxxs:px-3 xxs:px-4 xs:px-6 py-0.5 xxxs:py-1 xxs:py-2 rounded-lg font-medium text-xxxs xxxs:text-xxs xxs:text-xs xs:text-sm md:text-base flex items-center justify-center gap-0.5 xxxs:gap-1 xxs:gap-2 mx-auto"
            >
              <span>افزودن تسک جدید</span>
              <AddTaskIcon />
            </button>
          </div>
        ) : (
          <TaskList tasks={filteredTasks} selectedDate={selectedDate} />
        )}
      </div>
    </div>
  );
}