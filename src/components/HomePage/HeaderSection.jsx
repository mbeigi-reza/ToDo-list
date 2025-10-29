import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HeaderSection() {
  const navigate = useNavigate();
  
  const handleAddTask = () => {
    navigate('/add');
  };

  return (
    <div className="h-[30vh] bg-[#3B82F6] dark:bg-gray-800 text-white p-6 w-full transition-colors duration-300">
      <div className="flex justify-between items-center mb-4 w-full">
        <div className="w-full">
          <h1 className="text-2xl font-bold">امروز</h1>
          <p className="text-lg opacity-90">۶ تسک</p>
        </div>
        <button 
          onClick={handleAddTask}
          className="bg-white text-[#3B82F6] dark:bg-gray-100 dark:text-gray-800 p-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300"
        >
          + افزودن تسک
        </button>
      </div>
      
      {/* نمایش تاریخ و ساعت شمسی */}
      <div className="text-center w-full">
        <div className="text-3xl font-bold">۱۴۰۳/۰۷/۲۷</div>
        <div className="text-lg opacity-90">شنبه - ۱۰:۴۵ ق.ظ</div>
      </div>
    </div>
  );
}