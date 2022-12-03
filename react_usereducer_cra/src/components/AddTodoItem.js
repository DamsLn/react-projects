import React from "react";

const AddTodoItem = function(props) {
    return (
        <div className="flex justify-center items-center">
            <form className="flex flex-col w-1/6 border shadow p-2">
                <label htmlFor="taskId">ID</label>
                <input className="border mb-2" type="number" name="taskId" id="taskId" />
                <label htmlFor="taskLabel">Label</label>
                <input className="border mb-2" type="text" name="taskLabel" id="taskLabel" />
                <button className="border mb-2" onClick={(event) => {
                    event.preventDefault();
                    
                    let taskId = document.getElementById("taskId");
                    let taskLabel = document.getElementById("taskLabel");

                    let data = {
                        "id": taskId.value,
                        "task": taskLabel.value,
                        "complete": false
                    }

                    props.onSubmit(data);
                }}
                > 
                    Ajouter la tâche 
                </button>
            </form>
        </div>
    );
}

export default AddTodoItem;