import { useContext, useState } from 'react';
import { UserContext } from '../../Context/user';
import OwnedTask from "./OwnedTask";
import Collaboratores from './Collaborators';
import ListHeader from './ListHeader';

function OwnedList({ list, expand, setExpand, handleXClick, showCollaborators, setShowCollaborators }) {
  const { addNewTaskToList } = useContext(UserContext)

  const tasks = list.tasks
    .sort((a, b) => a.id - b.id)
    .map(task => <OwnedTask key={task.id} task={task} />)

  // should the following be a task component?
  const blankTask = {
    description: "",
    completed: false,
    list_id: list.id
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
        rspns.json().then(newTask => addNewTaskToList(newTask, list.id)) // update user state to reflect the new task on frontend
        setNewTask(blankTask) // clear form, reset newTask object
      } else rspns.json().then(rspns => alert(rspns.errors))
    })
  }

  return (
    <div className='list'>
      <ListHeader
        setExpand={setExpand}
        expand={expand}
        listName={list.name}
        setShowCollaborators={setShowCollaborators}
        handleXClick={handleXClick}/>
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
            userLists={list.user_lists}
            list={list}/>
          : null}
    </div>
  );
}

export default OwnedList;
