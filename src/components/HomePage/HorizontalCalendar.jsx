import React, { useState, useEffect, useRef } from 'react';

// تابع تشخیص کبیسه بودن سال شمسی
function isJalaliLeapYear(jy) {
  const mod = jy % 33;
  return [1, 5, 9, 13, 17, 22, 26, 30].includes(mod);
}

// تبدیل میلادی به شمسی
function toJalali(gDate) {
  const gy = gDate.getFullYear();
  const gm = gDate.getMonth() + 1;
  const gd = gDate.getDate();

  const g_d_m = [0, 31, (gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0 ? 29 : 28,
    31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
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

  const j_month_days = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, isJalaliLeapYear(jy) ? 30 : 29];
  let jm;
  for (jm = 0; jm < 11 && j_day_no >= j_month_days[jm]; ++jm) {
    j_day_no -= j_month_days[jm];
  }
  const jd = j_day_no + 1;

  return { jy, jm: jm + 1, jd };
}

// تبدیل شمسی به میلادی
function jalaliToGregorian(jy, jm, jd) {
  const isLeap = isJalaliLeapYear(jy);
  jy -= 979;
  let j_day_no = 365 * jy + Math.floor(jy / 33) * 8 + Math.floor((jy % 33 + 3) / 4);

  const j_month_days = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, isLeap ? 30 : 29];
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
  // 🔥 همیشه آبان ۱۴۰۳
  const [currentMonth, setCurrentMonth] = useState({ jy: 1403, jm: 8 });

  const [days, setDays] = useState([]);
  const scrollContainerRef = useRef(null);

  // تولید روزهای دقیق ماه
  useEffect(() => {
    const generateDays = () => {
      const isLeap = isJalaliLeapYear(currentMonth.jy);
      const monthDays =
        currentMonth.jm <= 6 ? 31 :
        currentMonth.jm <= 11 ? 30 :
        isLeap ? 30 : 29;

      const daysArray = [];
      for (let d = 1; d <= monthDays; d++) {
        const gregorianDate = jalaliToGregorian(currentMonth.jy, currentMonth.jm, d);
        daysArray.push({ date: gregorianDate, dayNumber: d });
      }

      setDays(daysArray);
    };

    generateDays();
  }, [currentMonth]);

  // انتخاب و اسکرول به امروز
  useEffect(() => {
    const today = new Date();
    onDateChange(today);

    setTimeout(() => {
      if (scrollContainerRef.current) {
        const todayElement = scrollContainerRef.current.querySelector('[data-today="true"]');
        if (todayElement) {
          todayElement.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
          });
        }
      }
    }, 100);
  }, [onDateChange]);

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
    <div className="bg-white dark:bg-gray-800 p-1 xxxs:p-2 xxs:p-3 xs:p-4 shadow-lg rounded-lg w-full mx-0 px-0 transition-colors duration-300">
      {/* کنترل ماه */}
      <div className="flex justify-between items-center mb-1 xxxs:mb-2 xxs:mb-3 xs:mb-4 w-full mx-0 px-0">
        <button
          onClick={handleNextMonth}
          className="px-1.5 xxxs:px-2 xxs:px-3 xs:px-4 py-0.5 xxxs:py-1 xxs:py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-300 flex items-center gap-0.5 xxxs:gap-1 xxs:gap-2 text-xxxs xxxs:text-xxs xxs:text-xs xs:text-sm"
        >
          <span className="hidden xxxs:inline">ماه بعد</span>
          <span className="text-xxxs xxxs:text-xxs">▶</span>
        </button>

        <div className="text-xxxs xxxs:text-xs xxs:text-sm xs:text-base md:text-lg font-semibold text-gray-800 dark:text-gray-200 text-center px-0.5 xxxs:px-1 transition-colors duration-300">
          <div className="text-xxxs xxxs:text-xxs xxs:text-xs xs:text-sm">{months[currentMonth.jm - 1]}</div>
          <div className="text-xxxs xxxs:text-xxs xxs:text-xs xs:text-sm">{currentMonth.jy}</div>
          {/* 🔥 "ماه جاری" حذف شد */}
        </div>

        <button
          onClick={handlePrevMonth}
          className="px-1.5 xxxs:px-2 xxs:px-3 xs:px-4 py-0.5 xxxs:py-1 xxs:py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-300 flex items-center gap-0.5 xxxs:gap-1 xxs:gap-2 text-xxxs xxxs:text-xxs xxs:text-xs xs:text-sm"
        >
          <span className="text-xxxs xxxs:text-xxs">◀</span>
          <span className="hidden xxxs:inline">ماه قبل</span>
        </button>
      </div>

      {/* روزها */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-0.5 xxxs:gap-1 xxs:gap-2 pb-0.5 xxxs:pb-1 xxs:pb-2 scrollbar-hide w-full mx-0 px-0"
        style={{ 
          scrollBehavior: 'smooth', 
          direction: 'ltr'
        }}
      >
        {/* همه تسک‌ها */}
        <div
          onClick={handleShowAllTasks}
          className={`
            min-w-[35px] xxxs:min-w-[40px] xxs:min-w-[50px] xs:min-w-[60px] md:min-w-[80px] 
            p-0.5 xxxs:p-1 xxs:p-2 xs:p-3 rounded-xl text-center cursor-pointer transition-all 
            flex flex-col items-center justify-center border-2 flex-shrink-0
            ${isAllTasksSelected
              ? 'bg-blue-600 text-white shadow-lg transform scale-105 border-blue-600'
              : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
            }
          `}
        >
          <div className="text-xs xxxs:text-sm xxs:text-base xs:text-lg mb-0.5">📋</div>
          <div className="text-[7px] xxxs:text-[8px] xxs:text-[9px] xs:text-[10px] md:text-xs font-medium whitespace-nowrap">
            همه تسک‌ها
          </div>
        </div>

        {/* روزهای ماه */}
        {days.map((dayObj, index) => {
          const { date, dayNumber } = dayObj;
          const today = isToday(date);
          const selected = isSelected(date);

          return (
            <div
              key={index}
              onClick={() => onDateChange(date)}
              data-today={today}
              className={`
                min-w-[25px] xxxs:min-w-[28px] xxs:min-w-[35px] xs:min-w-[45px] md:min-w-[60px] 
                p-0.5 xxxs:p-1 xxs:p-2 rounded-xl text-center cursor-pointer transition-all 
                flex flex-col items-center justify-center border-2 flex-shrink-0
                ${selected
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105 border-blue-600'
                  : today
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-blue-600 dark:border-blue-500'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }
              `}
            >
              <div className={`text-[7px] xxxs:text-[8px] xxs:text-[9px] xs:text-[10px] md:text-xs font-medium ${
                today && !selected ? 'text-blue-700 dark:text-blue-300' : ''
              }`}>
                {getDayName(date)}
              </div>
              <div className={`text-[10px] xxxs:text-xs xxs:text-sm xs:text-base md:text-base font-bold mt-0.5 ${
                today && !selected ? 'text-blue-700 dark:text-blue-300' : ''
              }`}>
                {dayNumber}
              </div>
              <div className="text-[5px] xxxs:text-[6px] xxs:text-[7px] xs:text-[8px] md:text-[10px] mt-0.5 opacity-70">
                {date.toLocaleDateString('fa-IR', { month: 'short' })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}