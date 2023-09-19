import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../Context/user';
import Task from "./Task";
import Collaboratores from './Collaborators';

function List({ userList }) {
  const { addNewTaskToList, deleteUserList } = useContext(UserContext)

  const tasks = userList.list.tasks
    .sort((a, b) => a.id - b.id)
    .map(task => <Task key={task.id} task={task}/>)

  // should the following be a task component?
  const blankTask = {
    description: "",
    completed: false,
    list_id: userList.list.id
  }

  // when expand is true, tasks are visible below the list
  // expand state is stored in local storage to persist expanded lists accross rerenders
  const [expand, setExpand] = useState(JSON.parse(localStorage.getItem(`expand${userList.id}`)))
  // save the expand information locally to preserve expanded lists accross refreshes
  useEffect(() => localStorage.setItem(`expand${userList.id}`, JSON.stringify(expand)), [expand, userList.id])

  const [showCollaborators, setShowCollaborators] = useState(false)

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
        rspns.json().then(addNewTaskToList) // update user state to reflect the new task on frontend
        setNewTask(blankTask) // clear form, reset newTask object
      } else rspns.json().then(rspns => alert(rspns.errors))
    })
  }

  // handleDeleteList is called when the delete list button is clicked
  // on the backend, the List is destroyed, along with all associated UserLists
  // on the forntend, the user object is reset, with the associated UserList removed
  function handleDeleteList() {
    // send a delete request with the list id to the backend 
    fetch(`/lists/${userList.list.id}`, {method: 'DELETE'}).then(rspns => {
      if (rspns.ok) deleteUserList(userList.id) // remove the list from frontend state
      else alert('something went wrong') // rspns.json().then(console.log)
    })
  }

  return (
    <div className='list'>
      <div>
        <span onClick={() => setExpand(!expand)} className='task-name'>{userList.list.name}</span>
        {expand ? <span onClick={() => setShowCollaborators(true)} > - collaborators</span> : null}
        <span onClick={handleDeleteList} className='float-right'>X</span>
      </div>
      {expand ? 
        <div>
          {tasks}
          <form onSubmit={handleNewTaskSubmit}>
            <input
              autoFocus
              placeholder='new task'
              value={newTask.description}
              onChange={handleNewTaskChange}/>
            <input type='submit' className='float-right' value='create task'/>
          </form>
        </div> : null}
        {showCollaborators ? 
          <Collaboratores
            setShowCollaborators={setShowCollaborators}
            userLists={userList.list.user_lists}
            list={userList.list}/>
          : null}
    </div>
  );
}

export default List;
