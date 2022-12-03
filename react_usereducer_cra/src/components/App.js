import React from 'react';
import AddTodoItem from './AddTodoItem';
import TodoList from './TodoList'

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
    case 'ADD_TODO':
      return [...state, action.todo];
    default:
      return state;
  }
};

function App() {
  const [todos, dispatch] = React.useReducer(
    todoReducer,
    initialTodos
  );

  const handleChange = todo => {
    if (todo.complete) {
	    dispatch({ type: 'UNDO_TODO', id: todo.id });
    } else {
      dispatch({ type: 'DO_TODO', id: todo.id });
    }
  };
  
  const addTask = (data) => {
    dispatch({"type": "ADD_TODO", "todo": data});
  }

  return (
    <div>
      <input type="checkbox" id="filter"></input>
      <label htmlFor="filter">Afficher uniquement les tâches terminées</label>
      <TodoList onChangeTaskStatus={handleChange} todos={todos}/>
      <AddTodoItem onSubmit={addTask} />
    </div>
  );
}

export default App;
