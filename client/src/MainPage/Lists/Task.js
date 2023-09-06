import { useContext, useState } from "react";
import { UserContext } from "../../Context/user";
import Foco from 'react-foco';

function Task({ task }) {
  const { user, setUser } = useContext(UserContext)

  // when editTaskMode is true, the task description becomes a form field the the user can edit
  const [editTaskMode, setEditTaskMode] = useState(false)
  const [newDescription, setNewDescription] = useState(task.description)

  // handleCheckBoxChange is called when a task's checkbox is clicked
  function handleCheckboxChange() {
    // send a patch request to the backend with the updated task object
    fetch(`/tasks/${task.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({...task, completed: !task.completed})
    }).then(rspns => {
      if (rspns.ok) {
        // update user state on the frontend
      rspns.json().then(updatedTask => setUser({...user, user_lists: user.user_lists.map(userList => {
          return {...userList, list: {...userList.list, tasks: userList.list.tasks.map(task => task.id === updatedTask.id ? updatedTask : task)}}
        })})
      )} else rspns.json().then(rspns => alert(rspns.errors))
    })
  }

  // handleTaskDescriptionUpdate submits a patch request with the updated task description to the backend
  function handleTaskDescriptionUpdate(e) {
    e.preventDefault()
    // send a patch request to the backend with the updated task object
    fetch(`/tasks/${task.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({...task, description: newDescription})
    }).then(rspns => {
      if (rspns.ok) {
        // update user state on the frontend
        rspns.json().then(updatedTask => setUser({...user, user_lists: user.user_lists.map(userList => {
          return {...userList, list: {...userList.list, tasks: userList.list.tasks.map(task => task.id === updatedTask.id ? updatedTask : task)}}
        })}))
        // clear the form and reset the newTask object
        setEditTaskMode(false)
      } else rspns.json().then(rspns => alert(rspns.errors))
    })
  }

  // handleTaskDelete is called when the user clicks the task delete button
  function handleTaskDelete() {
    // send a delete request with the task id to the backend 
    fetch(`/tasks/${task.id}`, {method: 'DELETE'}).then(rspns => {
      if (rspns.ok) {
      // remove the task on from user state on the frontend
      setUser({...user, user_lists: user.user_lists.map(userList => {
          return {...userList, list: {...userList.list, tasks: userList.list.tasks.filter(tasK => tasK.id !== task.id)}}
        })})
      } else rspns.json().then(console.log)
    })
  }

  return (
    editTaskMode ?
      <form onSubmit={handleTaskDescriptionUpdate}>
        <Foco onClickOutside={() => setEditTaskMode(false)}>
          <input value={newDescription} autoFocus onChange={e => setNewDescription(e.target.value)}/>
          <input type='submit' className="float-right"/>
        </Foco>
      </form> :
      <div>
        <input type="checkbox" checked={task.completed} onChange={handleCheckboxChange}/>
        <span onClick={() => setEditTaskMode(true)}>{task.description}</span>
        <span className="float-right" onClick={handleTaskDelete}>x</span>
      </div>
  );
}

export default Task;
