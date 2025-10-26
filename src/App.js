import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import HomePage from './components/HomePage/HomePage';
import AddTaskPage from './components/AddTaskPage/AddTaskPage';
import CategoryManager from './components/AddTaskPage/CategoryManager/CategoryManager';
import './App.css';

function App() {
  return (
    <TaskProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add" element={<AddTaskPage />} />
            <Route path="/categories" element={<CategoryManager />} />
          </Routes>
        </div>
      </Router>
    </TaskProvider>
  );
}

export default App;