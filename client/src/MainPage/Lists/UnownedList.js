import ListHeader from "./ListHeader";
import UnownedTask from "./UnownedTask";
import OwnedTask from "./OwnedTask.js";

function UnownedList({ list, expand, setExpand }) {
  const tasks = list.tasks
  .sort((a, b) => a.id - b.id)
  .map(task => <OwnedTask key={task.id} task={task} />)

  return (
    <div className='list'>
      <ListHeader 
        setExpand={setExpand}
        expand={expand}
        list={list}/>
      {expand ? tasks : null}
    </div>
  );
}

export default UnownedList;
