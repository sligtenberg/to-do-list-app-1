import { useContext } from "react";
import { UserContext } from "../../Context/user";

function Collaborator({ userList }) {
  const { user, setUser } = useContext(UserContext)
  console.log('in collaborator', userList)

  function handleCheckboxClick() {
    fetch(`/user_lists/${userList.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({...userList, owner: !userList.owner})
    }).then(rspns => {
      if (rspns.ok) { // update frontend user state
        rspns.json().then(updatedUserList => setUser({...user, user_lists: user.user_lists.map(userList => {
          return {...userList, list: {...userList.list, user_lists: userList.list.user_lists
            .map(userList => userList.id === updatedUserList.id ? updatedUserList : userList)}}
        })}))
      } else rspns.json().then(rspns => alert(rspns.errors))
    })
  }

  function deleteUserList() {
    // send delete request with userList id to the backend 
    fetch(`/user_lists/${userList.id}`, {method: 'DELETE'}).then(rspns => {
      if (rspns.ok) { // remove userList from frontend
        setUser({...user, user_lists: user.user_lists.map(userList => {
          return {...userList, list: {...userList.list, user_lists: userList.list.user_lists
            .filter(userLisT => userLisT.id !== userList.id)}}
        })})
      } else alert('something went wrong') // rspns.json().then(console.log)
    })
  }

  return (
    <tr>
      <td><input type='checkbox' checked={userList.owner} onChange={handleCheckboxClick}/></td>
      <td>{userList.user.username}</td>
      <td><button type='button' onClick={deleteUserList}>remove</button></td>
    </tr>
  );
}

export default Collaborator;
