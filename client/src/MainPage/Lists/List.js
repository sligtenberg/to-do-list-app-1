import { useState } from 'react';
import Task from "./Task";

function List({ userList }) {
  const tasks = userList.list.tasks.map(task => <Task key={task.id} task={task}/>)

  const [expand, setExpand] = useState(false)

  return (
    <div className='list'>
      <button className='float-left' onClick={() => setExpand(!expand)}>
        {expand ? '-' : '+' }
      </button>
      <button className='float-right'>x</button>
      <h3>{userList.list.name}</h3>
      {tasks}
    </div>
  );
}

export default List;
