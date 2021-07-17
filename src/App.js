import React from 'react';
import './App.css';
import Clock from './components/Clock';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="todo-App">
      <Clock/>
     <TodoList/>
    </div>
  );
}

export default App;
