import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HeaderSection() {
  const navigate = useNavigate();
  
  const handleAddTask = () => {
    navigate('/add');
  };

  return (
    <div className="h-[30vh] bg-[#673AB7] text-white p-6 w-full"> {/* ✅ تغییر اینجا */}
      <div className="flex justify-between items-center mb-4 w-full"> {/* ✅ تغییر اینجا */}
        <div className="w-full"> {/* ✅ تغییر اینجا */}
          <h1 className="text-2xl font-bold">امروز</h1>
          <p className="text-lg">۶ تسک</p>
        </div>
        <button 
          onClick={handleAddTask}
          className="bg-white text-[#673AB7] p-3 rounded-lg font-semibold"
        >
          + افزودن تسک
        </button>
      </div>
      
      {/* نمایش تاریخ و ساعت شمسی */}
      <div className="text-center w-full"> {/* ✅ تغییر اینجا */}
        <div className="text-3xl font-bold">۱۴۰۳/۰۷/۲۷</div>
        <div className="text-lg">شنبه - ۱۰:۴۵ ق.ظ</div>
      </div>
    </div>
  );
}