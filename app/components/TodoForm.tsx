import { useState } from 'react';
import LabelSelector from './LabelSelector';

const TodoForm = ({ onAddTodo }) => {
    const [todo, setTodo] = useState('');
    const [labels, setLabels] = useState<string[]>([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddTodo({
            text: todo,
            labels
        });
        setTodo('');
        setLabels([]);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
            className='enter-todo'
                type="text"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                placeholder="Enter todo"
                required
            />
            <LabelSelector onSelect={(label) => setLabels([...labels, label])} />
            <button type="submit">Add Todo</button>
        </form>
    );
};

export default TodoForm;
