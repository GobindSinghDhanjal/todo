"use client";
import { useEffect, useState } from 'react';
import TodoForm from './components/TodoForm';

// Define the structure of a Todo item
interface Todo {
  text: string;
  labels: string[];
  completed: boolean;
}

const Home = () => {
  const [todos, setTodos] = useState<Todo[]>([]); // Use the Todo type for state

  useEffect(() => {
    // Load todos from localStorage on client-side
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  const addTodo = (todo: Omit<Todo, 'completed'>) => {
    // Accept a todo without the completed field initially
    const updatedTodos = [...todos, { ...todo, completed: false }]; // Set completed to false by default
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const toggleCompletion = (index: number) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  return (
    <div className="container">
      <h1>Todo Application</h1>
      <TodoForm onAddTodo={addTodo} />
      <br />
      <ul style={{ listStyleType: 'none' }}> {/* Remove bullets from ul */}
        {todos.map((todo, index) => (
          <li
            className="list-items"
            key={index}
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleCompletion(index)}
            />
            {todo.text} - {todo.labels.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
