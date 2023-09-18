import { useContext, useState } from "react";
import { UserContext } from "../../Context/user";
import Foco from 'react-foco';

function Task({ task }) {
  const { updateTaskInState, removeTaskFromState } = useContext(UserContext)

  // when editTaskDescription is true, task description becomes a form field that users can edit
  const [editTaskDescription, setEditTaskDescription] = useState(false)
  const [newDescription, setNewDescription] = useState(task.description)

  // handleCheckboxClick is called when a task's checkbox is clicked
  const handleCheckboxClick = () => updateTask({...task, completed: !task.completed})

  // handleDescriptionSubmit is called when a task's submit button is clicked
  function handleDescriptionSubmit(e) {
    e.preventDefault()
    updateTask({...task, description: newDescription})
    setEditTaskDescription(false) // clear form, reset newTask object
  }

  // updateTask sends newTask in a patch request to the backend
  function updateTask(newTask) {
    // send a patch request to the backend with updated task object
    fetch(`/tasks/${task.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask)
    }).then(rspns => {
      if (rspns.ok) rspns.json().then(updateTaskInState) // update frontend user state
      else rspns.json().then(rspns => alert(rspns.errors))
    })
  }

  // deleteTask is called when the user clicks the task delete button
  function deleteTask() {
    // send delete request with task id to the backend 
    fetch(`/tasks/${task.id}`, {method: 'DELETE'}).then(rspns => {
      if (rspns.ok) removeTaskFromState(task.id) // remove task on from user frontend state  
      else alert('something went wrong') // rspns.json().then(console.log)
    })
  }

  return (
    editTaskDescription ?
      <form onSubmit={handleDescriptionSubmit}>
        <Foco onClickOutside={() => setEditTaskDescription(false)}>
          <input value={newDescription} autoFocus onChange={e => setNewDescription(e.target.value)}/>
          <input type='submit' className="float-right" value={'sumbit'}/>
        </Foco>
      </form> :
      <div>
        <input type="checkbox" checked={task.completed} onChange={handleCheckboxClick}/>
        <span onClick={() => setEditTaskDescription(true)}>{newDescription}</span>
        <span className="float-right" onClick={deleteTask}>x</span>
      </div>
  );
}

export default Task;
