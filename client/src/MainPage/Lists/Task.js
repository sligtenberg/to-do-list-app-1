function Task({ task }) {
  return (
    <div className='task'>
      <input type="checkbox"/>{task.description}
    </div>
  );
}

export default Task;
