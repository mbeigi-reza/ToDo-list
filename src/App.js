// C:\Users\Dell\Desktop\ToDo-list\src\App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import HomePage from './components/HomePage/HomePage';
import AddTaskPage from './components/AddTaskPage/AddTaskPage';
import CategoryManager from './components/AddTaskPage/CategoryManager/CategoryManager';
import './App.css';

function App() {
  return (
    <TaskProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddTaskPage />} />
          <Route path="/categories" element={<CategoryManager />} />
        </Routes>
      </BrowserRouter>
    </TaskProvider>
  );
}

export default App;