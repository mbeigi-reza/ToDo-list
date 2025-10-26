// C:\Users\Dell\Desktop\ToDo-list\src\components\AddTaskPage\Calendar.jsx
import React, { useState, useEffect } from "react";

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

export default function JalaliCalendar({ selectedDate, onDateChange }) {
  // تنظیم تاریخ امروز به صورت پیش‌فرض
  const [currentJDate, setCurrentJDate] = useState(() => {
    const today = new Date();
    return toJalali(today);
  });

  // وقتی کامپوننت mount شد، تاریخ امروز رو انتخاب کن
  useEffect(() => {
    const today = new Date();
    onDateChange(today);
  }, []);

  const getDaysOfMonth = (jy, jm) => {
    const monthDays = jm <= 6 ? 31 : jm <= 11 ? 30 : 29;
    const firstDay = jalaliToGregorian(jy, jm, 1).getDay(); // 0=یکشنبه
    const days = [];

    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= monthDays; d++) days.push(d);

    return days;
  };

  const handlePrevMonth = () => {
    let { jy, jm } = currentJDate;
    jm--;
    if (jm < 1) {
      jm = 12;
      jy--;
    }
    setCurrentJDate({ jy, jm, jd: 1 });
  };

  const handleNextMonth = () => {
    let { jy, jm } = currentJDate;
    jm++;
    if (jm > 12) {
      jm = 1;
      jy++;
    }
    setCurrentJDate({ jy, jm, jd: 1 });
  };

  // بررسی آیا تاریخ قابل انتخاب است (امروز یا آینده)
  const isDateSelectable = (day) => {
    if (!day) return false;
    
    const selectedGregorian = jalaliToGregorian(currentJDate.jy, currentJDate.jm, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    selectedGregorian.setHours(0, 0, 0, 0);
    
    return selectedGregorian >= today;
  };

  // بررسی آیا تاریخ امروز است
  const isToday = (day) => {
    if (!day) return false;
    
    const selectedGregorian = jalaliToGregorian(currentJDate.jy, currentJDate.jm, day);
    const today = new Date();
    
    return (
      selectedGregorian.getDate() === today.getDate() &&
      selectedGregorian.getMonth() === today.getMonth() &&
      selectedGregorian.getFullYear() === today.getFullYear()
    );
  };

  // بررسی آیا تاریخ انتخاب شده است
  const isSelected = (day) => {
    if (!day) return false;
    
    const selectedGregorian = jalaliToGregorian(currentJDate.jy, currentJDate.jm, day);
    return selectedGregorian.toDateString() === selectedDate.toDateString();
  };

  const days = getDaysOfMonth(currentJDate.jy, currentJDate.jm);
  const months = [
    "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
    "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
  ];

  return (
    <div className="w-full mb-4 p-4 border rounded-lg bg-white shadow-sm">
      <div className="flex justify-between items-center mb-4">
        {/* دکمه ماه قبل - سمت راست */}
        <button
          onClick={handleNextMonth}
          className="px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-gray-700"
        >
          ▶
        </button>
        
        <h2 className="text-lg font-semibold text-gray-800">
          {months[currentJDate.jm - 1]} {currentJDate.jy}
        </h2>
        
        {/* دکمه ماه بعد - سمت چپ */}
        <button
          onClick={handlePrevMonth}
          className="px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-gray-700"
        >
          ◀
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center">
        {["ش", "ی", "د", "س", "چ", "پ", "ج"].map((day) => (
          <div key={day} className="font-bold py-2 text-gray-600 text-sm">{day}</div>
        ))}

        {days.map((day, i) => {
          const selectable = isDateSelectable(day);
          const today = isToday(day);
          const selected = isSelected(day);
          
          return (
            <div
              key={i}
              className={`
                border h-10 flex items-center justify-center rounded-lg cursor-pointer transition-all relative
                ${!day ? 'invisible' : ''}
                ${!selectable ? 
                  'bg-gray-100 text-gray-400 cursor-not-allowed' : 
                  selected ? 
                    'bg-[#7C4DFF] text-white shadow-lg transform scale-105' : 
                    today ? 
                      'bg-[#E1D8F1] text-[#673AB7] border-2 border-[#673AB7]' : 
                      'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                }
              `}
              onClick={() => selectable && day && onDateChange(jalaliToGregorian(currentJDate.jy, currentJDate.jm, day))}
            >
              {day || ""}
              {today && !selected && (
                <div className="absolute bottom-1 w-1 h-1 bg-[#673AB7] rounded-full"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}