import React from 'react';

export default function HorizontalCalendar({ selectedDate, onDateChange }) {
  // لیست ۳۰ روز برای نمایش
  const days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  return (
    <div className="bg-white p-4 shadow-lg">
      <div className="flex overflow-x-auto space-x-4 space-x-reverse pb-2">
        {days.map((date, index) => (
          <div
            key={index}
            onClick={() => onDateChange(date)}
            className={`min-w-[60px] p-3 rounded-lg text-center cursor-pointer transition-all ${
              date.toDateString() === selectedDate.toDateString()
                ? 'bg-[#673AB7] text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <div className="text-sm">{date.getDate()}</div>
            <div className="text-xs mt-1">
              {['ی', 'د', 'س', 'چ', 'پ', 'ج', 'ش'][date.getDay()]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}