import React from 'react';

const TodoList = (props) => {

  return (
    <ul>
      {props.todos.map(todo => (
        <li key={todo.id}>
          <label>
            <input
              type="checkbox"
              checked={todo.complete}
              onChange={() => props.onChangeTaskStatus(todo)}
            />
            {todo.task}
          </label>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;