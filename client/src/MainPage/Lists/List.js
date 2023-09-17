import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../Context/user';
import Task from "./Task";
import Collaboratores from './Collaborators';

function List({ userList }) {

  const tasks = userList.list.tasks
    .sort((a, b) => a.id - b.id)
    .map(task => <Task key={task.id} task={task}/>)
  const { user, setUser } = useContext(UserContext)

  // when expand is true, tasks are visible below the list
  const [expand, setExpand] = useState(JSON.parse(localStorage.getItem(`expand${userList.id}`)))

  // save the expand information locally to preserve expanded lists accross refreshes
  useEffect(() => {
    localStorage.setItem(`expand${userList.id}`, JSON.stringify(expand))
  }, [expand, userList.id])

  const [showCollaborators, setShowCollaborators] = useState(false)

  // newTask is the object which is sent to the backend when users create new tasks
  const [newTask, setNewTask] = useState({
    description: "",
    completed: false,
    list_id: userList.list.id
  })

  // handleNewTaskSubmit is called when the new task form is submitted
  function handleNewTaskSubmit(e) {
    e.preventDefault()
    fetch('/tasks', { // send newTask object in post request to server
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask)
    }).then(rspns => {
      if (rspns.ok) { // update user state to reflect the new task on frontend
        rspns.json().then(newTask => setUser({...user, user_lists: user.user_lists.map(userList => {
          return {...userList, list: {...userList.list, tasks: [...userList.list.tasks, newTask]}}
        })}))
        setNewTask({ // clear form, reset newTask object
          description: "",
          completed: false,
          list_id: userList.list.id
        })
      } else rspns.json().then(rspns => alert(rspns.errors))
    })
  }

  // handleDeleteList is called when the delete list button is clicked
  function handleDeleteList() {
    // send a delete request with the list id to the backend 
    fetch(`/lists/${userList.list.id}`, {method: 'DELETE'}).then(rspns => {
      if (rspns.ok) { // remove the list from frontend state
        setUser({...user, user_lists: user.user_lists.filter(userLisT => userLisT.id !== userList.id)})
      } else alert('something went wrong') // rspns.json().then(console.log)
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
              placeholder='new task'
              value={newTask.description}
              autoFocus
              onChange={e => setNewTask({...newTask, description: e.target.value})}/>
            <input type='submit' className='float-right' value='create task'/>
          </form>
        </div> : null}
        {showCollaborators ? 
          <Collaboratores
            setShowCollaborators={setShowCollaborators}
            userLists={userList.list.user_lists}/>
          : null}
    </div>
  );
}

export default List;
