import React, { useState } from 'react';
import { Task } from '../models/Task';

interface TaskFormProps {
  onAddTask: (task: Omit<Task, 'id'>) => void;
}

const colors = ['#ffffff', '#f28b82', '#fbbc04', '#fff475', '#ccff90', '#a7ffeb', '#cbf0f8', '#aecbfa', '#d7aefb', '#fdcfe8', '#e6c9a8'];

export const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState('#ffffff');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() || content.trim()) {
      onAddTask({
        title,
        content,
        color,
        created: new Date(),
        modified: new Date(),
        archived: false,
        pinned: false,
        tags: []
      });
      setTitle('');
      setContent('');
      setColor('#ffffff');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form" style={{ backgroundColor: color }}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Titre"
        className='form-title'
        style={{ backgroundColor: "#f0f0f0" }}
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Contenu"
        className='form-content'
        style={{ backgroundColor: "#f0f0f0" }}
      />
      <div className="color-picker">
        {colors.map((c) => (
          <button
            key={c}
            type="button"
            style={{ backgroundColor: c }}
            onClick={() => setColor(c)}
            className={color === c ? 'selected' : ''}
          />
        ))}
      </div>
      <button type="submit">Ajouter une note</button>
    </form>
  );
};