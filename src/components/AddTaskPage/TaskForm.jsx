export default function TaskForm({ task, onTaskChange }) {
  return (
    <div>
      <label>عنوان:</label>
      <input
        type="text"
        value={task.title}
        onChange={(e) => onTaskChange("title", e.target.value)}
      />

      <label>توضیح:</label>
      <textarea
        value={task.description}
        onChange={(e) => onTaskChange("description", e.target.value)}
      ></textarea>
    </div>
  );
}
