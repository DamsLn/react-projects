import React from 'react';

const TodoForm = (props) => {

  const [error, setError] = React.useState('');
  
  return (
    <form>
      <div>
        <label htmlFor="id" style={{display: "inline-block", width: "80px", textAlign: "left"}}>Id: </label>
        <input type="text" name="id" id="id" required>
        </input>
      </div>
      <div>
        <label htmlFor="task" style={{display: "inline-block", width: "80px", textAlign: "left"}}>Task: </label>
        <input type="task" name="task" id="task" required />
      </div>
      <div>
        <label htmlFor="task" style={{display: "inline-block", width: "80px", textAlign: "left"}}>Complete? </label>
        <input type="checkbox" name="complete" id="complete" required
        />
      </div>      
      <div>
        <input type="button" value="Submit" style={{marginTop: 10, marginBottom: 10}}
          onClick={(event) => {
            const id = document.getElementById("id").value;
            const task = document.getElementById("task").value;
            const complete = document.getElementById("complete").checked;
            const todo = {id: id, task: task, complete: complete};
            if (id === '') {
              setError('Empty id!');
            } else if (props.todos.filter(_todo => _todo.id === todo.id).length) {
              setError('Id already exists!');
            } else {
              props.onSubmit(todo);
              setError('');
            }
          }}
        />
		{error !== '' ?
			" Error: "+error : ""} 
      </div>
    </form>
  );
};

export default TodoForm;