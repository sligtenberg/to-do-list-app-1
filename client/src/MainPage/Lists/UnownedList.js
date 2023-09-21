import Collaboratores from "./Collaborators";
import ListHeader from "./ListHeader";
import UnownedTask from "./UnownedTask";

function UnownedList({ list, expand, setExpand, showCollaborators, setShowCollaborators }) {
  const tasks = list.tasks
  .sort((a, b) => a.id - b.id)
  .map(task => <UnownedTask key={task.id} task={task} />)

  return (
    <div className='list'>
      <ListHeader 
        setExpand={setExpand}
        expand={expand}
        listName={list.name}
        setShowCollaborators={setShowCollaborators}/>
      {expand ? tasks : null}
      {showCollaborators ? 
          <Collaboratores
            setShowCollaborators={setShowCollaborators}
            userLists={list.user_lists}
            list={list}/>
          : null}
    </div>
  );
}

export default UnownedList;
