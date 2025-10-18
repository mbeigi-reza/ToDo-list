import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();

  // داده‌های نمونه مطابق عکس
  const tasks = [
    {
      id: 1,
      title: "Fitness",
      time: "600 - 750",
      description: "Exercise and gym"
    },
    {
      id: 2,
      title: "Check Emails and sms",
      time: "700 - 800", 
      description: "Review and respond to emails and gwls"
    },
    {
      id: 3,
      title: "Work on Projects",
      time: "800 - 1000",
      description: "Focus on all the tasks related to Project"
    },
    {
      id: 4,
      title: "Attempt Meeting", 
      time: "1000 - 1500",
      description: "From meeting until the start ADC"
    },
    {
      id: 5,
      title: "Work of XYZ",
      time: "1500 - 1500",
      description: "Change theme and ideas in XYZ"
    },
    {
      id: 6,
      title: "Lunch Break",
      time: "1500 - 1400",
      description: "Empty a healthy lunch and take some rest"
    }
  ];

  // تاریخ شمسی نمونه
  const jalaliDate = "۱۴۰۳/۰۷/۲۷";
  const dayName = "شنبه";
  const time = "۱۰:۴۵ ق.ظ";

  return (
    <div className="min-h-screen bg-white">
      {/* 🔥 هدر بنفش - درازتر شده */}
      <div className="bg-[#673AB7] text-white pt-12 pb-8 px-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Today</h1>
            <p className="text-lg opacity-90">6 Tasks</p>
          </div>
          <button 
            onClick={() => navigate('/add')}
            className="bg-white text-[#673AB7] px-4 py-2 rounded-lg font-semibold text-sm"
          >
            + Add Task
          </button>
        </div>
        
        {/* تاریخ و ساعت شمسی */}
        <div className="text-center">
          <div className="text-2xl font-bold mb-1">{jalaliDate}</div>
          <div className="text-lg opacity-90">{dayName} - {time}</div>
        </div>
      </div>

      {/* 📅 تقویم افقی */}
      <div className="bg-white mx-4 -mt-6 rounded-lg shadow-lg p-4 z-10 relative">
        <div className="flex overflow-x-auto space-x-3 space-x-reverse pb-2 scrollbar-hide">
          {Array.from({ length: 30 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() + i);
            const isToday = i === 0;
            const isSelected = i === 0; // امروز انتخاب شده
            
            return (
              <div
                key={i}
                onClick={() => setSelectedDate(date)}
                className={`min-w-[50px] p-3 rounded-xl text-center flex flex-col items-center cursor-pointer transition-all ${
                  isSelected 
                    ? 'bg-[#673AB7] text-white shadow-md' 
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className={`text-sm font-medium ${
                  isToday ? 'text-[#673AB7]' : 'text-gray-500'
                } ${isSelected && 'text-white'}`}>
                  {['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'][date.getDay()]}
                </div>
                <div className={`text-lg font-bold mt-1 ${
                  isToday && !isSelected ? 'text-[#673AB7]' : ''
                }`}>
                  {date.getDate()}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 📝 لیست تسک‌ها */}
      <div className="p-6">
        <h2 className="text-xl font-bold mb-6 text-right text-gray-800">My Tasks</h2>
        
        <div className="space-y-4">
          {tasks.map((task, index) => (
            <div 
              key={task.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-800 text-right text-lg">
                  {task.title}
                </h3>
                <span className="text-[#673AB7] text-sm bg-[#F3E5F5] px-3 py-1 rounded-full font-medium whitespace-nowrap">
                  {task.time}
                </span>
              </div>
              <p className="text-gray-600 text-right text-sm leading-6">
                {task.description}
              </p>
              
              {/* خط جداکننده بین تسک‌ها */}
              {index < tasks.length - 1 && (
                <div className="border-t border-gray-100 mt-4 pt-4">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>Next: {tasks[index + 1]?.title}</span>
                    <span>{tasks[index + 1]?.time}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}