import React from 'react';
import TodoForm from './TodoForm'
import TodoUL from './TodoUL'

const initialTodos = [
  {
    id: 'a',
    task: 'Learn React',
    complete: false,
  },
  {
    id: 'b',
    task: 'Learn Firebase',
    complete: false,
  },
];

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, action.todo];
    case 'DO_TODO':
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, complete: true };
        } else {
          return todo;
        }
      });
    case 'UNDO_TODO':
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, complete: false };
        } else {
          return todo;
        }
      });
    default:
      return state;
  }
};

const TodoList = () => {
  const [todos, dispatch] = React.useReducer(
    todoReducer,
    initialTodos
  );

  const handleCompleteChange = todo => {
    if (todo.complete) {
      dispatch({ type: 'UNDO_TODO', id: todo.id });
    } else {
      dispatch({ type: 'DO_TODO', id: todo.id });
    }
  };

  const handleFormSubmit = todo => {
	  dispatch({ type: 'ADD_TASK', todo: todo })
  };

  return (
    <div>
      <TodoForm todos={todos} onSubmit={handleFormSubmit} />
      <TodoUL todos={todos} onCompleteChange={handleCompleteChange} />
    </div>
  );
};

export default TodoList;