import React, { useState } from 'react';
import { Task } from '../models/Task';

interface TaskCardProps {
  task: Task;
  onUpdate: (id: string, updatedTask: Partial<Task>) => void;
  onDelete: (id: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedContent, setEditedContent] = useState(task.content);
  const [editedColor, setEditedColor] = useState(task.color);
  const [tags, setTags] = useState(task.tags);
  const [newTag, setNewTag] = useState('');

  const handleSave = () => {
    onUpdate(task.id, { 
      title: editedTitle, 
      content: editedContent,
      color: editedColor,
      tags: tags,
      modified: new Date()
    });
    setIsEditing(false);
  };

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      const updatedTags = [...tags, newTag];
      setTags(updatedTags);
      onUpdate(task.id, { tags: updatedTags });
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    const updatedTags = tags.filter(tag => tag !== tagToRemove);
    setTags(updatedTags);
    onUpdate(task.id, { tags: updatedTags });
  };

  const colors = ['#ffffff', '#f28b82', '#fbbc04', '#fff475', '#ccff90', '#a7ffeb', '#cbf0f8', '#aecbfa', '#d7aefb', '#fdcfe8', '#e6c9a8'];

  if (isEditing) {
    return (
      <div className="task-card editing" style={{ backgroundColor: editedColor }}>
        <input
          className="form-title"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          placeholder="Titre"
        />
        <textarea
          className="form-content"
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          placeholder="Contenu"
        />
        <div className="color-picker">
          {colors.map((color) => (
            <button
              key={color}
              type="button"
              style={{ backgroundColor: color }}
              onClick={() => setEditedColor(color)}
              className={editedColor === color ? 'selected' : ''}
            />
          ))}
        </div>
        <div className="tags">
          {tags.map(tag => (
            <span key={tag} className="tag">
              {tag}
              <button onClick={() => removeTag(tag)}>x</button>
            </span>
          ))}
          <input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTag()}
            placeholder="Ajouter un tag"
          />
        </div>
        <button onClick={handleSave}>Enregistrer</button>
        <button onClick={() => setIsEditing(false)}>Annuler</button>
      </div>
    );
  }

  return (
    <div className="task-card" style={{ backgroundColor: task.color }}>
      <h3>{task.title}</h3>
      <p>{task.content}</p>
      <div className="tags">
        {task.tags.map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
      <div className="task-card-actions">
        <button onClick={() => setIsEditing(true)} className="icon-button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16" height="16">
            <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/>
          </svg>
        </button>
        <button onClick={() => onUpdate(task.id, { pinned: !task.pinned })} className="icon-button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="16" height="16">
            <path d="M32 32C32 14.3 46.3 0 64 0H320c17.7 0 32 14.3 32 32s-14.3 32-32 32H290.5l11.4 148.2c36.7 19.9 65.7 53.2 79.5 94.7l1 3c3.3 9.8 1.6 20.5-4.4 28.8s-15.7 13.3-26 13.3H32c-10.3 0-19.9-4.9-26-13.3s-7.7-19.1-4.4-28.8l1-3c13.8-41.5 42.8-74.8 79.5-94.7L93.5 64H64C46.3 64 32 49.7 32 32zM160 384h64v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V384z"/>
          </svg>
        </button>
        <button onClick={() => onUpdate(task.id, { archived: !task.archived })} className="icon-button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16" height="16">
            <path d="M32 32H480c17.7 0 32 14.3 32 32V96c0 17.7-14.3 32-32 32H32C14.3 128 0 113.7 0 96V64C0 46.3 14.3 32 32 32zm0 128H480V416c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V160zm128 80c0 8.8 7.2 16 16 16H336c8.8 0 16-7.2 16-16s-7.2-16-16-16H176c-8.8 0-16 7.2-16 16z"/>
          </svg>
        </button>
        <button onClick={() => onDelete(task.id)} className="icon-button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="16" height="16">
            <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/>
          </svg>
        </button>
      </div>
    </div>
  );
};