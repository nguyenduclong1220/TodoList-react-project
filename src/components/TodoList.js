import React, {useState} from 'react'
import Todo from './Todo';
import TodoForm from './TodoForm'

function TodoList() {
    const [todos,setTodos] = useState([]); // truyền todo vào, giá trị là 1 mảng

    const addTodo = todo => {              //thêm todo
        if(!todo.text || /^\s*$/.test(todo.text)) {
            return 
        };

        const newTodos = [todo,...todos];
        setTodos(newTodos);  
    };

    const updateTodo = (todoId, newValue) => {         // thay đổi todo ban đầu 
        if(!newValue.text || /^\s*$/.test(newValue.text)) {
            return 
        };
        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item))
        );
    }

    const removeTodo = id => {                         // xóa todo 
        const removeArr = [...todos].filter (todo => todo.id !== id)
        setTodos(removeArr);
    };
 

    const completeTodo = id => {                     // todo hoàn thành 
        let updateTodos = todos.map(todo => {
            if (todo.id === id) {
            todo.isComplete = !todo.isComplete
            }
            return todo;
        })
        setTodos(updateTodos);
    }

    return (
        <div>
            <h1>What are the plans for today?</h1>
            <TodoForm onSubmit={addTodo} />
            <Todo todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo}/>
        </div>
    )
}

export default TodoList
