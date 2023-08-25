function Task({ task }) {
  return (
    <div >
      <input type="checkbox"/>{task.description}
    </div>
  );
}

export default Task;
