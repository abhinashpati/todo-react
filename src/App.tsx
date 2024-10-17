import React, { useState, useEffect } from 'react';
import { Todo } from './type.ts';
import { TodoCategory } from './type.ts';
import TodoList from './components/TodoList.tsx';
import TodoInput from './components/TodoInput.tsx';
import CategoryFilter from './components/CategoryFilter.tsx';
import 'bootstrap/dist/css/bootstrap.css';
import TodoContext from './TodoContext.js';

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [filter, setFilter] = useState<TodoCategory>(TodoCategory.Default);
  const [completedCount, setCompletedCount] = useState(0);

  const [searchTerm, setSearchTerm] = useState('');
  const [timeOpen, setTimeOpen] = useState(0);

  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  });

  useEffect(() =>{
    let completed = todos.filter(item => item.completed).length
    setCompletedCount(completed)
  }, [todos]);

  useEffect(() =>{
    let timer = setInterval(() => {
      setTimeOpen(prevTime => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() =>{
    let searchFilteredTodos = todos.filter(item => item.text.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) || item.category.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
    setFilteredTodos(searchFilteredTodos.length > 0 ? searchFilteredTodos : []);
  }, [todos, searchTerm]);

  function addTodo(text: string, category: string) {
    let todoCategory: TodoCategory = TodoCategory.Default

    Object.values(TodoCategory).forEach((value) => {
      if(value == category.toLowerCase()){
        todoCategory = value as TodoCategory;
      }
    })

    setTodos([...todos, { id: Date.now(), text: text, category: todoCategory, completed: false }]);
  }

  function onToggle(id: number) {
    setTodos(todos.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  }

  function onDelete(id: number){
    setTodos(todos.filter( item => item.id != id));
  };

  function filterTodos(): Todo[]{
    return(
    filter == TodoCategory.Default ? todos : todos.filter(item => item.category == filter)
    );
  };
  return (
    <TodoContext.Provider value={{filter, setFilter}}>
    <div className="d-flex flex-column mb-3 justify-content-between" style={{margin:20}}>
      <h1>Todo List</h1>
      <TodoInput onAdd={addTodo} />
      <CategoryFilter filter={filter} setFilter={setFilter} />
      <TodoList todos={filterTodos()} onToggle={onToggle} onDelete={onDelete} />
      <div className="card" style={{marginBottom:20}}>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Completed Count: {completedCount}</li>
            <li className="list-group-item">Page open since: {timeOpen} seconds</li>
          </ul>
      </div>
      <input className="form-control" type='search' style={{padding: 10, "width": "50%", marginBottom:20}} placeholder='search todos here' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <h2>Searched todos:</h2>
      <TodoList todos={filteredTodos} onToggle={onToggle} onDelete={onDelete} />
    </div>
    </TodoContext.Provider>
  );
}

export default App;