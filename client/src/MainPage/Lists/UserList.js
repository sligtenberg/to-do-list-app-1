import { useContext, useEffect, useState } from "react";
import OwnedList from "./OwnedList";
import UnownedList from "./UnownedList";
import { UserContext } from "../../Context/user";

function UserList ({ userList }) {
  const { deleteUserList } = useContext(UserContext)

  // when expand is true, tasks are visible below the list
  // expand state is stored in local storage to persist expanded lists accross rerenders
  const [expand, setExpand] = useState(JSON.parse(localStorage.getItem(`expand${userList.id}`)))
  // save the expand information locally to preserve expanded lists accross refreshes
  useEffect(() => localStorage.setItem(`expand${userList.id}`, JSON.stringify(expand)), [expand, userList.id])

  const [showCollaborators, setShowCollaborators] = useState(false)

  function handleDeleteList() {
    // send a delete request with the list id to the backend 
    fetch(`/lists/${userList.list.id}`, {method: 'DELETE'}).then(rspns => {
      if (rspns.ok) deleteUserList(userList.id) // remove the userList from frontend state
      else rspns.json().then(rspns => alert(rspns.errors))
    })
  }

  return (
    <div>
      {userList.owner ?
        <OwnedList
          list={userList.list}
          expand={expand}
          setExpand={setExpand}
          handleXClick={handleDeleteList}
          showCollaborators={showCollaborators}
          setShowCollaborators={setShowCollaborators}/> :
        <UnownedList
          list={userList.list}
          expand={expand}
          setExpand={setExpand}
          showCollaborators={showCollaborators}
          setShowCollaborators={setShowCollaborators}/>}
    </div>
  );
}

export default UserList;
