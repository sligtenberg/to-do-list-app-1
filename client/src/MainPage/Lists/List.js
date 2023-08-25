import { useState } from 'react';
import Task from "./Task";

function List({ userList }) {
  const tasks = userList.list.tasks.map(task => <Task key={task.id} task={task}/>)

  const [expand, setExpand] = useState(false)

  return (
    <div className='list'>
      <div >
        <span onClick={() => setExpand(!expand)}>{userList.list.name}</span>
        <span className='float-right'>X</span>
      </div>
      {expand ? tasks : null}
    </div>
  );
}

export default List;
