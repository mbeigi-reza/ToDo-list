export default function TaskForm({ task, onTaskChange }) {
  return (
    <div className="flex flex-col gap-4 mb-4">
      <div>
        <label className="font-medium mb-1 block">📝 عنوان تسک:</label>
        <input
          type="text"
          value={task.title}
          onChange={(e) => onTaskChange("title", e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
          placeholder="مثلاً خرید وسایل خانه"
        />
      </div>

      <div>
        <label className="font-medium mb-1 block">📄 توضیحات:</label>
        <textarea
          value={task.description}
          onChange={(e) => onTaskChange("description", e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
          rows="3"
          placeholder="توضیحات اضافی..."
        />
      </div>
    </div>
  );
}
