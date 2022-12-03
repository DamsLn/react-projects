import React from 'react';

const TodoUL = (props) => {

  // L'état local du composant contient :
  // - todos : le tableau des tâches affichées (qui contiendra
  // soit toutes les tâches, soit les tâches sélectionnées
  // par le filtre)
  const [todos, setTodos] = React.useState([]);
  // - filter : une variable booléenne indiquant si le filtrage
  // de liste des tâches est actif ou non
  const [filter, setFilter] = React.useState(false);

  // Hook d'effet (rappel : exécuté au montage du composant
  // et lorsque les données indiquées en 2ème paramètres
  // sont modifiées, c'est-à-dire lorsque la liste des
  // tâches en entrée (props.todos) est modifiée, et/ou lorsque
  // la valeur du filtre (filter) est modifiée.
  React.useEffect(() => {
    if (filter) {
      // Cas où le filtre est actif : la liste des tâches
      // interne (todos) prend comme valeur la liste
      // contenant seulement les tâches terminées
      setTodos(
        props.todos.filter((todo) => todo.complete)
      );
    } else {
      // Cas où le filtre n'est pas actif : la liste
      // des tâches interne (todos) prend comme valeur
      // la liste contenant toutes les tâches
      setTodos(props.todos);
    }
	}, [props.todos, filter]);

  return (
    <div>
      <label>
        <input
          type="checkbox"
          onChange={(e) => {
            // Lorsque l'état de la case à cocher change,
            // on modifie la valeur de la donnée interne
            // filter
            setFilter(e.target.checked);
          }}
          disabled={
            // La case à cocher est inactive si la liste ne contient
            // aucune tâche ou si la liste ne contient aucune tâche
            // terminée
            !todos.length || !props.todos.find((todo) => todo.complete)
          }
        />
        <>&nbsp;</>Only show complete tasks
      </label>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.complete}
                onChange={() => {
                  props.onCompleteChange(todo);
                }}
              />
            | Id: {todo.id} | Task: {todo.task}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoUL;