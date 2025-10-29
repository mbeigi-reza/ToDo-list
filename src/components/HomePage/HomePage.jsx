import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../../context/TaskContext';
import HorizontalCalendar from './HorizontalCalendar';
import TaskList from './TaskList';
import { 
  Plus, 
  FolderOpen,
  Sun,
  Moon,
  CheckCircle2,
  Calendar as CalendarIcon
} from 'lucide-react';

// آیکون‌های SVG بهینه‌شده برای موبایل
const AddTaskIcon = () => <Plus className="w-3 h-3 xxxs:w-3.5 xxxs:h-3.5 xxs:w-4 xxs:h-4" />;
const CategoriesIcon = () => <FolderOpen className="w-3 h-3 xxxs:w-3.5 xxxs:h-3.5 xxs:w-4 xxs:h-4" />;

export default function HomePage() {
  const { tasks } = useTasks();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  // بررسی اولیه تم سیستم
  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true' || 
      (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

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

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 w-full overflow-x-hidden">
      {/* هدر کاملاً رسپانسیو - طراحی جدید */}
      <div className="bg-blue-600 dark:bg-gray-800 text-white pt-4 xxxs:pt-5 xxs:pt-6 xs:pt-7 pb-3 xxxs:pb-4 xxs:pb-5 xs:pb-5 px-3 xxxs:px-4 xxs:px-4 xs:px-4 w-full mx-0 transition-colors duration-300">
        
        {/* ردیف اول: عنوان صفحه و دکمه‌ها */}
        <div className="flex flex-row items-center justify-between gap-2 xxxs:gap-3 xxs:gap-4 mx-0 mb-3 xxxs:mb-4 xxs:mb-4">
          
          {/* عنوان صفحه */}
          <div className="flex-1 min-w-0">
            <h1 className="text-lg xxxs:text-xl xxs:text-2xl xs:text-3xl font-bold truncate text-right">
              {getPageTitle()}
            </h1>
          </div>

          {/* بخش دکمه‌ها */}
          <div className="flex flex-row items-center gap-2 xxxs:gap-3 xxs:gap-4 flex-shrink-0">
            {/* دکمه تغییر تم */}
            <button
              onClick={toggleDarkMode}
              className="text-white hover:bg-white hover:bg-opacity-10 p-2 xxxs:p-2.5 xxs:p-3 rounded-lg transition-all duration-200 flex items-center justify-center"
              title={darkMode ? 'تغییر به حالت روشن' : 'تغییر به حالت تاریک'}
            >
              {darkMode ? 
                <Sun className="w-4 h-4 xxxs:w-5 xxxs:h-5 xxs:w-6 xxs:h-6" /> : 
                <Moon className="w-4 h-4 xxxs:w-5 xxxs:h-5 xxs:w-6 xxs:h-6" />
              }
            </button>
            
            {/* دکمه دسته‌بندی‌ها */}
            <button 
              onClick={() => navigate('/categories')}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 dark:bg-gray-700 dark:hover:bg-gray-600 text-white px-3 xxxs:px-4 xxs:px-5 py-2 xxxs:py-2.5 xxs:py-3 rounded-lg font-medium text-xs xxxs:text-sm xxs:text-base transition-all duration-200 whitespace-nowrap flex items-center justify-center gap-2 xxxs:gap-2.5 xxs:gap-3 shadow-md hover:shadow-lg"
            >
              <CategoriesIcon />
              <span className="hidden xxs:inline">دسته‌بندی‌ها</span>
            </button>
            
            {/* دکمه تسک جدید */}
            <button 
              onClick={() => navigate('/add')}
              className="bg-white hover:bg-gray-100 dark:bg-gray-100 dark:hover:bg-gray-200 text-blue-600 dark:text-gray-800 px-3 xxxs:px-4 xxs:px-5 py-2 xxxs:py-2.5 xxs:py-3 rounded-lg font-semibold text-xs xxxs:text-sm xxs:text-base transition-all duration-200 whitespace-nowrap flex items-center justify-center gap-2 xxxs:gap-2.5 xxs:gap-3 shadow-md hover:shadow-lg"
            >
              <AddTaskIcon />
              <span>تسک جدید</span>
            </button>
          </div>
        </div>

        {/* ردیف دوم: اطلاعات آماری و تاریخ */}
        <div className="flex flex-col xxxs:flex-row xxxs:items-center xxxs:justify-between gap-2 xxxs:gap-4 xxs:gap-5">
          
          {/* بخش اطلاعات آماری */}
          <div className="flex items-center gap-3 xxxs:gap-4 xxs:gap-5 bg-white bg-opacity-15 dark:bg-gray-700 px-3 xxxs:px-4 xxs:px-4 py-2 xxxs:py-2.5 xxs:py-3 rounded-2xl flex-1 min-w-0">
            
            {/* تعداد تسک‌ها */}
            <div className="flex items-center gap-2 xxxs:gap-2.5 flex-1 min-w-0">
              <CalendarIcon className="w-4 h-4 xxxs:w-5 xxxs:h-5 xxs:w-6 xxs:h-6 text-blue-200 flex-shrink-0" />
              <div className="min-w-0">
                <div className="text-xxxs xxxs:text-xxs xxs:text-xs xs:text-sm font-medium text-blue-100">
                  کل تسک‌ها
                </div>
                <div className="text-sm xxxs:text-base xxs:text-lg xs:text-xl font-bold truncate">
                  {totalTasks} تسک
                </div>
              </div>
            </div>

            {/* جداکننده */}
            <div className="w-px h-8 xxxs:h-10 xxs:h-12 bg-white bg-opacity-30"></div>

            {/* تسک‌های انجام شده */}
            <div className="flex items-center gap-2 xxxs:gap-2.5 flex-1 min-w-0">
              <CheckCircle2 className="w-4 h-4 xxxs:w-5 xxxs:h-5 xxs:w-6 xxs:h-6 text-green-300 flex-shrink-0" />
              <div className="min-w-0">
                <div className="text-xxxs xxxs:text-xxs xxs:text-xs xs:text-sm font-medium text-green-200">
                  انجام شده
                </div>
                <div className="text-sm xxxs:text-base xxs:text-lg xs:text-xl font-bold truncate">
                  {completedTasks} تسک
                </div>
              </div>
            </div>

            {/* جداکننده */}
            <div className="w-px h-8 xxxs:h-10 xxs:h-12 bg-white bg-opacity-30"></div>

            {/* درصد پیشرفت */}
            <div className="flex items-center gap-2 xxxs:gap-2.5 flex-1 min-w-0">
              <div className="flex-shrink-0">
                <div className="text-xxxs xxxs:text-xxs xxs:text-xs xs:text-sm font-medium text-white opacity-90">
                  پیشرفت
                </div>
                <div className="text-sm xxxs:text-base xxs:text-lg xs:text-xl font-bold">
                  {completionPercentage}%
                </div>
              </div>
              {/* نوار پیشرفت */}
              {totalTasks > 0 && (
                <div className="bg-white bg-opacity-20 dark:bg-gray-600 rounded-full h-2 xxxs:h-2.5 xxs:h-3 w-12 xxxs:w-16 xxs:w-20 xs:w-24 transition-colors duration-300">
                  <div 
                    className="bg-green-400 h-2 xxxs:h-2.5 xxs:h-3 rounded-full transition-all duration-500"
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>
              )}
            </div>
          </div>

          {/* بخش تاریخ و روز هفته */}
          {selectedDate !== null && (
            <div className="bg-white bg-opacity-15 dark:bg-gray-700 px-3 xxxs:px-4 xxs:px-4 py-2 xxxs:py-2.5 xxs:py-3 rounded-2xl flex-shrink-0">
              <div className="text-center">
                <div className="text-xxxs xxxs:text-xxs xxs:text-xs xs:text-sm font-medium text-white opacity-90">
                  {getDayName(selectedDate)}
                </div>
                <div className="text-sm xxxs:text-base xxs:text-lg xs:text-xl font-bold">
                  {toJalaliString(selectedDate)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* تقویم افقی */}
      <div className="bg-white dark:bg-gray-800 mx-0 px-3 xxxs:px-4 xxs:px-4 xs:px-4 -mt-2 xxxs:-mt-3 xxs:-mt-4 xs:-mt-5 rounded-lg shadow-lg p-2 xxxs:p-3 xxs:p-4 xs:p-4 z-10 relative w-full transition-colors duration-300">
        <HorizontalCalendar 
          selectedDate={selectedDate} 
          onDateChange={setSelectedDate} 
        />
      </div>

      {/* لیست تسک‌ها */}
      <div className="p-3 xxxs:p-4 xxs:p-4 xs:p-4 w-full mx-0">
        <h2 className="text-xs xxxs:text-sm xxs:text-base xs:text-lg md:text-xl font-bold mb-2 xxxs:mb-3 xxs:mb-4 xs:mb-5 md:mb-6 text-right text-gray-800 dark:text-gray-200 truncate mx-0 transition-colors duration-300">
          {selectedDate === null 
            ? "همه تسک‌های شما" 
            : isToday(selectedDate) 
              ? "تسک‌های امروز" 
              : `تسک‌های ${toJalaliString(selectedDate)}`
          }
        </h2>
        
        {filteredTasks.length === 0 ? (
          <div className="text-center py-4 xxxs:py-6 xxs:py-8 xs:py-10 mx-0">
            <div className="text-gray-400 dark:text-gray-600 mb-2 xxxs:mb-3 xxs:mb-4 xs:mb-5 transition-colors duration-300">
              <CalendarIcon className="w-12 h-12 xxxs:w-16 xxxs:h-16 xxs:w-20 xxs:h-20 xs:w-24 xs:h-24 md:w-28 md:h-28 mx-auto" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 mb-3 xxxs:mb-4 xxs:mb-5 xs:mb-6 text-sm xxxs:text-base xxs:text-lg xs:text-xl md:text-2xl px-2 xxxs:px-3 xxs:px-4 text-ellipsis-2 mx-0 transition-colors duration-300">
              {selectedDate === null 
                ? 'هنوز هیچ تسکی ایجاد نکرده‌اید' 
                : isToday(selectedDate)
                  ? 'هنوز هیچ تسکی برای امروز ندارید' 
                  : `هیچ تسکی برای ${toJalaliString(selectedDate)} ندارید`
              }
            </p>
            <button 
              onClick={() => navigate('/add')}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-4 xxxs:px-5 xxs:px-6 xs:px-8 py-2 xxxs:py-2.5 xxs:py-3 xs:py-3 rounded-lg font-medium text-sm xxxs:text-base xxs:text-lg xs:text-xl md:text-2xl flex items-center justify-center gap-2 xxxs:gap-2.5 xxs:gap-3 mx-auto transition-colors duration-300"
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