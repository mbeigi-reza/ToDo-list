// C:\Users\Dell\Desktop\ToDo-list\src\components\HomePage\HorizontalCalendar.jsx
import React from 'react';

export default function HorizontalCalendar({ selectedDate, onDateChange }) {
  // لیست ۳۰ روز برای نمایش
  const days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  const getDayName = (date) => {
    const days = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
    return days[date.getDay()];
  };

  const isToday = (date) => {
    return date.toDateString() === new Date().toDateString();
  };

  const isSelected = (date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  return (
    <div className="bg-white p-4 shadow-lg">
      <div className="flex overflow-x-auto space-x-4 space-x-reverse pb-2 scrollbar-hide">
        {days.map((date, index) => (
          <div
            key={index}
            onClick={() => onDateChange(date)}
            className={`min-w-[70px] p-3 rounded-xl text-center cursor-pointer transition-all flex flex-col items-center ${
              isSelected(date)
                ? 'bg-[#673AB7] text-white shadow-lg transform scale-105'
                : isToday(date)
                ? 'bg-[#F3E5F5] text-[#673AB7] border-2 border-[#673AB7]'
                : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
            }`}
          >
            <div className={`text-sm font-medium ${
              isToday(date) && !isSelected(date) ? 'text-[#673AB7]' : ''
            }`}>
              {getDayName(date)}
            </div>
            <div className={`text-lg font-bold mt-1 ${
              isToday(date) && !isSelected(date) ? 'text-[#673AB7]' : ''
            }`}>
              {date.getDate()}
            </div>
            <div className="text-xs mt-1 opacity-70">
              {date.toLocaleDateString('fa-IR', { month: 'short' })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}