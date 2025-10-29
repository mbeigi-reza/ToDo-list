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
    <div className="space-y-4 w-full">
      {tasks.map((task, index) => {
        const categoryInfo = getCategoryInfo(task.category);
        
        return (
          <div 
            key={task.id}
            className={`bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 hover:shadow-md transition-all w-full ${
              task.completed ? 'opacity-70 bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-700' : ''
            }`}
          >
            {/* هدر تسک */}
            <div className="flex justify-between items-start mb-3 w-full">
              <div className="flex items-center gap-3 flex-1 w-full">
                {/* دکمه تکمیل/عدم تکمیل */}
                <button
                  onClick={() => toggleTaskCompletion(task.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    task.completed 
                      ? 'bg-green-500 border-green-500 text-white' 
                      : 'border-gray-300 dark:border-gray-600 hover:border-green-500 dark:hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900'
                  }`}
                  title={task.completed ? 'بازگشت به حالت انجام نشده' : 'علامت به عنوان انجام شده'}
                >
                  {task.completed ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                </button>
                
                {/* عنوان تسک - حالت نمایش یا ویرایش */}
                {editingTask === task.id ? (
                  <div className="flex-1 w-full">
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg text-right text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                      placeholder="عنوان تسک"
                    />
                  </div>
                ) : (
                  <h3 className={`font-semibold text-right text-lg flex-1 w-full ${
                    task.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-gray-200'
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
                      color: ['#E1D8F1', '#C5B4E3'].includes(categoryInfo.color) ? '#3B82F6' : 'white'
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
                      className="p-2 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-800 rounded-lg transition-colors"
                      title="ذخیره"
                    >
                      <Save className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      title="انصراف"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleEdit(task)}
                    className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800 rounded-lg transition-colors"
                    title="ویرایش تسک"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                )}
                
                {/* دکمه حذف */}
                <button
                  onClick={() => handleDelete(task.id)}
                  className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-800 rounded-lg transition-colors"
                  title="حذف تسک"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* توضیحات تسک - حالت نمایش یا ویرایش */}
            {editingTask === task.id ? (
              <div className="mb-3 w-full">
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                  rows="2"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg text-right text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  placeholder="توضیحات تسک (اختیاری)"
                />
              </div>
            ) : (
              task.description && (
                <p className={`text-gray-600 dark:text-gray-400 text-right text-sm leading-6 mb-3 w-full ${
                  task.completed ? 'line-through' : ''
                }`}>
                  {task.description}
                </p>
              )
            )}
            
            {/* اطلاعات پایین تسک */}
            <div className="flex justify-between items-center text-xs text-gray-400 dark:text-gray-500 w-full">
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
              <div className="mt-2 flex items-center justify-end gap-1 w-full">
                <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span className="text-green-600 dark:text-green-400 text-xs">انجام شده</span>
                <span className="text-green-600 dark:text-green-400 text-xs">
                  {new Date().toLocaleDateString('fa-IR')}
                </span>
              </div>
            )}
            
            {/* خط جداکننده بین تسک‌ها */}
            {index < tasks.length - 1 && (
              <div className="border-t border-gray-100 dark:border-gray-700 mt-4 pt-4 w-full">
                <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500 w-full">
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
        <div className="text-center py-8 w-full">
          <button 
            onClick={handleAddTask}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md flex items-center justify-center gap-2 mx-auto w-full"
          >
            <Plus className="w-5 h-5" />
            <span>افزودن اولین تسک</span>
          </button>
        </div>
      )}
    </div>
  );
}