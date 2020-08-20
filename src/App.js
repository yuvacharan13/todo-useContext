import React, {
  useState,
  useReducer,
  useEffect
} from "react";
import "bootstrap/dist/css/bootstrap.css";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { UserContext } from './UserContext';

const App = () => {

  const [state, setState] = useState({ items: [] });
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    fetch('https://todo-backend-backend.herokuapp.com/fetch')
      .then(response => response.json())
      .then(response => {setState(response);})
  }, [count])

  const addTodo = (itemStr) => {
    const todoObj = {
      title: itemStr
    };
    
    fetch('https://todo-backend-backend.herokuapp.com/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoObj),
      })
      .then(response => {response.json(); setState({items: [...state.items, todoObj]});
      setCount(count+1);})
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });  
  };

  const deleteTodo = (id) => {
    const updatedItems = state.items.filter((item) => item._id !== id);
    fetch(`https://todo-backend-backend.herokuapp.com/remove/${id}`, {
        method: 'DELETE',
      })
      .then(data => {
        return data.json()
      }).then(value => {console.log(value); setState({items: updatedItems}); setCount(count+1); })
      .catch((error) => {
        console.error('Error:', error);
      });  
  };


  return ( 
   <div>
      <nav className = "navbar navbar-light bg-light" >
      <a className = "navbar-brand" href = "/" > My Todo App </a>  
     </nav> 
     <UserContext.Provider value={{state, setState}}>
      <TodoForm addTodo = {addTodo}/>  
      <TodoList deleteTodo = {deleteTodo}/>   
     </UserContext.Provider>
       
    </div>
    );
}

export default App;