function UnownedTask({ task }) {
  return (
    <div>
      <input type='checkbox' disabled checked={task.completed}/>
      <span>{task.description}</span>
    </div>
  );
}

export default UnownedTask;
