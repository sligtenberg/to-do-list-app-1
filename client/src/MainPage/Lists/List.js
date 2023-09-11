import { useContext, useState } from 'react';
import { UserContext } from '../../Context/user';
import Task from "./Task";

function List({ userList }) {
  const tasks = userList.list.tasks
    .sort((a, b) => a.id - b.id)
    .map(task => <Task key={task.id} task={task}/>)
  const { user, setUser } = useContext(UserContext)

  // when expand is true, tasks are visible below the list
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
    // send the newTask object in a post request to the server
    fetch('/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask)
    }).then(rspns => {
      if (rspns.ok) { // update user state to reflect the new list on the frontend
        rspns.json().then(newTask => setUser({...userList, user_lists: user.user_lists.map(userList => {
          return {...userList, list: {...userList.list, tasks: [...userList.list.tasks, newTask]}}
        })}))
        setNewTask({ // clear the form and reset the newTask object
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
