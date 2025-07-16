import React, { useEffect, useState } from "react";
import API from "../api";
import TodoForm from "./TodoForm";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editProgress, setEditProgress] = useState("");
  const [editDate, setEditDate] = useState("");
  const email = localStorage.getItem("email");

  const getTodos = async () => {
    const res = await API.get(`/todos/${email}`);
    setTodos(res.data);
  };

  useEffect(() => {
    getTodos();
  }, []);

  const handleDelete = async (id) => {
    await API.delete(`/todos/${id}`);
    getTodos();
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
    setEditProgress(todo.progress);
    setEditDate(todo.date ? todo.date.slice(0, 10) : "");
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    await API.put(`/todos/${editingId}`, {
      user_email: email,
      title: editTitle,
      progress: editProgress,
      date: editDate,
    });
    setEditingId(null);
    setEditTitle("");
    setEditProgress("");
    setEditDate("");
    getTodos();
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditProgress("");
    setEditDate("");
  };

  return (
    <div className="container" style={{ maxWidth: 600 }}>
      <h2 className="mb-3">Todos</h2>
      <TodoForm refresh={getTodos} />
      <ul className="list-group">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="list-group-item d-flex flex-column flex-md-row justify-content-between align-items-md-center"
          >
            {editingId === todo.id ? (
              <form className="w-100" onSubmit={handleEdit}>
                <div className="row g-2 align-items-center">
                  <div className="col-sm-4">
                    <input
                      className="form-control"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-sm-2">
                    <input
                      className="form-control"
                      value={editProgress}
                      onChange={(e) => setEditProgress(e.target.value)}
                      placeholder="Progress"
                    />
                  </div>
                  <div className="col-sm-3">
                    <input
                      type="date"
                      className="form-control"
                      value={editDate}
                      onChange={(e) => setEditDate(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-3 d-flex gap-2">
                    <button className="btn btn-success btn-sm" type="submit">
                      Save
                    </button>
                    <button className="btn btn-secondary btn-sm" type="button" onClick={cancelEdit}>
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="d-flex w-100 justify-content-between align-items-center">
                <span>
                  <strong>{todo.title}</strong>{" "}
                  {todo.progress && <span className="badge bg-info">{todo.progress}</span>}
                  {todo.date && (
                    <span className="text-muted ms-2" style={{ fontSize: "0.85em" }}>
                      {todo.date.slice(0, 10)}
                    </span>
                  )}
                </span>
                <div>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => startEdit(todo)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(todo.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}