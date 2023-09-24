import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/user";

function ListHeader({ setExpand, expand, listName, listId, userListId, owner }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { deleteList, deleteUserList } = useContext(UserContext)

  // function handleLeaveList() {
  //   fetch(`/user_lists/${userListId}`, {method: 'DELETE'}).then(rspns => {
  //     if (rspns.ok) deleteUserList(userListId)
  //     else rspns.json().then(rspns => alert(rspns.errors))
  //   })
  // }

  function handleDeleteList() {
    // send a delete request with the list id to the backend 
    fetch(`/lists/${listId}`, {method: 'DELETE'}).then(rspns => {
      if (rspns.ok) deleteList(listId) // remove the userList from frontend state
      else rspns.json().then(rspns => alert(rspns.errors))
    })
  }

  return (
    <div className={expand ? 'expanded-list' : null}>
      <span onClick={() => setExpand(!expand)} className='task-name hover-pointer'>{listName} </span>
      {expand ?
        <span>
          <span
            onClick={() => navigate(`/collaborators/${listId}`)}
            state={{ background: location }}
            className='hover-pointer'> - collaborators
          </span>
          {owner ? <button onClick={handleDeleteList} className='float-right hover-pointer'>x</button>: null}
          {/* <button onClick={handleLeaveList} className="float-right hover-point">leave list</button> */}
        </span> : null}
    </div>
  );
}

export default ListHeader;
