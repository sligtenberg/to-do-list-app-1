import Task from "./Task";

function List({ userList }) {
  const tasks = userList.list.tasks.map(task => <Task key={task.id} task={task}/>)

  return (
    <div>
      <h3>{userList.list.name}</h3>
      <ul>
        {tasks}
      </ul>
    </div>
  );
}

export default List;
