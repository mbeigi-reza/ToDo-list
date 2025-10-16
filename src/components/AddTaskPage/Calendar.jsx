// C:\Users\Dell\Desktop\ToDo-list\src\components\AddTaskPage\Calender.jsx
import React, { useState, useEffect } from "react";

// تبدیل تاریخ میلادی به شمسی (بدون کتابخانه)
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

// برعکسش برای تغییر ماه
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
  const [currentJDate, setCurrentJDate] = useState(toJalali(selectedDate));

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

  const days = getDaysOfMonth(currentJDate.jy, currentJDate.jm);
  const months = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];

  return (
    <div className="w-full mb-4 p-4 border rounded">
      <div className="flex justify-between items-center mb-3">
        <button
          onClick={handlePrevMonth}
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          ◀
        </button>
        <h2 className="text-lg font-semibold">
          {months[currentJDate.jm - 1]} {currentJDate.jy}
        </h2>
        <button
          onClick={handleNextMonth}
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          ▶
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {["ش", "ی", "د", "س", "چ", "پ", "ج"].map((day) => (
          <div key={day} className="font-bold py-1">{day}</div>
        ))}

        {days.map((day, i) => (
          <div
            key={i}
            className={`border h-10 flex items-center justify-center rounded cursor-pointer
              ${
                day === currentJDate.jd
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-100"
              }
            `}
            onClick={() =>
              day &&
              onDateChange(jalaliToGregorian(currentJDate.jy, currentJDate.jm, day))
            }
          >
            {day || ""}
          </div>
        ))}
      </div>
    </div>
  );
}
