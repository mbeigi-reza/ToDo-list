// C:\Users\Dell\Desktop\ToDo-list\src\context\TaskContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  // بارگذاری تسک‌ها از localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // ذخیره تسک‌ها در localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask) => {
    const taskWithId = { 
      id: Date.now(), 
      completed: false,
      ...newTask 
    };
    setTasks(prev => [...prev, taskWithId]);
  };

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <TaskContext.Provider value={{ 
      tasks, 
      addTask, 
      deleteTask, 
      toggleTaskCompletion 
    }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => useContext(TaskContext);