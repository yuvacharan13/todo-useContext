import React, { useContext } from "react";
import {UserContext} from "./UserContext"



const TodoList = (props) => {
  const {state, setState} = useContext(UserContext);
    return (
        <ul className="list-group">
          {state.items.map((item,idx) => {
            return (
              <li className="list-group-item" key={idx}>
                <span>
                  <span>{item.title}</span>
                    <span className="float-right" onClick={props.deleteTodo.bind(this, item._id)}> Delete </span>
                  </span>
              </li>
            );
          })}
        </ul>
      );
}


export default TodoList;