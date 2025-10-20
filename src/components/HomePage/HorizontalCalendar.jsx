// C:\Users\Dell\Desktop\ToDo-list\src\components\HomePage\HorizontalCalendar.jsx
import React, { useState, useEffect } from 'react';

// توابع تبدیل تاریخ (همان کد قبلی)
function toJalali(gDate) {
  const gy = gDate.getFullYear();
  const gm = gDate.getMonth() + 1;
  const gd = gDate.getDate();

  const g_d_m = [0, 31, (gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let gy2 = gy - 1600;
  let gm2 = gm - 1;
  let gd2 = gd - 1;

  let g_day_no =
    365 * gy2 +
    Math.floor((gy2 + 3) / 4) -
    Math.floor((gy2 + 99) / 100) +
    Math.floor((gy2 + 399) / 400);

  for (let i = 0; i < gm2; ++i) g_day_no += g_d_m[i];
  g_day_no += gd2;

  let j_day_no = g_day_no - 79;
  let j_np = Math.floor(j_day_no / 12053);
  j_day_no = j_day_no % 12053;

  let jy = 979 + 33 * j_np + 4 * Math.floor(j_day_no / 1461);
  j_day_no %= 1461;

  if (j_day_no >= 366) {
    jy += Math.floor((j_day_no - 1) / 365);
    j_day_no = (j_day_no - 1) % 365;
  }

  const j_month_days = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
  let jm;
  for (jm = 0; jm < 11 && j_day_no >= j_month_days[jm]; ++jm) {
    j_day_no -= j_month_days[jm];
  }
  const jd = j_day_no + 1;

  return { jy, jm: jm + 1, jd };
}

function jalaliToGregorian(jy, jm, jd) {
  jy -= 979;
  let j_day_no =
    365 * jy + Math.floor(jy / 33) * 8 + Math.floor((jy % 33 + 3) / 4);

  const j_month_days = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
  for (let i = 0; i < jm - 1; ++i) j_day_no += j_month_days[i];
  j_day_no += jd - 1;

  let g_day_no = j_day_no + 79;

  let gy = 1600 + 400 * Math.floor(g_day_no / 146097);
  g_day_no = g_day_no % 146097;

  let leap = true;
  if (g_day_no >= 36525) {
    g_day_no--;
    gy += 100 * Math.floor(g_day_no / 36524);
    g_day_no = g_day_no % 36524;

    if (g_day_no >= 365) g_day_no++;
    else leap = false;
  }

  gy += 4 * Math.floor(g_day_no / 1461);
  g_day_no %= 1461;

  if (g_day_no >= 366) {
    leap = false;
    g_day_no--;
    gy += Math.floor(g_day_no / 365);
    g_day_no = g_day_no % 365;
  }

  const g_month_days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let gm;
  for (gm = 0; gm < 12 && g_day_no >= g_month_days[gm]; ++gm) {
    g_day_no -= g_month_days[gm];
  }
  const gd = g_day_no + 1;

  return new Date(gy, gm, gd);
}

export default function HorizontalCalendar({ selectedDate, onDateChange }) {
  const [currentMonth, setCurrentMonth] = useState({ jy: 1404, jm: 7 }); // مهر 1404
  const [days, setDays] = useState([]);

  // تولید روزهای ماه جاری
  useEffect(() => {
    const generateDays = () => {
      const monthDays = currentMonth.jm <= 6 ? 31 : currentMonth.jm <= 11 ? 30 : 29;
      const daysArray = [];
      
      for (let d = 1; d <= monthDays; d++) {
        const gregorianDate = jalaliToGregorian(currentMonth.jy, currentMonth.jm, d);
        daysArray.push(gregorianDate);
      }
      
      setDays(daysArray);
    };

    generateDays();
  }, [currentMonth]);

  const handlePrevMonth = () => {
    setCurrentMonth(prev => {
      let { jy, jm } = prev;
      jm--;
      if (jm < 1) {
        jm = 12;
        jy--;
      }
      return { jy, jm };
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => {
      let { jy, jm } = prev;
      jm++;
      if (jm > 12) {
        jm = 1;
        jy++;
      }
      
      // محدودیت تا سال 1410
      if (jy > 1410) {
        return prev;
      }
      
      return { jy, jm };
    });
  };

  const getDayName = (date) => {
    const days = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
    return days[date.getDay()];
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date) => {
    if (!selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const handleShowAllTasks = () => {
    onDateChange(null);
  };

  const isAllTasksSelected = selectedDate === null;

  const months = [
    "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
    "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
  ];

  return (
    <div className="bg-white p-4 shadow-lg">
      {/* کنترل‌های ماه */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePrevMonth}
          disabled={currentMonth.jy === 1404 && currentMonth.jm === 1}
          className="px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ◀ ماه قبل
        </button>
        
        <h3 className="text-lg font-semibold text-gray-800">
          {months[currentMonth.jm - 1]} {currentMonth.jy}
        </h3>
        
        <button
          onClick={handleNextMonth}
          disabled={currentMonth.jy === 1410 && currentMonth.jm === 12}
          className="px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ماه بعد ▶
        </button>
      </div>

      {/* لیست روزها */}
      <div className="flex overflow-x-auto space-x-2 space-x-reverse pb-2 scrollbar-hide">
        {/* گزینه نمایش همه تسک‌ها */}
        <div
          onClick={handleShowAllTasks}
          className={`
            min-w-[80px] p-3 rounded-xl text-center cursor-pointer transition-all flex flex-col items-center justify-center border-2 flex-shrink-0
            ${isAllTasksSelected 
              ? 'bg-[#673AB7] text-white shadow-lg transform scale-105 border-[#673AB7]' 
              : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200 hover:border-gray-300'
            }
          `}
        >
          <div className="text-lg mb-1">📋</div>
          <div className="text-xs font-medium whitespace-nowrap">همه تسک‌ها</div>
        </div>

        {/* روزهای ماه */}
        {days.map((date, index) => (
          <div
            key={index}
            onClick={() => onDateChange(date)}
            className={`
              min-w-[60px] p-2 rounded-xl text-center cursor-pointer transition-all flex flex-col items-center justify-center border-2 flex-shrink-0
              ${isSelected(date)
                ? 'bg-[#673AB7] text-white shadow-lg transform scale-105 border-[#673AB7]'
                : isToday(date)
                ? 'bg-[#E1D8F1] text-[#673AB7] border-[#673AB7]'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
              }
            `}
          >
            <div className={`text-xs font-medium ${
              isToday(date) && !isSelected(date) ? 'text-[#673AB7]' : ''
            }`}>
              {getDayName(date)}
            </div>
            <div className={`text-base font-bold mt-1 ${
              isToday(date) && !isSelected(date) ? 'text-[#673AB7]' : ''
            }`}>
              {date.getDate()}
            </div>
            <div className="text-[10px] mt-1 opacity-70">
              {date.toLocaleDateString('fa-IR', { month: 'short' })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}