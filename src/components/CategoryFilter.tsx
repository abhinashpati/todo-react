import React from "react";
import { TodoCategory } from "../type.ts";

interface Props{
    filter: string;
    setFilter: (filter: TodoCategory) => void;
}

const CategoryFilter : React.FC<Props> = ({filter, setFilter}) => {
    return(
        <div className="d-flex justify-content-around" style={{ marginTop:20, marginBottom: 20 }}>
            <button className={filter == TodoCategory.Default.valueOf() ? 'badge text-bg-primary active' : 'badge text-bg-secondary'} onClick={() => setFilter(TodoCategory.Default)}>All</button>
            <br />
            <button onClick={() => setFilter(TodoCategory.Groceries)} className={ filter == TodoCategory.Groceries.valueOf() ? 'badge text-bg-primary active' : 'badge text-bg-secondary' } >Groceries</button>
            <br />
            <button onClick={() => setFilter(TodoCategory.Food)} className={ filter == TodoCategory.Food.valueOf() ? 'badge text-bg-primary active' : 'badge text-bg-secondary' } >Food</button>
        </div>
    );
}

export default CategoryFilter;