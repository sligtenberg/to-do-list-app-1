import Task from "./Task";

function List({ userList }) {
  const tasks = userList.list.tasks.map(task => <Task key={task.id} task={task}/>)

  return (
    <div className='list'>
      <h3>{userList.list.name}</h3>
      {tasks}
    </div>
  );
}

export default List;
