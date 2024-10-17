import React from "react";
import TodoItem from './TodoItem.tsx';
import { Todo } from "../type.ts";

interface Props {
    todos: Todo[];
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
  }

  const TodoList: React.FC<Props> = ({todos, onToggle, onDelete}) => {

    return(
        <ul className="list-group container text-center" style={{marginTop:20, marginBottom:20}}>
        {            
        todos.map(item => (
            <TodoItem key={item.id} todo={item} onToggle={onToggle} onDelete={onDelete} />
            )
        )
        }
        </ul>
    );

  };

  export default TodoList