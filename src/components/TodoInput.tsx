import React from "react";
import { useState } from "react";

interface Props{
onAdd: (text: string, category: string) => void;
}

const TodoInput: React.FC<Props> = ({onAdd}) => {
    const[text, setText] = useState('');
    const[category, setCategory] = useState('');

    const handleSubmit = (e: React.FormEvent) =>{
        e.preventDefault();
        if(text.trim() && category.trim()){
            onAdd(text, category)
            setText('')
            setCategory('')
        }
    };

    return(
        <form onSubmit={handleSubmit} className="d-flex form-control input-group mb-3 row">
            <div className="col">
                <div className="row">
            <input className="form-control"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a new Todo"
            style={{marginLeft: 0, marginRight: 20, marginTop:20, marginBottom:20}} />
            <br />
            <input
            className="form-control"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
            style={{marginLeft: 0, marginRight: 20, marginTop:20, marginBottom:20}} />
            <br />
            <button className="btn btn-primary" style={{marginLeft: 0, marginRight: 20, marginTop:20, marginBottom:20}} type="submit">Add</button>
      </div>
      </div>
      <div className="col">
      </div>
        </form>
    );
};

export default TodoInput;