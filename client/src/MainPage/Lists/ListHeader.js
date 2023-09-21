function ListHeader({ setExpand, expand, listName, setShowCollaborators, handleXClick }) {
  return (
    <div>
      <span onClick={() => setExpand(!expand)} className='task-name hover-pointer'>{listName}</span>
      {expand ? <span className='hover-pointer' onClick={() => setShowCollaborators(true)} > - collaborators</span> : null}
      {handleXClick ? <span onClick={handleXClick} className='float-right hover-pointer'>X</span> : null}
    </div>
  );
}

export default ListHeader;
