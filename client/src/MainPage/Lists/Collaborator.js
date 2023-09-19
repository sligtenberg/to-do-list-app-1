import { useContext } from "react";
import { UserContext } from "../../Context/user";

function Collaborator({ collaborator }) {
  console.log(collaborator)
  const { deleteCollaborator, updateUserList } = useContext(UserContext)

  function handleCheckboxClick() {
    fetch(`/user_lists/${collaborator.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({...collaborator, owner: !collaborator.owner})
    }).then(rspns => {
      if (rspns.ok) rspns.json().then(updateUserList) // update frontend user state
      else rspns.json().then(rspns => alert(rspns.errors))
    })
  }

  function deleteUserList() {
    // send delete request with collaborator id to the backend 
    fetch(`/user_lists/${collaborator.id}`, {method: 'DELETE'}).then(rspns => {
      if (rspns.ok) deleteCollaborator(collaborator.id) // remove collaborator from frontend
      else alert('something went wrong') // rspns.json().then(console.log)
    })
  }

  return (
    <tr>
      <td><input type='checkbox' checked={collaborator.owner} onChange={handleCheckboxClick}/></td>
      <td>{collaborator.user.username}</td>
      <td><button type='button' onClick={deleteUserList}>remove</button></td>
    </tr>
  );
}

export default Collaborator;
