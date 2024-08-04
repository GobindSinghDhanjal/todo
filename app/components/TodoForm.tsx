"use client";

import { useState } from 'react';
import LabelSelector from './LabelSelector';

// Define a type for the props of the component
interface TodoFormProps {
  onAddTodo: (todo: { text: string; labels: string[] }) => void; // Define the expected structure of a todo
}

const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {
  const [todo, setTodo] = useState<string>('');
  const [labels, setLabels] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddTodo({
      text: todo,
      labels,
    });
    setTodo('');
    setLabels([]);
  };

  const handleLabelSelect = (label: string) => {
    // Avoid duplicate labels
    setLabels((prevLabels) =>
      prevLabels.includes(label) ? prevLabels : [...prevLabels, label]
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="enter-todo"
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Enter todo"
        required
      />
      <LabelSelector onSelect={handleLabelSelect} />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoForm;
