import React, { useState, useEffect } from 'react';
import { TaskForm } from './components/TaskForm';
import { TaskCard } from './components/TaskCard';
import { SearchBar } from './components/SearchBar';
import { Task } from './models/Task';
import './App.css';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'created' | 'modified' | 'title'>('created');
  const [darkMode, setDarkMode] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const addTask = (newTask: Omit<Task, 'id'>) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
    };
    setTasks([...tasks, task]);
  };

  const updateTask = (id: string, updatedTask: Partial<Task>) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, ...updatedTask } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => 
    (task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     task.content.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (showArchived ? task.archived : !task.archived)
  );

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    } else {
      return new Date(b[sortBy]).getTime() - new Date(a[sortBy]).getTime();
    }
  });

  const pinnedTasks = sortedTasks.filter(task => task.pinned);
  const unpinnedTasks = sortedTasks.filter(task => !task.pinned);

  return (
    <div className="App">
      <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"/>
          </svg>
        )}
      </button>
      {/* <h1>Mon Keep</h1> */}
      <div className="control-buttons">
      <button 
        className="archive-button" 
        onClick={() => setShowArchived(!showArchived)}
      >
        {showArchived ? 'Masquer les archives' : 'Afficher les archives'}
      </button>
      </div>

<div className='search-and-sort'>
      <SearchBar onSearch={setSearchQuery} />
      <select className="sort-select" onChange={(e) => setSortBy(e.target.value as 'created' | 'modified' | 'title')}>
        <option value="created">Date de création</option>
        <option value="modified">Date de modification</option>
        <option value="title">Titre</option>
      </select>
    </div>
      {/* <TaskForm onAddTask={addTask} /> */}

<div className="task-form-dropdown">
  <button 
    className="task-form-toggle" 
    onClick={() => setShowTaskForm(!showTaskForm)}
  >
    Ajouter une note 
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16" height="16">
      <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
    </svg>
  </button>
  {showTaskForm && <TaskForm onAddTask={addTask} />}
</div>
      {pinnedTasks.length > 0 && (
        <>
          <h2>Épinglées</h2>
          <div className="task-grid">
            {pinnedTasks.map(task => (
              <TaskCard 
                key={task.id}
                task={task}
                onUpdate={updateTask}
                onDelete={deleteTask}
              />
            ))}
          </div>
        </>
      )}
      <h2>{showArchived ? 'Archives' : 'Autres notes'}</h2>
      <div className="task-grid">
        {unpinnedTasks.map(task => (
          <TaskCard 
            key={task.id}
            task={task}
            onUpdate={updateTask}
            onDelete={deleteTask}
          />
        ))}
      </div>
    </div>
  );
};

export default App;