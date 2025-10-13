import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoApp from "./components/TodoApp";
import AddTaskPage from "./components/AddTaskPage/AddTaskPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoApp />} />
        <Route path="/add" element={<AddTaskPage />} />
      </Routes>
    </BrowserRouter>
  );
}
