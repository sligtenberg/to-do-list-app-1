import { useContext, useRef, useState } from "react";
import Collaborator from "./Collaborator";
import { UserContext } from "../../Context/user";

function Collaboratores({ setShowCollaborators, userLists, list }) {
  // close the modal when clicking outside the modal
  const modalRef = useRef()

  const collaborators = userLists.map(userList => <Collaborator key={userList.id} userList={userList} />)
  const [newCollaborator, setNewCollaborator] = useState({
    username: '',
    list_id: list.id,
    owner: false
  })

  const { user, setUser } = useContext(UserContext)

  function createNewCollaborator(e) {
    e.preventDefault()
    fetch('/user_lists', { // send the newCollaborator object in a post request to the server
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCollaborator)
    }).then(rspns => {
      if (rspns.ok) { // update user state to reflect the new user_list on the frontend
        rspns.json().then(newUserList => setUser({...user, user_lists: user.user_lists.map(userList => {
          return {...userList, list: {...userList.list, user_lists: [userList.list.user_lists, newUserList]}}
        })}))
      } else rspns.json().then(rspns => alert(rspns.errors))
    })
  }

  return (
    <div
      className="modalDiv"
      ref={modalRef}
      onClick={e => e.target === modalRef.current ? setShowCollaborators(false) : null}>
        <div className="modal">
          <h4>{list.name} collaborators</h4>
          <form onSubmit={createNewCollaborator}><table><tbody>
            <tr><td>owner</td><td></td></tr>
            {collaborators}
            <tr>
              <td><input
                type='checkbox'
                value={newCollaborator.owner}
                onChange={() => setNewCollaborator({...newCollaborator, owner: !newCollaborator.owner})}/></td>
              <td><input
                placeholder='username'
                value={newCollaborator.username}
                onChange={e => setNewCollaborator({...newCollaborator, username: e.target.value})}/></td>
              <td><input type='submit' value='add collaborator'/></td>  
            </tr>
          </tbody></table></form>
        </div>
    </div>
  );
}

export default Collaboratores;
