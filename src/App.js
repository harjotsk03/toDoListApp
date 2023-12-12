import './App.css';
import React, { useState } from 'react';

function App() {
  const [text, setText] = useState('');
  const [editText, setEditText] = useState(''); // Separate state for editing
  const [todoList, setTodoList] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const handleChange = (event) => {
    setText(event.target.value);
    setEditText(event.target.value); // Update editText when typing
  };

  const handleKeyChange = (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  };

  const addTask = () => {
    if (editingTask) {
      setTodoList(
        todoList.map((task) =>
          task.id === editingTask.id ? { ...task, taskName: editText, editing: false } : task
        )
      );
      setEditingTask(null);
    } else {
      const taskNew = {
        id: todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1,
        taskName: editText,
        editing: false,
      };
      setTodoList(taskNew.taskName !== '' ? [...todoList, taskNew] : todoList);
    }
    setText('');
    setEditText(''); // Clear the editText state
  };

  const deleteTask = (id) => {
    setTodoList(todoList.filter((task) => task.id !== id));
  };

  const completeTask = (id) => {
    setTodoList(
      todoList.map((task) => {
        if (task.id === id) {
          return { ...task, completed: true };
        } else {
          return task;
        }
      })
    );
  };

  const editTask = (id) => {
    const taskToEdit = todoList.find((task) => task.id === id);
    if(!taskToEdit.completed){
      setText(taskToEdit.taskName);
      setEditText(taskToEdit.taskName); // Set editText when editing starts
      setEditingTask(taskToEdit);
    }else{
      alert("Completed tasks can not be edited.")
    }
  };

  return (
    <div className="App">
    <div>
      <h1 className='Title'>To Do List</h1>
    </div>
      <input
        value={text}
        onChange={handleChange}
        placeholder="e.g. Go Shopping"
        onKeyDown={handleKeyChange}
        className="inputBar"
      />
      <button className='button' onClick={addTask}>
        {editingTask ? 'Update Task' : 'Add Task'}
      </button>
      {todoList.map((task, key) => (
        <div key={key}>
          {task.editing ? (
            <div>
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={handleKeyChange}
              />
              <button onClick={addTask}>
                {editingTask ? 'Update Task' : 'Add Task'} 
              </button>
            </div>
          ) : (
            <div>
              <h1 style={{ color: task.completed ? '#31063D' : 'black', opacity: task.completed ? 0.3 : 1 }}>
                {task.taskName}
              </h1>
              <button className='button' onClick={() => deleteTask(task.id)}>Delete</button>
              <button className='button' onClick={() => completeTask(task.id)}>Completed</button>
              <button className='button' onClick={() => editTask(task.id)}>Edit</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
