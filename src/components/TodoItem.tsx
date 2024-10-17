import React from "react";
import { Todo } from '../type.ts';

interface Props {
    todo: Todo;
    onToggle: (id) => void;
    onDelete: (id) => void;
}

const TodoItem: React.FC<Props> = ({ todo, onToggle, onDelete }) => {
    return (
        <li className="list-group-item">
            <div className="row align-items-center">
                <div className="col">
            <input
            className="form-check-input me-1"
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)} />
            <label className="form-check-label" style={{ textDecoration: todo.completed ? 'line-through' : 'none', marginLeft:10 }}>{todo.text}</label>
            </div>
            <div className="col">
            <span style={{marginRight: 10}} className="badge text-bg-primary">{todo.category}</span>
            </div>
            <div className="col">
            <button type="button" className="btn btn-outline-primary" onClick={() => onDelete(todo.id)}>Delete</button>
            </div>
            </div>
        </li>
    );
};

export default TodoItem