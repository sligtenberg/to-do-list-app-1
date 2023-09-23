import { useContext, useState } from "react";
import { UserContext } from "../../Context/user";

function NewTaskForm({ listId }) {
  const { addNewTaskToList } = useContext(UserContext)

  const blankTask = {
    description: "",
    completed: false,
    list_id: listId
  }

  // newTask is the object which is sent to the backend when users create new tasks
  const [newTask, setNewTask] = useState(blankTask)
  const handleNewTaskChange = e => setNewTask({...newTask, description: e.target.value})

  // handleNewTaskSubmit is called when the new task form is submitted
  function handleNewTaskSubmit(e) {
    e.preventDefault()
    fetch('/tasks', { // send newTask object in post request to server
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask)
    }).then(rspns => {
      if (rspns.ok) {
        rspns.json().then(newTask => addNewTaskToList(newTask, listId)) // update user state to reflect the new task on frontend
        setNewTask(blankTask) // clear form, reset newTask object
      } else rspns.json().then(rspns => alert(rspns.errors))
    })
  }

  return (
    <form onSubmit={handleNewTaskSubmit}>
      <input
        autoFocus
        placeholder='new task'
        value={newTask.description}
        onChange={handleNewTaskChange}/>
      <input type='submit' className='float-right' value='create task'/>
    </form>
  );
}

export default NewTaskForm;
