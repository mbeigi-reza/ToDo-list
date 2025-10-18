import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import AddTaskPage from './components/AddTaskPage/AddTaskPage';
// حذف این خط
// import CategorySelect from './components/CategorySelect/CategorySelect';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddTaskPage />} />
        {/* اگر نیاز به صفحه جداگانه دسته‌بندی داری، کامپوننتش رو بساز */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;