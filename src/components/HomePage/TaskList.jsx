import React from 'react';

export default function TaskList({ selectedDate }) {
  // داده‌های نمونه - باید از state/context بیاد
  const tasks = [
    {
      id: 1,
      title: "Fitness",
      time: "600 - 750",
      description: "Exercise and gym",
      category: "sport"
    },
    // ... سایر تسک‌ها
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-right">تسک‌های من</h2>
      
      <div className="space-y-3">
        {tasks.map(task => (
          <div key={task.id} className="bg-white p-4 rounded-lg shadow border-r-4 border-[#673AB7]">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-right">{task.title}</h3>
              <span className="text-[#673AB7] text-sm bg-[#F8F5FF] px-2 py-1 rounded">
                {task.time}
              </span>
            </div>
            <p className="text-gray-600 text-right text-sm">{task.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}