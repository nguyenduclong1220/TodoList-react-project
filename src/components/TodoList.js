import React, {useState, useEffect} from 'react'
import Todo from './Todo';
import TodoForm from './TodoForm'

const TODO_APP_STORAGE_KEY = "TODO_APP";

function TodoList() {
    const [todos,setTodos] = useState([]); // truyền todo vào, giá trị là 1 mảng

    const addTodo = todo => {              // thêm todo
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
 

    const completeTodo = id => {                     // todo hoàn thành, nhấn vào hiện complete 
        let updateTodos = todos.map(todo => {
            if (todo.id === id) {
            todo.isComplete = !todo.isComplete
            }
            return todo;
        })
        setTodos(updateTodos);
    }

    // lưu todo vào localStorage, reload trang không bị mất     
    useEffect(() => {     
        const storagedTodos = localStorage.getItem(TODO_APP_STORAGE_KEY);
        if (storagedTodos) {
          setTodos(JSON.parse(storagedTodos));
        }
      }, []);
    
      useEffect(() => {
        localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(todos));
      }, [todos]);

    return (
        <div>
            <h1>What are the plans for today?</h1>
            <TodoForm onSubmit={addTodo} />
            <Todo todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo}/>
        </div>
    )
}

export default TodoList;
