// C:\Users\Dell\Desktop\ToDo-list\src\components\HomePage\TaskList.jsx
import React, { useState } from 'react';
import { useTasks } from '../../context/TaskContext';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  Circle, 
  Edit3, 
  Trash2, 
  Save, 
  X,
  Clock,
  Plus
} from 'lucide-react';

export default function TaskList({ tasks, selectedDate }) {
  const { deleteTask, toggleTaskCompletion, updateTask } = useTasks();
  const navigate = useNavigate();
  const [editingTask, setEditingTask] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', description: '' });

  // بارگذاری دسته‌بندی‌ها برای نمایش آیکون و رنگ
  const getCategoryInfo = (categoryValue) => {
    const savedCategories = localStorage.getItem('taskCategories');
    if (savedCategories) {
      const categories = JSON.parse(savedCategories);
      return categories.find(cat => cat.value === categoryValue);
    }
    return null;
  };

  const handleEdit = (task) => {
    setEditingTask(task.id);
    setEditForm({
      title: task.title,
      description: task.description || ''
    });
  };

  const handleSaveEdit = (taskId) => {
    if (editForm.title.trim()) {
      updateTask(taskId, {
        title: editForm.title,
        description: editForm.description
      });
      setEditingTask(null);
      setEditForm({ title: '', description: '' });
    }
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    setEditForm({ title: '', description: '' });
  };

  const handleDelete = (taskId) => {
    if (window.confirm('آیا از حذف این تسک مطمئن هستید؟')) {
      deleteTask(taskId);
    }
  };

  const handleAddTask = () => {
    navigate('/add');
  };

  const formatTime = (timeString) => {
    if (!timeString || timeString === 'ساعت تعیین نشده') return 'بدون زمان';
    return timeString;
  };

  return (
    <div className="space-y-4">
      {tasks.map((task, index) => {
        const categoryInfo = getCategoryInfo(task.category);
        
        return (
          <div 
            key={task.id}
            className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all ${
              task.completed ? 'opacity-70 bg-green-50 border-green-200' : ''
            }`}
          >
            {/* هدر تسک */}
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3 flex-1">
                {/* دکمه تکمیل/عدم تکمیل */}
                <button
                  onClick={() => toggleTaskCompletion(task.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    task.completed 
                      ? 'bg-green-500 border-green-500 text-white' 
                      : 'border-gray-300 hover:border-green-500 hover:bg-green-50'
                  }`}
                  title={task.completed ? 'بازگشت به حالت انجام نشده' : 'علامت به عنوان انجام شده'}
                >
                  {task.completed ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                </button>
                
                {/* عنوان تسک - حالت نمایش یا ویرایش */}
                {editingTask === task.id ? (
                  <div className="flex-1">
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded-lg text-right text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#7C4DFF]"
                      placeholder="عنوان تسک"
                    />
                  </div>
                ) : (
                  <h3 className={`font-semibold text-right text-lg flex-1 ${
                    task.completed ? 'line-through text-gray-500' : 'text-gray-800'
                  }`}>
                    {task.title}
                  </h3>
                )}
              </div>
              
              <div className="flex items-center gap-2 mr-3">
                {/* نمایش دسته‌بندی */}
                {categoryInfo && (
                  <span 
                    className="text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap"
                    style={{ 
                      backgroundColor: categoryInfo.color,
                      color: ['#E1D8F1', '#C5B4E3'].includes(categoryInfo.color) ? '#673AB7' : 'white'
                    }}
                  >
                    {categoryInfo.label}
                  </span>
                )}
              </div>

              {/* منوی اقدامات */}
              <div className="flex items-center gap-1">
                {/* دکمه ویرایش */}
                {editingTask === task.id ? (
                  <>
                    <button
                      onClick={() => handleSaveEdit(task.id)}
                      className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                      title="ذخیره"
                    >
                      <Save className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      title="انصراف"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleEdit(task)}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                    title="ویرایش تسک"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                )}
                
                {/* دکمه حذف */}
                <button
                  onClick={() => handleDelete(task.id)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                  title="حذف تسک"
                  >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* توضیحات تسک - حالت نمایش یا ویرایش */}
            {editingTask === task.id ? (
              <div className="mb-3">
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                  rows="2"
                  className="w-full p-2 border border-gray-300 rounded-lg text-right text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-[#7C4DFF]"
                  placeholder="توضیحات تسک (اختیاری)"
                />
              </div>
            ) : (
              task.description && (
                <p className={`text-gray-600 text-right text-sm leading-6 mb-3 ${
                  task.completed ? 'line-through' : ''
                }`}>
                  {task.description}
                </p>
              )
            )}
            
            {/* اطلاعات پایین تسک */}
            <div className="flex justify-between items-center text-xs text-gray-400">
              <span>
                {task.date ? new Date(task.date).toLocaleDateString('fa-IR') : 'بدون تاریخ'}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatTime(task.time)}
              </span>
            </div>
            
            {/* وضعیت انجام شده */}
            {task.completed && (
              <div className="mt-2 flex items-center justify-end gap-1">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span className="text-green-600 text-xs">انجام شده</span>
                <span className="text-green-600 text-xs">
                  {new Date().toLocaleDateString('fa-IR')}
                </span>
              </div>
            )}
            
            {/* خط جداکننده بین تسک‌ها */}
            {index < tasks.length - 1 && (
              <div className="border-t border-gray-100 mt-4 pt-4">
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>بعدی: {tasks[index + 1]?.title}</span>
                  <span>{formatTime(tasks[index + 1]?.time)}</span>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* دکمه افزودن تسک جدید وقتی لیست خالیه */}
      {tasks.length === 0 && (
        <div className="text-center py-8">
          <button 
            onClick={handleAddTask}
            className="bg-[#7C4DFF] hover:bg-[#673AB7] text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md flex items-center justify-center gap-2 mx-auto"
          >
            <Plus className="w-5 h-5" />
            <span>افزودن اولین تسک</span>
          </button>
        </div>
      )}
    </div>
  );
}