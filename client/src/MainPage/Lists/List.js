import { useEffect, useState } from "react";
import ListHeader from "./ListHeader";
import NewTaskForm from "./NewTaskForm";
import Task from "./Task";

function List ({ userList }) {
  const owner = userList.owner // toggle for dev purposes
//  const owner = true // toggle for dev purposes

  const tasks = userList.list.tasks.map(task => <Task key={task.id} task={task} owner={owner}/>)

  // when expand is true, tasks are visible below the list
  // expand state is stored in local storage to persist expanded lists accross rerenders
  const [expand, setExpand] = useState(JSON.parse(localStorage.getItem(`expand${userList.id}`)))
  // save the expand information locally to preserve expanded lists accross refreshes
  useEffect(() => localStorage.setItem(`expand${userList.id}`, JSON.stringify(expand)), [expand, userList.id])

  return (
    <div className='list'>
      <ListHeader
        expand={expand}
        setExpand={setExpand}
        listName={userList.list.name}
        listId={userList.list.id}
        owner={owner}/>
      {expand ? 
        <div>
          {tasks}
          {owner ? <NewTaskForm listId={userList.list.id}/> : null}
        </div>
      : null}
    </div>
  );
}

export default List;
