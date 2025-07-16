import React, { useState } from "react";
import API from "../api";

export default function TodoForm({ refresh }) {
  const [title, setTitle] = useState("");
  const [progress, setProgress] = useState("");
  const email = localStorage.getItem("email");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/todos", {
      user_email: email,
      title,
      progress,
      date: new Date().toISOString()
    });
    setTitle("");
    setProgress("");
    refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <input className="form-control mb-2" placeholder="Todo..." value={title} onChange={e => setTitle(e.target.value)} required />
      <input className="form-control mb-2" placeholder="Progress" value={progress} onChange={e => setProgress(e.target.value)} />
      <button className="btn btn-success w-100" type="submit">Add Todo</button>
    </form>
  );
}