import { useContext, useState } from 'react';
import { UserContext } from '../../Context/user';
import Task from "./Task";

function List({ userList }) {
  const tasks = userList.list.tasks
    .sort((a, b) => a.id - b.id)
    .map(task => <Task key={task.id} task={task}/>)
  const { user, setUser } = useContext(UserContext)

  // when expand is true, tasks are visible below the list
  // would be nice to move this to cookies, so it persists accross refreshes
  const [expand, setExpand] = useState(false)

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
        console.log(user)
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
    console.log('delete list clicked')
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
    </div>
  );
}

export default List;
